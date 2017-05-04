import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { blurDirty, fieldPropTypesWithValue } from '../helpers'
import { LabeledField } from '../labels'
import { compose } from '../../utils'

const propTypes = {
  ...fieldPropTypesWithValue(PropTypes.object),
}

function DateInput (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    ...rest
  } = props
  const momentValue = value ? moment(value) : null
  return (
    <LabeledField { ...props }>
      <DatePicker 
        {...{ 
          id: name,
          name,
          placeholderText: 'MM/DD/YY',
          selected: momentValue,
          onBlur,
          onChange: (val) => onChange(val ? val.toDate() : ''),
          ...rest
        }}
      />
    </LabeledField>
  )
}

DateInput.propTypes = propTypes

export default compose(
  blurDirty()
)(DateInput)