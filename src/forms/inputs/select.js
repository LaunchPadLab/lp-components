import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  fieldOptionGroupsType,
  fieldOptionsType,
} from '../helpers/field-prop-types'
import {
  blurDirty,
  fieldPropTypes,
  hasInputError,
  omitLabelProps,
} from '../helpers'
import { LabeledField } from '../labels'
import {
  compose,
  filterInvalidDOMProps,
  generateInputErrorId,
  serializeOptions,
  serializeOptionGroups,
} from '../../utils'

/**
 *
 * A select input that can be used in a `redux-form`-controlled form.
 *
 * The value of each option is specified via the `options` or the `optionGroups` prop.
 * The `options` prop will be ignored if `optionGroups` is present.
 *
 * The `options` prop can either be:
 * - An array of strings
 * - An array of numbers
 * - An array of key-value pairs: `{ key, value }`
 *
 * The `optionGroups` props must be an array of objects with the following keys:
 * - `name`: The name of the option group
 * - `options`: As above, an array of strings or key-value pairs.
 *
 * The value of the `Select` component will be the same as the value of the selected option (converted to a string).
 *
 * @name Select
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Array} options - An array of option values (strings, numbers, or key-value pairs). This prop will be ignored if `optionGroups` is present.
 * @param {Array} optionGroups - An array of option group objects
 * @param {String} [placeholder='Select'] - A string to display as a placeholder option. Pass in `false` to hide the placeholder option.
 * @param {Boolean} [enablePlaceholderOption=false] - A flag indicating that the placeholder option should not be `disabled`
 * @example
 *
 * // With string options
 *
 * function PaintColorForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="paintColor"
 *          component={ Select }
 *          options={[
 *            'Purple',
 *            'Green',
 *            'Magenta',
 *          ]}
 *       />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 *
 * // With object options
 *
 * function EmployeeForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="employeeId"
 *          component={ Select }
 *          options={[
 *            { key: 'Janet', value: 100 },
 *            { key: 'Bob', value: 101 },
 *          ]}
 *       />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 */

const propTypes = {
  ...fieldPropTypes,
  enablePlaceholderOption: PropTypes.bool,
  placeholder: PropTypes.string,
  options: fieldOptionsType,
  optionGroups: fieldOptionGroupsType,
}

const defaultProps = {
  enablePlaceholderOption: false,
  options: [],
  optionGroups: [],
  placeholder: 'Select',
}

function Select(props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    className, // eslint-disable-line no-unused-vars
    enablePlaceholderOption,
    options,
    optionGroups,
    placeholder,
    ...rest
  } = props
  const inputProps = filterInvalidDOMProps(omitLabelProps(rest))
  const optionObjects = serializeOptions(options)
  const optionGroupObjects = serializeOptionGroups(optionGroups)
  return (
    <LabeledField {...props}>
      <select
        {...{
          id: name,
          className: classnames({ unselected: value === '' }),
          name,
          value,
          onBlur,
          onChange,
          'aria-describedby': hasInputError(meta)
            ? generateInputErrorId(name)
            : null,
          ...inputProps,
        }}
      >
        {placeholder && (
          <option value="" disabled={!enablePlaceholderOption}>
            {placeholder}
          </option>
        )}
        {optionGroupObjects.length
          ? optionGroupObjects.map(({ name, options }, idx) => (
              <optgroup key={idx} label={name}>
                {options.map(({ key, value }) => (
                  <option key={value} value={value}>
                    {key}
                  </option>
                ))}
              </optgroup>
            ))
          : optionObjects.map(({ key, value }) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
      </select>
    </LabeledField>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default compose(blurDirty())(Select)
