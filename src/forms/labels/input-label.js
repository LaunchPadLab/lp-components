import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { convertNameToLabel } from '../helpers'
import { toggle, togglePropTypes } from '../../utils'
import { hide } from 'redux-modal';

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
 * @param {Boolean} [hideLabel=false] - A boolean representing hiding or showing the label element
 * @param {String} [hint] - A usage hint for the associated input
 * @param {String|Boolean} [label] - Custom text for the label
 * @param {String} [tooltip] - A message to display in a tooltip

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
  hideLabel: PropTypes.bool,
  hint: PropTypes.string,
  label: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  ...togglePropTypes('tooltipShown')
}

const defaultProps = {
  hideLabel: false,
  hint: '',
  label: '',
  tooltip: '',
}

function InputLabel ({ 
  hideLabel, 
  hint, 
  label, 
  name, 
  tooltip, 
  tooltipShown, 
  toggleTooltipShown,
}) {
  const showLabel = (hideLabel !== true) || (label !== false)
  console.log(label !== false)
  const labelText = showLabel || convertNameToLabel(name)
  return (
    <span>
      {  
        label !== false &&
        <label htmlFor={ name }>
          { labelText }
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
