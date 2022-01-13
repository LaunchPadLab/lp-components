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

/**
 *
 * An color input that can be used in a `redux-form`-controlled form.
 * The value of this input is a hex color string.
 * 
 * @name ColorInput
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @example
 * 
 * function UserForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field 
 *          name="favoriteColor"
 *          component={ ColorInput }
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
