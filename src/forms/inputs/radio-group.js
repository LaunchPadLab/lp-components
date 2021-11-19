import React from 'react'
// import PropTypes from 'prop-types'
import Input from './input'
import { fieldPropTypes, fieldOptionsType, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { serializeOptions } from '../../utils'

/**
 *
 * A group of radio buttons that can be used in a `redux-forms`-controlled form.
 *
 * The value of each button is specified via the `options` prop. This prop can either be:
 * - An array of strings
 * - An array of numbers
 * - An array of key-value pairs: `{ key, value }`
 *
 * The value of the entire `RadioGroup` component is the value of the currently selected button (converted to a string).
 *
 * @name RadioGroup
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Array} options - An array of button values (strings, numbers, or key-value pairs)
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
 */

const propTypes = {
  ...fieldPropTypes,
  options: fieldOptionsType,
}

const defaultProps = {
  options: [],
}

function RadioGroup(props) {
  const {
    input: { value, onChange, name },
    meta, // eslint-disable-line no-unused-vars
    options,
    ...rest
  } = omitLabelProps(props)
  const optionObjects = serializeOptions(options)
  return (
    <LabeledField className="RadioGroup" {...props}>
      {optionObjects.map((option, i) => {
        return (
          <Input // eslint-disable-line react/jsx-key
            {...{
              key: i,
              type: 'radio',
              input: {
                name, // all radio inputs must share the same name
                value: '',
                onChange: () => onChange(option.value),
              },
              id: `${name}.${option.value}`, // override Input default behavior to assign id to input: { name }
              meta: {},
              checked: value === option.value,
              label: option.key,
              ...rest,
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
