import React from 'react'
import { compose } from 'redux'
import classnames from 'classnames'
import { fieldPropTypes, InputError, InputLabel } from 'lp-components'
import { toggle, togglePropTypes } from 'lp-hoc'
import { ColorPicker } from '../../controls'

const propTypes = {
  ...fieldPropTypes,
  ...InputError.propTypes,
  ...InputLabel.propTypes,
  ...togglePropTypes('shown')
}

const toHex = (value) => value ? `#${value}` : ''
const fromHex = (value) => value ? value.substring(1) : ''

function ColorInput ({
  input: { name, value, onBlur, onChange },
  meta: { error, pristine, touched, invalid },
  shown,
  toggleShown,
  hint,
  label,
  tooltip,
  className,
  ...rest
}) {
  const blurIfChanged = () => { if (!pristine) onBlur() }
  return (
    <fieldset className={ classes({ className, touched, invalid }) }>
      <InputLabel { ...{ hint, label, name, tooltip } } />

      <ColorPicker
        value={ value }
        onChange={ onChange }
        shown={shown}
        toggleShown={toggleShown}
        onBlur={blurIfChanged}
        {...rest} 
      />

      <input
        type="text"
        className="color-input"
        placeholder="6 digit hex value"
        value={fromHex(value)}
        onChange={(e) => onChange(toHex(e.target.value))}
        onFocus={ shown ? null : toggleShown }
        onBlur={blurIfChanged}
      />

      <span className="hex"> # </span>
      <InputError { ...{ error, invalid, touched } } />
    </fieldset>
  )
}

function classes ({ className, touched, invalid }) {
  return classnames(
    'color-picker',
    className,
    { error: touched && invalid }
  )
}

ColorInput.propTypes = propTypes

export default compose(
  toggle('shown')
)(ColorInput)