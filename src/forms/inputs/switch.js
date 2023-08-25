import React from 'react'
import PropTypes from 'prop-types'
import { default as BaseSwitch } from 'react-switch'
import {
  blurDirty,
  hasInputError,
  fieldPropTypesWithValue,
  omitLabelProps,
  replaceEmptyStringValue,
} from '../helpers'
import { LabeledField } from '../labels'
import { compose, generateInputErrorId } from '../../utils'

/**
 *
 * A switch input that can be used in a `redux-form`-controlled form.
 *
 * This input only accepts and stores boolean values.
 *
 * See the [react-switch](https://github.com/markusenglund/react-switch) documentation for additional styling properties.
 *
 * @name Switch
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Element | Boolean} checkedIcon - An icon displayed when the switch is checked. Set to `false` if no check icon is desired.
 * @param {Element | Boolean} uncheckedIcon - An icon displayed when the switch is unchecked. Set to `false` if no uncheck icon is desired.
 *
 * @example
 *
 * function CoolPersonForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field name="isCool" component={ Switch } />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 *
 * export default CoolPersonForm
 */

const propTypes = {
  ...fieldPropTypesWithValue(PropTypes.bool),
  label: PropTypes.node, // eslint-disable-line react/no-unused-prop-types
}

function Switch(props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField className="switch" {...props}>
      <BaseSwitch
        {...{
          id: name,
          name,
          checked: value,
          onBlur,
          onChange: (checked) => onChange(checked),
          'aria-describedby': hasInputError(meta)
            ? generateInputErrorId(name)
            : null,
          ...rest,
        }}
      />
    </LabeledField>
  )
}

Switch.propTypes = propTypes

export default compose(blurDirty(), replaceEmptyStringValue(false))(Switch)
