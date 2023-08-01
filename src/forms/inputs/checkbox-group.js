import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from './checkbox'
import {
  checkboxGroupPropTypes,
  fieldOptionsType,
  omitLabelProps,
  replaceEmptyStringValue,
  convertNameToLabel,
} from '../helpers'
import { LabeledField } from '../labels'
import {
  addToArray,
  removeFromArray,
  serializeOptions,
  compose,
} from '../../utils'
import classnames from 'classnames'

/**
 *
 * A group of checkboxes that can be used in a `redux-form`-controlled form.
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
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Array} options - An array of checkbox values (strings, numbers, or key-value pairs)
 * @param {Object} [checkboxInputProps={}] - An object of key-value pairs representing props to pass down to all checkbox inputs
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
 *
 * @example
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
 *          checkboxInputProps={{
 *            className: 'checkbox-input--secondary',
 *          }}
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
  className: PropTypes.string,
  checkboxInputProps: PropTypes.object,
  options: fieldOptionsType,
}

const defaultProps = {
  className: 'CheckboxGroup',
  checkboxInputProps: {},
  options: [],
}

function CheckboxGroupLegend({
  label,
  name,
  required,
  requiredIndicator,
  hint,
}) {
  return (
    <legend className={classnames({ 'visually-hidden': label === false })}>
      {label || convertNameToLabel(name)}
      {required && requiredIndicator && (
        <span className="required-indicator" aria-hidden="true">
          {requiredIndicator}
        </span>
      )}
      {hint && <i>{hint}</i>}
    </legend>
  )
}

function CheckboxGroup(props) {
  const {
    input: { value, onChange, name },
    meta, // eslint-disable-line no-unused-vars
    options,
    className,
    checkboxInputProps,
    ...rest
  } = omitLabelProps(props)
  const optionObjects = serializeOptions(options)
  // Build change handler
  const handleChange = function (option) {
    return function (checked) {
      // Add or remove option value from array of values, depending on whether it's checked
      const newValueArray = checked
        ? addToArray([option.value], value)
        : removeFromArray([option.value], value)
      return onChange(newValueArray)
    }
  }
  return (
    <LabeledField
      className={className}
      labelComponent={CheckboxGroupLegend}
      as="fieldset"
      {...props}
    >
      {optionObjects.map((option, i) => {
        return (
          <Checkbox // eslint-disable-line react/jsx-key
            {...{
              key: i,
              input: {
                name: `${name}.${option.value}`,
                value: value.includes(option.value),
                onChange: handleChange(option),
              },
              meta: {},
              label: option.key,
              ...rest,
              ...checkboxInputProps,
            }}
          />
        )
      })}
    </LabeledField>
  )
}

CheckboxGroup.propTypes = propTypes
CheckboxGroup.defaultProps = defaultProps

export default compose(replaceEmptyStringValue([]))(CheckboxGroup)
