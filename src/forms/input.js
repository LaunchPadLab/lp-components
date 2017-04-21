import React, { PropTypes } from 'react'
import { compose } from '../utils'
import fieldPropTypes from './field-proptypes'
import validatedField from './validated-field'
import blurDirty from './blur-dirty'

const propTypes = {
  ...fieldPropTypes,
  type: PropTypes.string,
}

const defaultProps = {
  type: 'text',
}

function Input ({
  input: { name, value, onBlur, onChange },
  meta, // eslint-disable-line no-unused-vars
  type,
  ...rest
}) {
  return (
    <input { ...{ id: name, name, type, value, onBlur, onChange, ...rest } } />
  )
}

Input.defaultProps = defaultProps
Input.propTypes = propTypes

export default compose(
  validatedField(),
  blurDirty()
)(Input)