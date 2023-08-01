import React from 'react'
import PropTypes from 'prop-types'
import {
  convertNameToLabel,
  radioGroupPropTypes,
  fieldOptionsType,
  omitLabelProps,
} from '../helpers'
import { LabeledField } from '../labels'
import { serializeOptions, filterInvalidDOMProps } from '../../utils'
import classnames from 'classnames'

/**
 *
 * A group of radio buttons that can be used in a `redux-form`-controlled form.
 *
 * The value of each radio button is specified via the `options` prop. This prop can either be:
 * - An array of strings
 * - An array of numbers
 * - An array of booleans
 * - An array of key-value pairs: `{ key, value }`, where `key` is a string and `value` is a string, number, or boolean
 *
 * The value of the entire `RadioGroup` component is the value of the currently selected radio button (converted to a string).
 *
 * @name RadioGroup
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Array} options - An array of radio button values (strings, numbers, booleans, or key-value pairs)
 * @param {Object} [radioInputProps={}] - An object of key-value pairs representing props to pass down to all radio inputs
 * @example
 *
 * function FavoriteFoodForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="favoriteFood"
 *          component={ RadioGroup }
 *          options={[
 *            'Bananas',
 *            'Pineapples',
 *            'Potatoes',
 *          ]}
 *       />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 *
 * export default FavoriteFoodForm
 *
 * @example
 * function FavoriteFoodForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="favoriteFood"
 *          component={ RadioGroup }
 *          options={[
 *            'Bananas',
 *            'Pineapples',
 *            'Potatoes',
 *          ]}
 *          radioInputProps={{
 *            className: 'radio-input--secondary',
 *          }}
 *       />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 *
 * export default FavoriteFoodForm
 */

const propTypes = {
  ...radioGroupPropTypes,
  className: PropTypes.string,
  options: fieldOptionsType,
  radioInputProps: PropTypes.object,
}

const defaultProps = {
  options: [],
  className: 'RadioGroup',
  radioInputProps: {},
}

function RadioGroupLegend({ label, name }) {
  return (
    <legend className={classnames({ 'visually-hidden': label === false })}>
      {label || convertNameToLabel(name)}
    </legend>
  )
}

// This should never be used by itself, so it does not exist as a separate export
function RadioButton(props) {
  const {
    input: { id, name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField {...props}>
      <div className="input-wrapper">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...filterInvalidDOMProps(rest)}
        />
      </div>
    </LabeledField>
  )
}

RadioButton.propTypes = {
  ...radioGroupPropTypes,
}

function RadioGroup(props) {
  const {
    input: { value, onChange, name },
    meta, // eslint-disable-line no-unused-vars
    options,
    className,
    radioInputProps,
    ...rest
  } = omitLabelProps(props)
  const optionObjects = serializeOptions(options)
  return (
    <LabeledField
      className={className}
      labelComponent={RadioGroupLegend}
      as="fieldset"
      {...props}
    >
      {optionObjects.map((option, i) => {
        return (
          <RadioButton // eslint-disable-line react/jsx-key
            {...{
              key: i,
              type: 'radio',
              input: {
                name, // all radio inputs must share the same name
                value: option.value,
                onChange: () => onChange(option.value),
              },
              id: `${name}.${option.value}`, // override Input default behavior to assign id to input: { name }
              meta: {},
              checked: value === option.value,
              label: option.key,
              ...rest,
              ...radioInputProps,
            }}
          />
        )
      })}
    </LabeledField>
  )
}

RadioGroup.propTypes = propTypes
RadioGroup.defaultProps = defaultProps

export default RadioGroup
