import React from 'react'
import PropTypes from 'prop-types'
import { blurDirty, fieldPropTypes, hasInputError, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { compose, filterInvalidDOMProps, generateInputErrorId } from '../../utils'

/**
 *
 * A range input that can be used in a `redux-form`-controlled form.
 *
 * @name RangeInput
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Number} [min=0] - The minumum attribute of the slider control
 * @param {Number} [max=100] - The maximum attribute of the slider control
 * @param {Number} [step=1] - The step attribute of the slider control
 * @param {Boolean} [hideRangeValue=false] - A boolean representing whether or not to display the range value
 * @example
 *
 * function StudentForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="minGPA"
 *          component={ RangeInput }
 *          step={ 0.5 }
 *          min={ 2.0 }
 *          max={ 4.0 }
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
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  hideRangeValue: PropTypes.bool
}

const defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  hideRangeValue: false
}

function RangeInput (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    className, // eslint-disable-line no-unused-vars
    hideRangeValue,
    min,
    max,
    step,
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField { ...props }>
      <div>
      {
        !hideRangeValue &&
        <label className="range-value">{value}</label>
      }
      </div>
      <input
        {...{
          id: name,
          name,
          type: 'range',
          value,
          onBlur,
          onChange,
          min,
          max,
          step,
          'aria-describedby': hasInputError(meta) ? generateInputErrorId(name) : null,
          ...filterInvalidDOMProps(rest)
        }}
      />
    </LabeledField>
  )
}

RangeInput.defaultProps = defaultProps
RangeInput.propTypes = propTypes

export default compose(
  blurDirty()
)(RangeInput)
