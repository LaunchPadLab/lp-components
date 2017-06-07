import React from 'react'
import PropTypes from 'prop-types'
import { blurDirty, fieldPropTypes, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { compose } from '../../utils'

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
