import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 *
 * A simple button component that can be used independently, or as part of a form.
 *
 * Conditionally adds classes and/or becomes disabled depending on passed props.
 * In addition to the props below, any extra props will be passed directly to the inner `<button>` element.
 * 
 * @name Button
 * @type Function
 * @param {Boolean} [invalid] - Whether or not a related form is invalid (will disable when `true`)
 * @param {Boolean} [pristine] - Whether or not a related form is pristine (will disable when `true`)
 * @param {String} [style="primary"] - A descriptive string that will be appended to the button's class with format `button-<type>`
 * @param {Boolean} [submitting] - Whether or not a related form is submitting (will give button class `'in-progress` when `true`)
 * @param {Boolean} [type="button"] - The [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute of the button element
 * @param {Function} [children] - Any React component(s) being wrapped by the button
 * @example
 * 
 * function MessageButton ({ message }) {
 *   return (
 *      <Button
 *        style="secondary"
 *        onClick={ () => console.log(message) }
 *      > 
 *        Print Message
 *      </Button>
 *   )
 * }
 *
 * // For a more in-depth example of using buttons with forms, see the docs for SubmitButton.
 *
**/

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
function Button ({ children, type, style, pristine, invalid, submitting, ...rest }) {
  return (
    <button
      type={ type }
      className={ classes(style, pristine, invalid, submitting) }
      disabled={ pristine || invalid }
      { ...rest }
    >
      { children }
    </button>
  )
}

function classes (style, pristine, invalid, submitting) {
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
