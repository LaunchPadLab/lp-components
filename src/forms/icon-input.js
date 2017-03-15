import React, { PropTypes } from 'react'
import classnames from 'classnames'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

const propTypes = {
  ...fieldPropTypes,
  ...InputLabel.propTypes,
  ...InputError.propTypes,
  type: PropTypes.string,
  icon: PropTypes.string,
}

const defaultProps = {
  type: 'text',
}

function IconInput ({
  input: { name, value, onBlur, onChange },
  meta: { error, pristine, touched, invalid },
  className,
  hint,
  label,
  tooltip,
  type,
  icon,
  ...rest
}) {
  return (
    <fieldset className={ classes({ className, touched, invalid }) }>
      <InputLabel { ...{ hint, label, name, tooltip } } />
      <div className="icon-label">
        <input 
          onBlur={ pristine ? null : onBlur } 
          { ...{ id: name, name, type, value, onChange, ...rest } }
        />
        <i className={ `${icon}-icon` } />
      </div>
      <InputError { ...{ error, invalid, touched } } />
    </fieldset>
  )
}

function classes ({ className, touched, invalid }) {
  return classnames(className, { error: touched && invalid })
}

IconInput.defaultProps = defaultProps
IconInput.propTypes = propTypes

export default IconInput
