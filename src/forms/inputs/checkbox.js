import React from 'react'
import PropTypes from 'prop-types'
import { blurDirty, fieldPropTypesWithValue } from '../helpers'
import { LabeledField } from '../labels'
import { compose } from '../../utils'

const propTypes = {
  ...fieldPropTypesWithValue(PropTypes.bool),
  label: PropTypes.node,
}

function Checkbox (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    ...rest
  } = props
  return (
    <LabeledField className="checkbox" { ...props }>
      <input {...{ 
        id: name,
        name,
        value,
        type: 'checkbox', 
        checked: value,
        onBlur,
        onChange: () => onChange(!value),
        ...rest 
      }} 
    />
    </LabeledField>
  )
}

Checkbox.propTypes = propTypes

export default compose(
  blurDirty()
)(Checkbox)
