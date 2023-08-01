import React from 'react'
import CheckboxGroup from './checkbox-group'
import { checkboxGroupPropTypes } from '../helpers'

/**
 *
 * A group of checkboxes that can be used in a `redux-form`-controlled form.
 * Passes in isDropdown=true prop to CheckboxGroup component.
 * Options are displayed in a scrollable `Select`-style dropdown container.
 *
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

const propTypes = checkboxGroupPropTypes

function DropdownCheckboxGroup(props) {
  return <CheckboxGroup {...props} isDropdown />
}

DropdownCheckboxGroup.propTypes = propTypes

export default DropdownCheckboxGroup
