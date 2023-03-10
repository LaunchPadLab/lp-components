import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import InputError from './input-error'
import FieldsetLegend from './fieldset-legend'
import { hasInputError } from '../helpers'

/**
 *
 * A fieldset wrapper for redux-form controlled inputs. This wrapper adds a label component (defaults to {@link FieldsetLegend})
 * above the wrapped component and an error component below (defaults to {@link InputError}). Additionally, it adds the class `"error"`
 * to the wrapping fieldset if the input is touched and invalid.
 *
 * In order to populate the `FieldsetLegend` and `InputError` correctly, you should pass all the props of the corresponding input
 * to this component. To prevent label-specific props from being passed to the input itself,
 * use the {@link omitLabelProps} helper.
 *
 * @name LabeledFieldset
 * @type Function
 * @param {Boolean} [hideErrorLabel] - A boolean determining whether to hide the error label on input error (optional, default `false`)
 * @param {Function} [labelComponent=FieldsetLegend] - A custom label component for the input, should ideally be a legend element
 * @param {Function} [errorComponent=InputError] - A custom error component for the input
 * @param {String} [ariaLabelledby] - A unique identifier that should be used when not providing a label, it should match the `id` value of the element you want to use in the place of a label
 *
 * @example
 *
 * // A custom input to use with redux-form
 *
 * function CustomRadioGroup (props) {
 *   const {
 *      input: { name, value, onBlur, onChange },
 *      options,
 *      ...rest,
 *   } = omitLabelProps(props)
 *   return (
 *      <LabeledFieldset {...props}>
 *        {options.map((option) => (
 *          <RadioButton
 *            key={option.value}
 *            {...{
 *              type: 'radio',
 *              input: {
 *                name,
 *                value: option.value,
 *                onChange: () => onChange(option.value),
 *              },
 *              id: `${name}.${option.value}`,
 *              meta: {},
 *              checked: value === option.value,
 *              label: option.key,
 *              ...rest,
 *            }}
 *          />
 *        ))}
 *     </LabeledFieldset>
 *   )
 * }
 *
 * // A custom legend to pass in as a label component (using <FieldsetLegend /> and redux-form)
 *
 * import { FieldsetLegend, CheckboxGroup } from 'lp-components'
 * import { Field } from 'redux-form'
 *
 * function CustomLegendComponent ({ numberOfFavorites, ...rest }) {
 *  return (
 *    <FieldsetLegend { ...rest }>
 *      Check <strong>only</strong> your {numberOfFavorites} most favorite fruits from the list
 *    </FieldsetLegend>
 *  )
 * }
 *
 * <Field
 *   name="favoriteFruits"
 *   component={CheckboxGroup}
 *   options={[
 *     'Bananas',
 *     'Pineapples',
 *     'Potatoes',
 *   ]}
 *   numberOfFavorites={2}
 *   labelComponent={CustomLegendComponent}
 * />
 *
 */

const propTypes = {
  ...FieldsetLegend.propTypes,
  ...InputError.propTypes,
  children: PropTypes.node,
  hideErrorLabel: PropTypes.bool,
  ariaLabelledby: PropTypes.string,
}

const defaultProps = {
  hideErrorLabel: false,
  ariaLabelledby: null,
}

function LabeledFieldset({
  id,
  input,
  meta,
  className,
  errorComponent: ErrorComponent = InputError,
  labelComponent: LabelComponent = FieldsetLegend,
  children,
  hideErrorLabel,
  label,
  ariaLabelledby,
  ...rest
}) {
  const { name } = input
  const { touched, invalid } = meta
  return (
    <fieldset
      className={classnames(className, {
        error: hasInputError({ touched, invalid }),
        disabled: rest.disabled,
      })}
      aria-labelledby={ariaLabelledby}
    >
      <LabelComponent {...{ name, id, label, ...rest }} />
      {children}
      {!hideErrorLabel && (
        <ErrorComponent {...{ ...input, ...meta, ...rest }} />
      )}
    </fieldset>
  )
}

LabeledFieldset.propTypes = propTypes
LabeledFieldset.defaultProps = defaultProps

export default LabeledFieldset
