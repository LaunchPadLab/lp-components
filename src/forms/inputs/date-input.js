import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { blurDirty, fieldPropTypesWithValue, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { compose } from '../../utils'
import { parseISO } from 'date-fns'

/**
 *
 * An input component that wraps a `DatePicker` component from the [react-datepicker](https://github.com/Hacker0x01/react-datepicker) library.
 * This wrapper adds the following functionality to `DatePicker`:
 * - Adapts it to receive `redux-form`-style input props.
 * - Adds name and error labels.
 *
 * With the exception of the `input` and `meta` props, all props are passed down to the `DatePicker` component.
 * A full list of props supported by this component can be found [here](https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md). Note that unfortunately `aria-*` props are **not** supported.
 *
 * _Note: this component requires special styles in order to render correctly. To include these styles in your project, follow the directions in the main [README](README.md#dateinput-styles) file._
 *
 * @name DateInput
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @example
 *
 * function BirthdayForm ({ handleSubmit }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="birthday"
 *          component={DateInput}
 *          placeholderText="mm/dd/yyyy"
 *        />
 *     </form>
 *   )
 * }
 *
 * // Will render datepicker with label "Birthday" and placeholder "mm/dd/yyyy"
 *
 */

const propTypes = {
  ...fieldPropTypesWithValue(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
}

const defaultProps = {
  placeholderText: 'MM/DD/YY',
}

/* Ignore test coverage: */
/* istanbul ignore next */

// React datepicker expects a date value
function parseDate(value) {
  if (!value || value instanceof Date) return value

  return parseISO(value)
}

function DateInput(props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars,
    className, // eslint-disable-line no-unused-vars
    ...rest
  } = omitLabelProps(props)
  const dateValue = parseDate(value)
  const calendarRef = useRef()

  return (
    <LabeledField {...props}>
      <div className="date-input-wrapper">
        <DatePicker
          {...{
            id: name,
            name,
            ref: calendarRef,
            selected: dateValue || null, // passing in an empty string will not default the tabbable element to today
            onBlur: () => onBlur(value),
            onChange: (val) => onChange(val ?? ''),
            onSelect: () => {
              /* After a user selects a date and then clicks on another element, 
                 we expect onBlur to fire. However, that is _not_ happening
                 because focus is not reset to the input. We're hooking into this
                 lifecycle method to force the input to receive focus, which
                 will then fire a blur event when it loses focus (and thus trigger onBlur).

                 This is a temporary workaround until https://github.com/Hacker0x01/react-datepicker/issues/2028 is resolved.
              */
              setTimeout(() => calendarRef.current.setFocus(), 0) // deferFocusInput accomplishes this, but it's likely eliminated during tree shaking since it's never used internally
            },
            ...rest,
          }}
        />
      </div>
    </LabeledField>
  )
}

DateInput.defaultProps = defaultProps
DateInput.propTypes = propTypes

export default compose(blurDirty())(DateInput)
