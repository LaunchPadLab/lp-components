import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { convertNameToLabel } from '../helpers'
import { useToggle } from '../../utils'

/**
 *
 * A dynamic label associated with an input component.
 *
 * This component is used within {@link LabeledField}, and therefore is incorporated into most `lp-components` input components by default.
 *
 * The text of the label is set using the following rules:
 * - If the `label` prop is set to `false`, the label is hidden completely
 * - Else If the component is passed children, the children will be displayed within the `label`
 * - Else If the `label` prop is set to a string, the label will display that text
 * - Otherwise, the label will be set using the `name` prop.
 *
 * If `name` is used to set the text, it will be stripped of its prefixes and converted to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * For instance: `'person.firstName'` becomes `'First Name'`
 *
 * Note: When using third party form libraries (e.g., [Redux Form](https://redux-form.com)), it's likely that setting the `required` prop will turn on the browser's automatic validation, which could cause the library to behave unexpectedly. If the browser validation behavior is causing issues, then add a `noValidate` prop to the form to [turn off](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation#Validating_forms_using_JavaScript) automatic validation. (e.g., `<form noValidate></form>`)
 *
 * @name InputLabel
 * @type Function
 * @param {String} name - The name of the associated input
 * @param {String} [id=name] - The id of the associated input
 * @param {String} [hint] - A usage hint for the associated input
 * @param {String|Boolean} [label] - Custom text for the label
 * @param {String} [tooltip] - A message to display in a tooltip
 * @param {Boolean} [required=false] - A boolean value to indicate whether the field is required
 * @param {String} [requiredIndicator=''] - Custom character to denote a field is required

 * @example
 *
 * // A custom input to use with redux-form
 *
 * function EmailInput ({
 *   input: { name, value, onBlur, onChange },
 *   label,
 * }) {
 *   return (
 *      <div>
 *       <InputLabel name={name} label={label} />
 *       <input {...{
 *          type: 'email',
 *          name,
 *          value,
 *          onBlur,
 *          onChange,
 *       }}
 *     </div>
 *   )
 * }
 *
 */

const propTypes = {
  children: PropTypes.node,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  required: PropTypes.bool,
  requiredIndicator: PropTypes.string,
  className: PropTypes.string,
}

const defaultProps = {
  children: null,
  hint: '',
  id: '',
  label: '',
  tooltip: '',
  required: false,
  requiredIndicator: '',
  className: '',
}

function InputLabel({
  children,
  hint,
  id,
  label,
  name,
  tooltip,
  required,
  requiredIndicator,
  className,
}) {
  const [tooltipShown, toggleTooltipShown] = useToggle()
  const labelToDisplay = children || label || convertNameToLabel(name)

  return (
    <span>
      {label !== false && (
        <label htmlFor={id || name} className={className}>
          {labelToDisplay}
          {required && requiredIndicator && (
            <span className="required-indicator" aria-hidden="true">
              {requiredIndicator}
            </span>
          )}
          {hint && <i>{hint}</i>}
        </label>
      )}
      {tooltip && (
        <button
          type="button"
          className="tooltip-trigger"
          onClick={() => toggleTooltipShown()}
        />
      )}
      {tooltip && (
        <div
          className={classnames('tooltip-content', {
            'is-active': tooltipShown,
          })}
        >
          {tooltip}
        </div>
      )}
    </span>
  )
}

InputLabel.propTypes = propTypes
InputLabel.defaultProps = defaultProps

export default InputLabel
