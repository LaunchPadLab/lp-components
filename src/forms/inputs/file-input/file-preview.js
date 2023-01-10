import React from 'react'
import PropTypes from 'prop-types'

// Default FileInput preview component for non-image files

const propTypes = {
  name: PropTypes.string,
}

const defaultProps = {
  name: '',
}

function FilePreview({ name }) {
  if (!name) return null
  return <p>{name}</p>
}

FilePreview.propTypes = propTypes
FilePreview.defaultProps = defaultProps

export default FilePreview
