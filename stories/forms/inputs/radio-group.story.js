import React from 'react'
import { action } from '@storybook/addon-actions'
import { RadioGroup as StaticRadioGroup } from 'src'
import dynamicInput from '../../dynamic-input'

const RadioGroup = dynamicInput({
  initialValue: '',
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticRadioGroup)

const inputProps = {
  name: 'person.radioOptions',
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
  title: 'RadioGroup',
}

export const WithDefaultLabel = {
  render: () => <RadioGroup input={inputProps} meta={{}} options={options} />,

  name: 'with default label',
}

export const WithCustomLabel = {
  render: () => (
    <RadioGroup
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
    <RadioGroup input={inputProps} meta={{}} label={false} options={options} />
  ),

  name: 'with no label',
}

export const WithError = {
  render: () => (
    <RadioGroup
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
  render: () => <RadioGroup input={inputProps} meta={{}} />,

  name: 'with empty options',
}

export const WithDisabledOptions = {
  render: () => (
    <RadioGroup
      input={inputProps}
      meta={{}}
      options={options}
      disabled={true}
    />
  ),

  name: 'with disabled options',
}

export const WithBooleanOptions = {
  render: () => (
    <RadioGroup
      input={inputProps}
      label="Are you sure?"
      meta={{}}
      options={[
        { key: 'Yes', value: true },
        { key: 'No', value: false },
      ]}
    />
  ),

  name: 'with boolean options',
}

export const WithInputPropsSpecified = {
  render: () => (
    <RadioGroup
      input={inputProps}
      meta={{}}
      options={options}
      radioInputProps={{
        labelComponent: SpecialLabel,
      }}
    />
  ),

  name: 'with input props specified',
}
