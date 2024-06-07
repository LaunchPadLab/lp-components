import React from 'react'
import { action } from '@storybook/addon-actions'
import { DateInput as StaticDateInput } from 'src'
import dynamicInput from '../../dynamic-input'

const DateInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticDateInput)

const inputProps = {
  name: 'person.birthDate',
  onChange: action('date input changed'),
  onBlur: action('blurred'),
}

export default {
  title: 'DateInput',
}

export const Default = () => <DateInput input={inputProps} meta={{}} />

Default.story = {
  name: 'default',
}

export const CustomPlaceholder = () => (
  <DateInput input={inputProps} meta={{}} placeholderText={'custom'} />
)

CustomPlaceholder.story = {
  name: 'custom placeholder',
}
