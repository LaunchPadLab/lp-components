import React from 'react'
import PropTypes from 'prop-types'
import { blurDirty, fieldPropTypes } from '../helpers'
import { LabeledField } from '../labels'
import { compose } from '../../utils'

const propTypes = {
  ...fieldPropTypes,
  type: PropTypes.string,
  icon: PropTypes.string,
}

const defaultProps = {
  type: 'text',
}

function IconInput (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    type,
    icon,
    ...rest
  } = props
  return (
    <LabeledField { ...props }>
      <div className="icon-label">
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
        <i className={ `${icon}-icon` } />
      </div>
    </LabeledField>
  )
}

IconInput.defaultProps = defaultProps
IconInput.propTypes = propTypes

export default compose(
  blurDirty()
)(IconInput)
