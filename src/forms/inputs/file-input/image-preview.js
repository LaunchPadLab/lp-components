import React from 'react'
import PropTypes from 'prop-types'

// Default FileInput preview component for image files

const propTypes = {
  image: PropTypes.string,
}

const defaultProps = {
  image: '',
}

function ImagePreview({ image }) {
  return (
    <div className="thumbnail">
      <img src={image} alt="" />
    </div>
  )
}

ImagePreview.propTypes = propTypes

ImagePreview.defaultProps = defaultProps

export default ImagePreview
