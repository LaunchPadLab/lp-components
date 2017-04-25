import React from 'react'
import PropTypes from 'prop-types'
import { compose } from '../utils'
import fieldPropTypes from './field-proptypes'
import LabeledField from './labeled-field'
import blurDirty from './blur-dirty'

const propTypes = {
  ...fieldPropTypes,
  type: PropTypes.string,
}

const defaultProps = {
  type: 'text',
}

function Input (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    type,
    ...rest
  } = props
  return (
    <LabeledField { ...props }>
      <input { ...{ id: name, name, type, value, onBlur, onChange, ...rest } } />
    </LabeledField>
  )
}

Input.defaultProps = defaultProps
Input.propTypes = propTypes

export default compose(
  blurDirty()
)(Input)