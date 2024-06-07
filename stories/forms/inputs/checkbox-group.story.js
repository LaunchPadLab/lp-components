import React from 'react'
import { action } from '@storybook/addon-actions'
import { CheckboxGroup as StaticCheckboxGroup } from 'src'
import dynamicInput from '../../dynamic-input'

const CheckboxGroup = dynamicInput({
  initialValue: '',
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticCheckboxGroup)

const inputProps = {
  name: 'person.checkboxOptions',
  value: '',
  onChange: action('field changed'),
}

const options = [
  { key: 'First Option', value: '1' },
  { key: 'Second Option', value: '2' },
  { key: 'Third Option', value: '3' },
]

const SpecialLabel = ({ id, label }) => (
  <span>
    <label htmlFor={id}>
      <em>{label}</em>
    </label>
  </span>
)

export default {
  title: 'CheckboxGroup',
}

export const WithDefaultLabel = {
  render: () => (
    <CheckboxGroup input={inputProps} meta={{}} options={options} />
  ),

  name: 'with default label',
}

export const WithCustomLabel = {
  render: () => (
    <CheckboxGroup
      input={inputProps}
      meta={{}}
      label="Custom Label"
      options={options}
    />
  ),

  name: 'with custom label',
}

export const WithNoLabel = {
  render: () => (
    <CheckboxGroup
      input={inputProps}
      meta={{}}
      label={false}
      options={options}
    />
  ),

  name: 'with no label',
}

export const WithError = {
  render: () => (
    <CheckboxGroup
      input={inputProps}
      meta={{
        invalid: true,
        touched: true,
        error: 'Invalid input',
      }}
      value="0000"
      options={options}
    />
  ),

  name: 'with error',
}

export const WithEmptyOptions = {
  render: () => <CheckboxGroup input={inputProps} meta={{}} />,

  name: 'with empty options',
}

export const WithInputPropsSpecified = {
  render: () => (
    <CheckboxGroup
      input={inputProps}
      meta={{}}
      options={options}
      checkboxInputProps={{
        labelComponent: SpecialLabel,
      }}
    />
  ),

  name: 'with input props specified',
}

export const WithDropdown = {
  render: () => (
    <CheckboxGroup
      input={inputProps}
      meta={{}}
      options={options}
      dropdown={true}
    />
  ),

  name: 'with dropdown',
}
