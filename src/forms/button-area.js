import React, { PropTypes } from 'react'

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
