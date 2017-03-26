import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { fieldPropTypesWithValue } from './field-proptypes'
import InputError from './input-error'

const propTypes = {
  ...fieldPropTypesWithValue(PropTypes.bool),
  ...InputError.propTypes,
  label: PropTypes.node.isRequired,
}

function BooleanLink ({
  input,
  input: { name, value, onChange },
  meta: { error, touched, invalid },
  label,
  ...rest
}) {
  return (
    <span className={ classes({ touched, invalid }) }>

      <a
        id={ name }
        type="button"        
        onClick={() => input.onChange(true)}
        { ...{ name, value, onChange, ...rest } }
      >{label}</a>      

      <InputError { ...{ error, invalid, touched } } />
    </span>
  )
}

function classes ({ touched, invalid }) {
  return classnames(
    'boolean-link',
    { error: touched && invalid }
  )
}

BooleanLink.propTypes = propTypes

export default BooleanLink