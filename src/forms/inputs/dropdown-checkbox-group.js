import React from 'react'
import CheckboxGroup from './checkbox-group'
import {
  checkboxGroupPropTypes,
  DropdownSelect,
  fieldOptionsType,
} from '../helpers'
import { InputLabel } from '../labels'

/**
 *
 * A group of checkboxes that can be used in a `redux-form`-controlled form.
 * Wraps the {@link CheckboxGroup} component in a {@link DropdownSelect} component, which displays the selected values as a list.
 * Options are displayed in a scrollable `Select`-style dropdown container.
 *
 * The value of each checkbox is specified via the `options` prop. This prop can either be:
 * - An array of strings
 * - An array of key-value pairs: `{ key, value }`
 *
 * The value of the entire `DropdownCheckboxGroup` component is an **array** containing the values of the selected checkboxes.
 * Clicking an unselected checkbox adds its value to this array, and clicking a selected checkbox removes its value from this array.
 *
 * @name DropdownCheckboxGroup
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Array} options - An array of checkbox values (strings or key-value pairs)
 * @example
 *
 * function InterestsForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="interests"
 *          component={ DropdownCheckboxGroup }
 *          options={[
 *            'Art',
 *            'Computer Science',
 *            'Dance'
 *          ]}
 *       />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 *
 * export default TodoForm
 */

const propTypes = {
  ...checkboxGroupPropTypes,
  options: fieldOptionsType,
}

function DropdownCheckboxGroup(props) {
  const {
    input: { name, value },
    label,
  } = props
  const inputId = `${name}-label`
  return (
    <div>
      <InputLabel {...{ label, name }} id={inputId} isFieldsetLabel />
      <DropdownSelect selectedValues={value} className="checkboxes">
        <CheckboxGroup {...props} label={false} ariaLabelledby={inputId} />
      </DropdownSelect>
    </div>
  )
}

DropdownCheckboxGroup.propTypes = propTypes

export default DropdownCheckboxGroup
