import React from 'react'
import PropTypes from 'prop-types'
import { blurDirty, fieldPropTypes, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { compose } from '../../utils'

/**
 *
 * A range input that can be used in a `redux-forms`-controlled form. 
 * 
 * This input only accepts and stores boolean values. 
 * Since the default `redux-forms` initial value is an empty string, you may need to set it to a boolean explicity in `mapStateToProps` using the [initalValues](http://redux-form.com/6.0.0-alpha.4/examples/initializeFromState) key.
 * 
 * @name RangeInput
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
 * function mapStateToProps () {
 *    return {
 *      initialValues: {
 *        isCool: false
 *      }
 *    }
 * }
 *
 * export default compose(
 *    connect(mapStateToProps)
 * )(CoolPersonForm)
**/

const propTypes = {
  ...fieldPropTypes,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  hideLabel: PropTypes.bool
}

const defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  hideLabel: false
}

function RangeInput (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    className, // eslint-disable-line no-unused-vars
    min,
    max,
    step,
    hideLabel,
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField { ...props }>
      <div>
      {
        !hideLabel &&
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
          ...rest 
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
