import React from 'react'
import PropTypes from 'prop-types'
import FileInput from './file-input'
import { fileInputPropTypes } from '../helpers'
import { compose, cloudinaryUploader, noop } from '../../utils'
import classnames from 'classnames'

/**
 *
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
  onUploadFailure: PropTypes.func,
  onUploadSuccess: PropTypes.func,
  upload: PropTypes.func.isRequired,
  uploadStatus: PropTypes.string.isRequired,
}

const defaultProps = {
  onUploadSuccess: noop,
  onUploadFailure: noop,
}

function CloudinaryFileInput ({ 
  input,
  className,
  onUploadFailure,
  onUploadSuccess,
  upload, 
  uploadStatus, 
  ...rest 
}) {
  // const { onChange } = input
  return (
    <FileInput
      input={ input }
      onRead={({ fileData, file }) => {
        return upload(fileData, file)
          .then((res) => {
            // onChange(res.url)
            onUploadSuccess(res)
            return { file, fileUpload: res }
          }, (err) => onUploadFailure(err))
        }
      }
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
