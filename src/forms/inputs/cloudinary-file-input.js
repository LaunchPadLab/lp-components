import React from 'react'
import PropTypes from 'prop-types'
import DefaultFileInput from './file-input'
import { fileInputPropTypes, readFilesAsDataUrls } from '../helpers'
import { compose, cloudinaryUploader, noop, set } from '../../utils'
import classnames from 'classnames'

/**
 * A wrapper around the {@link FileInput} component that automatically uploads files to cloudinary via the [cloudinaryUploader](https://github.com/LaunchPadLab/lp-hoc/blob/master/docs.md#cloudinaryuploader) HOC.
 * The value of this input is the public URL of the uploaded file.
 * Additionally, the `uploadStatus` passed down from `cloudinaryUploader` will be added as a class on the input.
 * 
 * You can pass arguments to the instance of `cloudinaryUploader` via this component's props,
 * or via the `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_BUCKET` env vars (recommended).
 * 
 *
 * @name CloudinaryFileInput
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Function} [onUploadSuccess] - A handler that gets invoked with the response from a successful upload to Cloudinary
 * @param {Function} [onUploadFailure] - A handler that gets invoked with the error from a failed upload to Cloudinary
 * @example
 * 
 * function HeadshotForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field 
 *          name="headshotUrl" 
 *          component={ CloudinaryFileInput }
 *          cloudName="my-cloudinary-cloud"
 *          bucket="my-cloudinary-bucket"
 *       />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 */

const propTypes = {
  ...fileInputPropTypes,
  fileInput: PropTypes.func,
  onUploadFailure: PropTypes.func,
  onUploadSuccess: PropTypes.func,
  upload: PropTypes.func.isRequired,
  uploadStatus: PropTypes.string.isRequired,
}

const defaultProps = {
  fileInput: DefaultFileInput,
  onUploadSuccess: noop,
  onUploadFailure: noop,
}

function mapCloudinaryResponse (file, response) {
  return compose(
    set('url', response.url),
    set('meta.cloudinary', response)
  )(file)
}

function CloudinaryFileInput ({
  input,
  className,
  onUploadFailure,
  onUploadSuccess,
  upload,
  uploadStatus,
  fileInput: FileInput,
  ...rest
}) {
  return (
    <FileInput
      input={ input }
      readFiles={async (files) => {
        let uploadedFiles = null
        try {
          const filesWithDataUrls = await readFilesAsDataUrls(files)
          const uploadFilePromises = filesWithDataUrls.map(async (file) => {
            const cloudinaryRes = await upload(file.url, file)
            return mapCloudinaryResponse(file, cloudinaryRes)
          })
          
          uploadedFiles = await Promise.all(uploadFilePromises)
        } catch (e) {
          onUploadFailure(e)
          throw e
        }
        
        onUploadSuccess(uploadedFiles)
        return uploadedFiles
      }}
      className={ classnames(uploadStatus, className) }
      { ...rest }
    />
  )
}

CloudinaryFileInput.propTypes = propTypes
CloudinaryFileInput.defaultProps = defaultProps

export default compose(
  cloudinaryUploader(),
)(CloudinaryFileInput)
