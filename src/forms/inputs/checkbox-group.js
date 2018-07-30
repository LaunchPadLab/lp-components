import React from 'react'
import Checkbox from './checkbox'
import {
  checkboxGroupPropTypes,
  fieldOptionsType,
  omitLabelProps,
  replaceEmptyStringValue,
} from '../helpers'
import { LabeledField } from '../labels'
import { addToArray, removeFromArray, serializeOptions, compose } from '../../utils'

/**
 *
 * A group of checkboxes that can be used in a `redux-forms`-controlled form.
 *
 * The value of each checkbox is specified via the `options` prop. This prop can either be:
 * - An array of strings
 * - An array of numbers
 * - An array of key-value pairs: `{ key, value }`
 *
 * The value of the entire `CheckboxGroup` component is an **array** containing the values of the selected checkboxes (converted to strings).
 * Clicking an unselected checkbox adds its value to this array, and clicking a selected checkbox removes its value from this array.
 *
 * @name CheckboxGroup
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Array} options - An array of checkbox values (strings, numbers, or key-value pairs)
 * @example
 *
 * function TodoForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="completedTodos"
 *          component={ CheckboxGroup }
 *          options={[
 *            'Eat breakfast',
 *            'Respond to emails',
 *            'Take out the trash',
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
**/

const propTypes = {
  ...checkboxGroupPropTypes,
  options: fieldOptionsType
}

const defaultProps = {
  options: []
}

function CheckboxGroup (props) {
  const {
    input: { value, onChange, name },
    meta, // eslint-disable-line no-unused-vars
    options,
    ...rest
  } = omitLabelProps(props)
  const optionObjects = serializeOptions(options)
  // Build change handler
  const handleChange = function (option) {
    return function (checked) {
      // Add or remove option value from array of values, depending on whether it's checked
      const newValueArray = checked ? addToArray([option.value], value) : removeFromArray([option.value], value)
      return onChange(newValueArray)
    }
  }
  return (
    <LabeledField className="CheckboxGroup" { ...props }>
      {
        optionObjects.map((option, i) => {
          return (
            <Checkbox // eslint-disable-line react/jsx-key
              {...{
                key: i,
                input: {
                  name: `${ name }.${ option.value }`,
                  value: value.includes(option.value),
                  onChange: handleChange(option)
                },
                meta: {},
                label: option.key,
                ...rest
              }}
            />
          )
        })
      }
    </LabeledField>
  )
}

CheckboxGroup.propTypes = propTypes
CheckboxGroup.defaultProps = defaultProps

export default compose(
  replaceEmptyStringValue([]),
)(CheckboxGroup)
