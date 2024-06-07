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

export const WithDefaultLabel = () => (
  <CheckboxGroup input={inputProps} meta={{}} options={options} />
)

WithDefaultLabel.story = {
  name: 'with default label',
}

export const WithCustomLabel = () => (
  <CheckboxGroup
    input={inputProps}
    meta={{}}
    label="Custom Label"
    options={options}
  />
)

WithCustomLabel.story = {
  name: 'with custom label',
}

export const WithNoLabel = () => (
  <CheckboxGroup input={inputProps} meta={{}} label={false} options={options} />
)

WithNoLabel.story = {
  name: 'with no label',
}

export const WithError = () => (
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
)

WithError.story = {
  name: 'with error',
}

export const WithEmptyOptions = () => (
  <CheckboxGroup input={inputProps} meta={{}} />
)

WithEmptyOptions.story = {
  name: 'with empty options',
}

export const WithInputPropsSpecified = () => (
  <CheckboxGroup
    input={inputProps}
    meta={{}}
    options={options}
    checkboxInputProps={{
      labelComponent: SpecialLabel,
    }}
  />
)

WithInputPropsSpecified.story = {
  name: 'with input props specified',
}

export const WithDropdown = () => (
  <CheckboxGroup
    input={inputProps}
    meta={{}}
    options={options}
    dropdown={true}
  />
)

WithDropdown.story = {
  name: 'with dropdown',
}
