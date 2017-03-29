import React, { PropTypes } from 'react'
import fieldPropTypes from './field-proptypes'

const propTypes = {
  ...fieldPropTypes,
  label: PropTypes.node.isRequired,
  className: PropTypes.string,
  valueToSet: PropTypes.any,
}

const defaultProps = {
  valueToSet: true,
}

function SetterLink ({
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

SetterLink.propTypes = propTypes
SetterLink.defaultProps = defaultProps

export default SetterLink