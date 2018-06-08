import React from 'react'
import PropTypes from 'prop-types'
import FileInput from './file-input'
import { fieldPropTypes } from '../helpers'
import { compose, cloudinaryUploader } from '../../utils'
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
**/

const propTypes = {
  ...fieldPropTypes,
  upload: PropTypes.func.isRequired,
  uploadStatus: PropTypes.string.isRequired,
}
const defaultProps = {}

function CloudinaryFileInput ({ 
  input: { onChange, ...input },
  className,
  upload, 
  uploadStatus, 
  ...rest 
}) {
  return (
     <FileInput
      input={ input }
      onLoad={ (fileData, file) => upload(fileData, file).then(({ url }) => onChange(url)) }
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
