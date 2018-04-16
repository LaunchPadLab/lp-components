import React from 'react'
import PropTypes from 'prop-types'
import { isImageType } from '../../helpers'

// Default FileInput preview component

const propTypes = {
  file: PropTypes.object,
  image: PropTypes.string,
}

const defaultProps = {
  file: {},
  image: '',
}

function FilePreview ({ file, image }) {
  if (!file && !image) {
    return null
  } else {
    return (
      (isImageType(file) || image)
        ? <div className="thumbnail">
            <img src={ image } />
          </div>
        : <p>{ file.name }</p>
    )
  }
}

FilePreview.propTypes = propTypes

FilePreview.defaultProps = defaultProps

export default FilePreview
