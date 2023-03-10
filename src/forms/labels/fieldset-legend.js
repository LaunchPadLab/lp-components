import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { convertNameToLabel } from '../helpers'
import { useToggle } from '../../utils'

/**
 *
 * A dynamic legend associated with a group of inputs within a fieldset.
 *
 * This component is used within {@link LabeledFieldset}, and therefore is incorporated into most fieldset grouped input components ({@link RadioGroup}, {@link CheckboxGroup}) by default.
 *
 * The text of the legend is set using the following rules:
 * - If the `label` prop is set to `false`, the legend is hidden completely
 * - Else If the component is passed children, the children will be displayed within the `legend`
 * - Else If the `label` prop is set to a string, the legend will display that text
 * - Otherwise, the legend will be set using the `name` prop.
 *
 * If `name` is used to set the text, it will be stripped of its prefixes and converted to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * For instance: `'person.firstName'` becomes `'First Name'`
 * 
 * Note: When using third party form libraries (e.g., [Redux Form](https://redux-form.com)), it's likely that setting the `required` prop will turn on the browser's automatic validation, which could cause the library to behave unexpectedly. If the browser validation behavior is causing issues, then add a `noValidate` prop to the form to [turn off](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation#Validating_forms_using_JavaScript) automatic validation. (e.g., `<form noValidate></form>`)
 *
 * @name FieldsetLegend
 * @type Function
 * @param {String} name - The name of the associated fieldset
 * @param {String} [id=name] - The id of the associated fieldset (defaults to name)
 * @param {String} [hint] - A usage hint for the associated fieldset
 * @param {String|Boolean} [label] - Custom text for the legend
 * @param {String} [tooltip] - A message to display in a tooltip
 * @param {Boolean} [required] - A boolean value to indicate whether the fieldset is required
 * @param {String} [requiredIndicator] - Custom character to denote a fieldset is required (optional, default `''`)

 * @example
 *
 * // A custom input to use with redux-form
 * 
 * import { Checkbox } from 'lp-components'
 *
 * function TodoList ({
 *   input: { name, value, onBlur, onChange },
 *   label,
 *   todos,
 * }) {
 *   return (
 *     <fieldset>
 *       <FieldsetLegend label={label} />
 *       {todos.map((todo) => (
 *         <Checkbox
 *           key={todo.value}
 *           {...{
 *             input: {
 *               name: `${name}.${todo.value}`,
 *               value: value.includes(todo.value),
 *               onChange: onChange,
 *               onBlur: onBlur,
 *             },
 *             meta: {},
 *             label: todo.key,
 *           }}
 *         />
 *       ))}
 *     </fieldset>
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
  requiredIndicator: '',
  className: '',
}

function FieldsetLegend({
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
  const legendToDisplay = children || label || convertNameToLabel(name)

  return (
    <span>
      {label !== false && (
        <legend id={id} className={className}>
          {legendToDisplay}
          {required && requiredIndicator && (
            <span className="required-indicator" aria-hidden="true">
              {requiredIndicator}
            </span>
          )}
          {hint && <i>{hint}</i>}
        </legend>
      )}
      {tooltip && (
        <span
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

FieldsetLegend.propTypes = propTypes
FieldsetLegend.defaultProps = defaultProps

export default FieldsetLegend
