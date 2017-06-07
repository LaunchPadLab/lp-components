import React from 'react'
import PropTypes from 'prop-types'
import { blurDirty, fieldPropTypes, omitLabelProps } from '../helpers'
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
    className, // eslint-disable-line no-unused-vars
    type,
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField { ...props }>
      <div className="input-wrapper">
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
      </div>
    </LabeledField>
  )
}

Input.defaultProps = defaultProps
Input.propTypes = propTypes

export default compose(
  blurDirty()
)(Input)