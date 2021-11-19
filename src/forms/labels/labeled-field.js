import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import InputError from './input-error'
import InputLabel from './input-label'
import { hasInputError } from '../helpers'

/**
 *
 * A container wrapper for redux-form controlled inputs. This wrapper adds a label component (defaults to {@link InputLabel})
 * above the wrapped component and an error component below (defaults to {@link InputError}). Additionally, it adds the class `"error"`
 * to the wrapping div if the input is touched and invalid.
 *
 * In order to populate the `InputLabel` and `InputError` correctly, you should pass all the props of the corresponding input
 * to this component. To prevent label-specific props from being passed to the input itself,
 * use the {@link omitLabelProps} helper.
 *
 * @name LabeledField
 * @type Function
 * @param {Boolean} [hideErrorLabel] - A boolean determining whether to hide the error label on input error (optional, default `false`)
 * @param {Function} [labelComponent=InputLabel] - A custom label component for the input
 * @param {Function} [errorComponent=InputError] - A custom error component for the input
 *
 * @example
 *
 * // A custom input to use with redux-form
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
 * // A custom label to pass in as a label component (using <InputLabel /> and redux-form)
 *
 * import LabeledPhoneInput from './LabeledPhoneInput'
 * import { InputLabel } from 'lp-components'
 * import { Field } from 'redux-form'
 *
 * function CustomLabelComponent ({ onClickLabel, ...rest }) {
 *  return (
 *    <InputLabel { ...rest }>
 *      I agree to the <button onClick={ onClickLabel }>Terms and Conditions</button>
 *    </InputLabel>
 *  )
 * }
 *
 * <Field
 *   name="phoneNumber"
 *   component={ LabeledPhoneInput }
 *   onClickLabel={ () => 'bar' }
 *   labelComponent={ CustomLabelComponent }
 * />
 *
 */

const propTypes = {
  ...InputLabel.propTypes,
  ...InputError.propTypes,
  children: PropTypes.node,
  hideErrorLabel: PropTypes.bool,
}

const defaultProps = {
  hideErrorLabel: false,
}

function LabeledField({
  id,
  input,
  meta,
  className,
  errorComponent: ErrorComponent = InputError,
  labelComponent: LabelComponent = InputLabel,
  children,
  hideErrorLabel,
  ...rest
}) {
  const { name } = input
  const { touched, invalid } = meta
  return (
    <div
      className={classnames(className, {
        error: hasInputError({ touched, invalid }),
      })}
    >
      <LabelComponent {...{ name, id, ...rest }} />
      {children}
      {!hideErrorLabel && (
        <ErrorComponent {...{ ...input, ...meta, ...rest }} />
      )}
    </div>
  )
}

LabeledField.propTypes = propTypes
LabeledField.defaultProps = defaultProps

export default LabeledField
