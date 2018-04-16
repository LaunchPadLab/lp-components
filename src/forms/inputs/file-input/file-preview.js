import React from 'react'
import PropTypes from 'prop-types'

// Default FileInput preview component for non-image files

const propTypes = {
  file: PropTypes.object,
}

const defaultProps = {
  file: {},
}

function FilePreview ({ file }) {
  if (!file) return null
  return <p>{ file.name }</p>
}

FilePreview.propTypes = propTypes

FilePreview.defaultProps = defaultProps

export default FilePreview
