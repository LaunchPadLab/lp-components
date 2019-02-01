import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { convertNameToLabel } from '../helpers'
import { toggle, togglePropTypes } from '../../utils'

/**
 *
 * A dynamic label associated with an input component.
 *
 * This component is used within {@link LabeledField}, and therefore is incorporated into most `lp-components` input components by default.
 *
 * The text of the label is set using the following rules:
 * - If the `label` prop is set to `false`, the label is hidden completely
 * - If the `label` prop is set to a string, the label will display that text
 * - Otherwise, the label will be set using the `name` prop.
 *
 * If `name` is used to set the text, it will be stripped of its prefixes and converted to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * For instance: `'person.firstName'` becomes `'First Name'`
 *
 * @name InputLabel
 * @type Function
 * @param {String} name - The name of the associated input
 * @param {String} [hint] - A usage hint for the associated input
 * @param {String|Boolean} [label] - Custom text for the label
 * @param {String} [tooltip] - A message to display in a tooltip
 * @param {Boolean} [required] - A boolean value to indicate whether the field is required
 * @param {String} [requiredIndicator] - Custom character to denote a field is required (optional, default `''`)

 * @example
 *
 * // A custom input to use with redux-forms
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
**/

const propTypes = {
  hint: PropTypes.string,
  label: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  required: PropTypes.bool,
  requiredIndicator: PropTypes.string,
  ...togglePropTypes('tooltipShown')
}

const defaultProps = {
  hint: '',
  label: '',
  tooltip: '',
  requiredIndicator: '',
}

function InputLabel ({
  hint,
  label,
  name,
  tooltip,
  tooltipShown,
  toggleTooltipShown,
  required,
  requiredIndicator,
}) {
  const labelText = label || convertNameToLabel(name)
  return (
    <span>
      {
        label !== false &&
        <label htmlFor={ name }>
          { labelText }
          {
            required && requiredIndicator &&
            <span className="required-indicator" aria-hidden="true">{ requiredIndicator }</span>
          }
          {
            hint &&
            <i>{ hint }</i>
          }
        </label>
      }
      {
        tooltip &&
        <span className="tooltip-trigger" onClick={ toggleTooltipShown }/>
      }
      {
        tooltip &&
        <div className={ classnames('tooltip-content', { 'is-active': tooltipShown }) }>
          { tooltip }
        </div>
      }
    </span>
  )
}

InputLabel.propTypes = propTypes

InputLabel.defaultProps = defaultProps

export default toggle('tooltipShown')(InputLabel)
