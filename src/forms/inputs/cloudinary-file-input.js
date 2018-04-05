import React from 'react'
import PropTypes from 'prop-types'
import FileInput from './file-input'
import { fieldPropTypes } from '../helpers'
import { compose, cloudinaryUploader } from '../../utils'

const propTypes = {
  ...fieldPropTypes,
  upload: PropTypes.func.isRequired,
  uploadStatus: PropTypes.string.isRequired,
}
const defaultProps = {}

function CloudinaryFileInput ({ 
  input: { onChange, ...input }, 
  meta, 
  upload, 
  uploadStatus, 
  ...rest 
}) {
  return (
     <FileInput
      className={ uploadStatus }
      input={ input }
      meta={ meta }
      onLoad={ (fileData, file) => upload(fileData, file).then(({ url }) => onChange(url)) }
      { ...rest }
    />
  )
}

CloudinaryFileInput.propTypes = propTypes
CloudinaryFileInput.defaultProps = defaultProps

export default compose(
  cloudinaryUploader(),
)(CloudinaryFileInput)
