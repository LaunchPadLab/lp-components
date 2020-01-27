import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utils'
import classnames from 'classnames'

/**
 *
 * A simple button component that can be used independently, or as part of a form.
 *
 * Conditionally adds classes and/or sets aria-disabled depending on passed props. If the button is `disabled` or `submitting`, the `onClick` handler will be overridden with a `noop`. This is especially helpful when preventing duplicate form submissions for **both** mouse and keyboard actions.
 * 
 * In addition to the props below, any extra props will be passed directly to the inner `<button>` element.
 * 
 * If a className is provided to the component, it will be appended to the conditionally added classes.
 * 
 * _Note: Instead of targeting the `:disabled` pseudo-class or `[disabled]` attribute, you can target `[aria-disabled=true]` to apply similar styling. Using the ARIA attribute keeps the `<button>` in the taborder and will be read as "disabled" or "dimmed" by screen reader technologies. You can also target `.is-disabled` which gets added as a class based on the same conditions that set `aria-disabled`._
 * 
 * @name Button
 * @type Function
 * @param {Boolean} [invalid] - Whether or not a related form is invalid (will set aria-disabled when `true`)
 * @param {Boolean} [pristine] - Whether or not a related form is pristine (will set aria-disabled when `true`)
 * @param {String} [priority="primary"] - A descriptive string that will be appended to the button's class with format `button-<type>`
 * @param {Boolean} [submitting] - Whether or not a related form is submitting (will give button class `'in-progress` when `true`)
 * @param {Boolean} [type="button"] - The [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute of the button element
 * @param {Function} [children] - Any React component(s) being wrapped by the button
 * @example
 * 
 * function MessageButton ({ message }) {
 *   return (
 *      <Button
 *        priority="secondary"
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
  invalid:    PropTypes.bool,
  pristine:   PropTypes.bool,
  priority:   PropTypes.string,
  submitting: PropTypes.bool,
  type:       PropTypes.string.isRequired,
  children:   PropTypes.node,
  className:  PropTypes.string,
  onClick:    PropTypes.func,
}

const defaultProps = {
  priority: 'primary',
  type: 'button',
  className: '',
  onClick: noop,
}

function calculateClassName ({ className, priority, pristine, invalid, submitting }) {
  return classnames(
    `button-${priority}`,
    {
      'is-disabled': pristine || invalid,
      'in-progress': submitting,
    },
    className,
  )
}


// eslint-disable-next-line no-unused-vars
function Button ({
  children,
  type,
  priority,
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
      type={ type }
      className={ calculateClassName({ className, priority, pristine, invalid, submitting }) }
      aria-disabled={ pristine || invalid }
      onClick={ (disabled || submitting) ? noop : onClick }
      { ...rest }
    >
      { children }
    </button>
  )
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
