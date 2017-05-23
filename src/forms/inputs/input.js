import React from 'react'
import PropTypes from 'prop-types'
import { blurDirty, fieldPropTypes } from '../helpers'
import { LabeledField } from '../labels'
import { compose } from '../../utils'

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
    className, // eslint-disable-line no-unused-vars
    ...rest
  } = props
  return (
    <LabeledField { ...props }>
      <input 
        {...{ 
          id: name,
          name,
          type,
          value,
          onBlur,
          onChange,
          ...rest
        }} 
      />
    </LabeledField>
  )
}

Input.defaultProps = defaultProps
Input.propTypes = propTypes

export default compose(
  blurDirty()
)(Input)