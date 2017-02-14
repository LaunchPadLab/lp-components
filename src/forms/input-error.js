import React, { PropTypes } from 'react'

const propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  invalid: PropTypes.bool,
  touched: PropTypes.bool,
}

function InputError ({ error, invalid, touched }) {
  return (touched && invalid)
    ? <span className="error-message">{ formatError(error) }</span>
    : null
}

function formatError (error) {
  if (error instanceof Array) {
    return error.join(', ')
  }
  return error
}

InputError.propTypes = propTypes

export default InputError
