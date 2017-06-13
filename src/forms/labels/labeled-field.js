import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import InputError from './input-error'
import InputLabel from './input-label'

/**
 *
 * A fieldset wrapper for redux-form controlled inputs. This wrapper adds an {@link InputLabel} 
 * above the wrapped component and an {@link InputError} below. Additionally, it adds the class `"error"`
 * to the fieldset if the input is touched and invalid.
 * 
 * In order to populate the `InputLabel` and `InputError` correctly, you should pass all the props of the corresponding input
 * to this component. To prevent label-specific props from being passed to the input itself,
 * use the {@link omitLabelProps} helper.
 *
 * @name LabeledField
 * @type Function
 *
 * @example
 * 
 * // A custom input to use with redux-forms
 * 
 * function LabeledPhoneInput (props) {
 *   const {  
 *      input: { name, value, onBlur, onChange },
 *      ...rest,
 *   } = omitLabelProps(props)
 *   return (
 *      <LabeledField { ...props }>
 *        <input {...{
 *          type: 'phone',
 *          name,
 *          value,
 *          onBlur,
 *          onChange,   
 *          ...rest,
 *        }}
 *     </LabeledField>
 *   )
 * }
 *
**/

const propTypes = {
  ...InputLabel.propTypes,
  ...InputError.propTypes,
  children: PropTypes.node
}

function LabeledField ({
    input: { name },
    meta: { error, touched, invalid },
    className,
    hint,
    label,
    tooltip,
    children
  }) {
  return (
    <fieldset className={ classnames(className, { 'error': touched && invalid }) }>
      <InputLabel { ...{ hint, label, name, tooltip } } />
        { children }
      <InputError { ...{ error, invalid, touched } } />
    </fieldset>
  )
}

LabeledField.propTypes = propTypes

export default LabeledField