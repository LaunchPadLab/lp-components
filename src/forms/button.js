import React, { PropTypes } from 'react'
import classnames from 'classnames'

const propTypes = {
  invalid:    PropTypes.bool,
  pristine:   PropTypes.bool,
  style:      PropTypes.string,
  submitting: PropTypes.bool,
  type:       PropTypes.string.isRequired,
  children:   PropTypes.node
}

const defaultProps = {
  style: 'primary',
  type: 'button',
}

// eslint-disable-next-line no-unused-vars
function Button ({ children, type, style, ...rest }) {
  return (
    <button
      type={ type }
      className={ classes(rest) }
      disabled={ rest.pristine || rest.invalid }
      { ...rest }
    >
      { children }
    </button>
  )
}

function classes ({ pristine, invalid, style, submitting }) {
  return classnames(
    `button-${style}`,
    {
      'is-disabled': pristine || invalid,
      'in-progress': submitting,
    }
  )
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
