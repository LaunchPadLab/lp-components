import React from 'react'
import PropTypes from 'prop-types'
import { 
  blurDirty,
  fieldPropTypesWithValue,
  omitLabelProps,
  replaceEmptyStringValue,
} from '../helpers'
import { LabeledField } from '../labels'
import { compose, generateInputErrorId } from '../../utils'

/**
 *
 * A checkbox input that can be used in a `redux-forms`-controlled form. 
 * 
 * This input only accepts and stores boolean values. 
 * 
 * @name Checkbox
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @example
 * 
 * function CoolPersonForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field name="isCool" component={ Checkbox } />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 *
 * export default CoolPersonForm
**/

const propTypes = {
  ...fieldPropTypesWithValue(PropTypes.bool),
  label: PropTypes.node,
}

function Checkbox (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField className="checkbox" { ...props }>
      <input {...{ 
        id: name,
        name,
        value,
        type: 'checkbox', 
        checked: value,
        onBlur,
        onChange: () => onChange(!value),
        'aria-describedby': generateInputErrorId(name),
        ...rest 
      }} 
    />
    </LabeledField>
  )
}

Checkbox.propTypes = propTypes

export default compose(
  blurDirty(),
  replaceEmptyStringValue(false),
)(Checkbox)
