import React from 'react'
import { 
  blurDirty,
  fieldPropTypes,
  omitLabelProps,
  toHex,
  fromHex,
} from '../helpers'
import { LabeledField } from '../labels'
import { ColorPicker } from '../../controls'
import { 
  compose, 
  toggle, 
  togglePropTypes, 
  filterInvalidDOMProps 
} from '../../utils'

const propTypes = {
  ...fieldPropTypes,
  ...togglePropTypes('showDropdown')
}

const defaultProps = {}

function ColorInput (props) {
  const {
    input: { value, onBlur, onChange },
    showDropdown,
    setShowDropdown,
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField className="color-input" { ...props }>
      <ColorPicker
        value={ value }
        onChange={ onChange }
        active={ showDropdown }
        onOpen={ () => setShowDropdown(true) }
        onClose={() => {
          setShowDropdown(false)
          onBlur()
        }}
      />
      <input
        type="text"
        className="hex-input"
        placeholder="6 digit hex value"
        value={ fromHex(value) }
        onChange={ (e) => onChange(toHex(e.target.value)) }
        onFocus={ () => setShowDropdown(true) }
        onBlur={ onBlur }
        { ...filterInvalidDOMProps(rest) }
      />
      <span className="hex"> # </span>
    </LabeledField>
  )
}

ColorInput.propTypes = propTypes
ColorInput.defaultProps = defaultProps

export default compose(
  blurDirty(),
  toggle('showDropdown'),
)(ColorInput)