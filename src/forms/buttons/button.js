import React from 'react'
import PropTypes from 'prop-types'
import { buttonClasses } from '../helpers'
import { noop } from '../../utils'

/**
 *
 * A simple button component that can be used independently, or as part of a form.
 *
 * Conditionally adds classes and/or becomes disabled depending on passed props. If the button is `disabled` or `submitting`, the `onClick` handler will be overridden with a `noop`. This is especially helpful when preventing duplicate form submissions for **both** mouse and keyboard actions.
 *
 * In addition to the props below, any extra props will be passed directly to the inner `<button>` element.
 *
 * If a className is provided to the component, it will be appended to the conditionally added classes.
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
 */

const propTypes = {
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
  style: PropTypes.string,
  submitting: PropTypes.bool,
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

const defaultProps = {
  style: 'primary',
  type: 'button',
  className: '',
  onClick: noop,
}

// eslint-disable-next-line no-unused-vars
function Button({
  children,
  type,
  style,
  pristine,
  invalid,
  submitting,
  className,
  onClick,
  ...rest
}) {
  const disabled = pristine || invalid
  return (
    <button
      type={type}
      className={buttonClasses({
        className,
        style,
        pristine,
        invalid,
        submitting,
      })}
      disabled={disabled}
      onClick={disabled || submitting ? noop : onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
