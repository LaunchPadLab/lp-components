import React, { PropTypes } from 'react'
import classnames from 'classnames'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

const propTypes = {
  ...fieldPropTypes,
  ...InputLabel.propTypes,
  ...InputError.propTypes,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number
}

const defaultProps = {
  min: 0,
  max: 100,
  step: 1
}

function RangeInput ({
  input: { name, value, onBlur, onChange },
  meta: { error, pristine, touched, invalid },
  className,
  hint,
  label,
  tooltip,
  min,
  max,
  step,
  ...rest
}) {
  return (
    <fieldset className={ classes({ className, touched, invalid }) }>
      <InputLabel { ...{ hint, label, name, tooltip } } />
      <div>
        <label className="range-value">{value}</label>
      </div>
      <input 
        type="range"
        onBlur={ pristine ? null : onBlur } 
        { ...{ id: name, name, value, onChange, min, max, step, ...rest } }
      />
      <InputError { ...{ error, invalid, touched } } />
    </fieldset>
  )
}

function classes ({ className, touched, invalid }) {
  return classnames(className, { error: touched && invalid })
}

RangeInput.defaultProps = defaultProps
RangeInput.propTypes = propTypes

export default RangeInput