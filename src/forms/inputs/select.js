import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { blurDirty, fieldPropTypes, fieldOptionsType } from '../helpers'
import { LabeledField } from '../labels'
import { compose, objectify } from '../../utils'

const propTypes = {
  ...fieldPropTypes,
  placeholder: PropTypes.string,
  options: fieldOptionsType
}

const defaultProps = {
  options: [],
}

function Select (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    options,
    placeholder,
    ...rest
  } = props
  const optionObjects = objectify(options)
  return (
    <LabeledField { ...props }>
      <select 
        {...{
          id: name,
          className: classnames({ 'unselected': value === '' }),
          name,
          value,
          onBlur,
          onChange,
          ...rest 
        }}
      >
        { 
          placeholder &&
          <option value='' disabled>
            { placeholder }
          </option>
        }
        { 
          optionObjects.map(({ key, value }) =>
            <option key={ key } value={ value }>
              { key }
            </option>
          )
        }
      </select>
     </LabeledField>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default compose(
  blurDirty()
)(Select)
