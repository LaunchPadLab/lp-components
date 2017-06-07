import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from './checkbox'
import { fieldPropTypesWithValue, fieldOptionsType, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { addToArray, removeFromArray, objectify } from '../../utils'

/**
 *
 * A group of checkboxes that can be used in a `redux-forms`-controlled form. 
 * 
 * The value of each checkbox is specified via the `options` prop. This prop can either be:
 * - An array of strings 
 * - An array of key-value pairs: `{ key, value }`
 * 
 * The value of the entire `CheckboxGroup` component is an **array** containing the values of the selected checkboxes.
 * Clicking an unselected checkbox adds its value to this array, and clicking a selected checkbox removes its value from this array.
 *
 * Since the default `redux-forms` initial value is an empty string, you may need to set it to an empty array explicity in `mapStateToProps` using the [initalValues](http://redux-form.com/6.0.0-alpha.4/examples/initializeFromState) key.
 * 
 * @name CheckboxGroup
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Array} options - An array of checkbox values (strings or key-value pairs)
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
 * function mapStateToProps () {
 *    return {
 *      initialValues: {
 *        completedTodos: []
 *      }
 *    }
 * }
 *
 * export default compose(
 *    connect(mapStateToProps)
 * )(TodoForm)
**/

const propTypes = {
  ...fieldPropTypesWithValue(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    )
  ),
  options: fieldOptionsType
}

const defaultProps = {
  options: []
}

function CheckboxGroup (props) {
  const {
    input: { value, onChange },
    meta, // eslint-disable-line no-unused-vars
    options,
    ...rest
  } = omitLabelProps(props)
  const optionObjects = objectify(options)
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
        optionObjects.map((option) => {
          return (
            <Checkbox
              {...{
                key: option.key,
                input: {
                  name: option.key,
                  value: value.includes(option.value),
                  onChange: handleChange(option)
                },
                meta: {},
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

export default CheckboxGroup
