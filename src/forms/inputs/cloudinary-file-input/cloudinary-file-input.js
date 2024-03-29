import React from 'react'
import PropTypes from 'prop-types'
import DefaultFileInput from '../file-input'
import cloudinaryUploader from './cloudinary-uploader'
import { fileInputPropTypes, readFilesAsDataUrls } from '../../helpers'
import { compose, first, noop, set } from '../../../utils'
import classnames from 'classnames'

/**
 * A wrapper around a file input component (defaults to {@link FileInput}) that automatically uploads files to cloudinary via the [cloudinaryUploader](https://github.com/LaunchPadLab/lp-hoc/blob/master/docs.md#cloudinaryuploader) HOC.
 *
 * The value of this input will only get set upon successful upload. The shape of the value will be of a file object or an array of file objects with the `url` set to the public URL of the uploaded file. The full response from Cloudinary is accessible via the value's `meta.cloudinary` key.
 *
 * Additionally, the `uploadStatus` passed down from `cloudinaryUploader` will be added as a class on the input.
 *
 * You can pass arguments to the instance of `cloudinaryUploader` via this component's props,
 * or via the `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_BUCKET` env vars (recommended).
 *
 * @name CloudinaryFileInput
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Function} [fileInput=FileInput] - A component that gets wrapped with Cloudinary upload logic
 * @param {Boolean} [multiple=false] - A flag indicating whether or not to accept multiple files
 * @param {Function} [onUploadSuccess=noop] - A handler that gets invoked with the response from a successful upload to Cloudinary
 * @param {Function} [onUploadFailure=noop] - A handler that gets invoked with the error from a failed upload to Cloudinary
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
  multiple: PropTypes.bool,
  onUploadFailure: PropTypes.func,
  onUploadSuccess: PropTypes.func,
  upload: PropTypes.func.isRequired,
  uploadStatus: PropTypes.string.isRequired,
}

const defaultProps = {
  fileInput: DefaultFileInput,
  multiple: false,
  onUploadSuccess: noop,
  onUploadFailure: noop,
}

function mapCloudinaryResponse(file, response) {
  return compose(
    set('url', response.url),
    set('meta.cloudinary', response)
  )(file)
}

function CloudinaryFileInput({
  input,
  className,
  onUploadFailure,
  onUploadSuccess,
  upload,
  uploadStatus,
  fileInput: FileInput,
  multiple,
  ...rest
}) {
  return (
    <FileInput
      input={input}
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

        const successResponse = multiple ? uploadedFiles : first(uploadedFiles)
        onUploadSuccess(successResponse)
        return uploadedFiles
      }}
      className={classnames(uploadStatus, className)}
      multiple={multiple}
      {...rest}
    />
  )
}

CloudinaryFileInput.propTypes = propTypes
CloudinaryFileInput.defaultProps = defaultProps

export default compose(cloudinaryUploader())(CloudinaryFileInput)
