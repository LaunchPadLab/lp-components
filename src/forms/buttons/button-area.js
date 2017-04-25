import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node
}

function ButtonArea ({ children }) {
  return (
    <div className="button-area">
      { children }
    </div>
  )
}

ButtonArea.propTypes = propTypes

export default ButtonArea
