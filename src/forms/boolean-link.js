import React, { PropTypes } from 'react'
import fieldPropTypes from './field-proptypes'

const propTypes = {
  ...fieldPropTypes,
  label: PropTypes.node.isRequired,
  className: PropTypes.string,
  valueToSet: PropTypes.bool,
}

const defaultProps = {
  valueToSet: true,
}

function BooleanLink ({
  input: { name, onChange },
  label,
  valueToSet,
  className
}) {
  return (
    <a
      id={ name }
      onClick={() => onChange(valueToSet)}
      className={ className }
    >{label}</a>
  )
}

BooleanLink.propTypes = propTypes
BooleanLink.defaultProps = defaultProps

export default BooleanLink