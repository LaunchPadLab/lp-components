import React from 'react'
import { action } from '@storybook/addon-actions'
import { Select as StaticSelect } from 'src'
import dynamicInput from '../../dynamic-input'

const Select = dynamicInput({
  initialValue: '',
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticSelect)

const inputProps = {
  name: 'person.selectOptions',
  value: '',
  onChange: action('field changed'),
}

const options = [
  { key: 'First Option', value: '1' },
  { key: 'Second Option', value: '2' },
  { key: 'Third Option', value: '3' },
]

const optionGroups = [
  { name: 'Fruit Group', options: ['apple', 'banana'] },
  { name: 'Veggie Group', options: ['lettuce', 'green pepper'] },
  { name: 'Ice Cream Group', options: ['mint chocolate chip', 'cookie dough'] },
]

export default {
  title: 'Select',
}

export const Default = {
  render: () => <Select input={inputProps} meta={{}} options={options} />,

  name: 'default',
}

export const WithCustomPlaceholder = {
  render: () => (
    <Select
      input={inputProps}
      meta={{}}
      options={options}
      placeholder="Placeholder"
    />
  ),

  name: 'with custom placeholder',
}

export const WithEmptyPlaceholder = {
  render: () => (
    <Select input={inputProps} meta={{}} options={options} placeholder=" " />
  ),

  name: 'with empty placeholder',
}

export const WithEnabledPlaceholderOption = {
  render: () => (
    <Select
      input={inputProps}
      meta={{}}
      options={options}
      placeholder="Placeholder"
      enablePlaceholderOption={true}
    />
  ),

  name: 'with enabled placeholder option',
}

export const WithOptionGroups = {
  render: () => (
    <Select input={inputProps} meta={{}} optionGroups={optionGroups} />
  ),

  name: 'with option groups',
}
