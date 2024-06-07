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

export const Default = () => (
  <Select input={inputProps} meta={{}} options={options} />
)

Default.story = {
  name: 'default',
}

export const WithCustomPlaceholder = () => (
  <Select
    input={inputProps}
    meta={{}}
    options={options}
    placeholder="Placeholder"
  />
)

WithCustomPlaceholder.story = {
  name: 'with custom placeholder',
}

export const WithEmptyPlaceholder = () => (
  <Select input={inputProps} meta={{}} options={options} placeholder=" " />
)

WithEmptyPlaceholder.story = {
  name: 'with empty placeholder',
}

export const WithEnabledPlaceholderOption = () => (
  <Select
    input={inputProps}
    meta={{}}
    options={options}
    placeholder="Placeholder"
    enablePlaceholderOption={true}
  />
)

WithEnabledPlaceholderOption.story = {
  name: 'with enabled placeholder option',
}

export const WithOptionGroups = () => (
  <Select input={inputProps} meta={{}} optionGroups={optionGroups} />
)

WithOptionGroups.story = {
  name: 'with option groups',
}
