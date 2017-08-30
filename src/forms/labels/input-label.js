import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { startCase, stripNamespace, toggle } from '../../utils'

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
 * @param {String} [label] - Custom text for the label
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
  hint: PropTypes.node,
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.node,
  tooltipActive: PropTypes.bool,
  toggleTooltip: PropTypes.func,
}

function InputLabel ({ hint, label, name, tooltip, tooltipActive, toggleTooltip }) {
  const labelText = label || startCase(stripNamespace(name))
  return (
    <span>
      { label !== false &&
        <label htmlFor={ name }>
          { labelText }

          { hint &&
            <i> { hint }</i>
          }
        </label>
      }
      
      { tooltip &&
        <span className="tooltip-trigger" onClick={ toggleTooltip }/>
      }

      { tooltip &&
        <div className={ classnames('tooltip-content', { 'is-active': tooltipActive }) }>
          { tooltip }
       </div>
      }
    </span>

  )
}

InputLabel.propTypes = propTypes

export default toggle('tooltip')(InputLabel)
