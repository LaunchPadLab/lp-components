import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

const propTypes = {
  ...fieldPropTypes,
  ...InputLabel.propTypes,
  ...InputError.propTypes,
  children: PropTypes.node
}

function classes ({ className, touched, invalid }) {
  return classnames(className, { 'error': touched && invalid })
}

// A wrapper that adds a label and an error field to an input

function LabeledField ({
    input: { name },
    meta: { error, touched, invalid },
    className,
    hint,
    label,
    tooltip,
    children
  }) {
  return (
    <fieldset className={ classes({ className, touched, invalid }) }>
      <InputLabel { ...{ hint, label, name, tooltip } } />
        { children }
      <InputError { ...{ error, invalid, touched } } />
    </fieldset>
  )
}

LabeledField.propTypes = propTypes

export default LabeledField