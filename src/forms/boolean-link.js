import React, { PropTypes } from 'react'
import { fieldPropTypesWithValue } from './field-proptypes'

const propTypes = {
  ...fieldPropTypesWithValue(PropTypes.bool),
  label: PropTypes.node.isRequired,
  className: PropTypes.string,
}

function BooleanLink ({
  input: { name, onChange },
  label,
  className
}) {
  return (
    <a
      id={ name }
      onClick={() => onChange(true)}
      className={ className }
    >{label}</a>
  )
}

BooleanLink.propTypes = propTypes

export default BooleanLink