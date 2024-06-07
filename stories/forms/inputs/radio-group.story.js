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

export const WithDefaultLabel = () => (
  <RadioGroup input={inputProps} meta={{}} options={options} />
)

WithDefaultLabel.story = {
  name: 'with default label',
}

export const WithCustomLabel = () => (
  <RadioGroup
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
  <RadioGroup input={inputProps} meta={{}} label={false} options={options} />
)

WithNoLabel.story = {
  name: 'with no label',
}

export const WithError = () => (
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
)

WithError.story = {
  name: 'with error',
}

export const WithEmptyOptions = () => (
  <RadioGroup input={inputProps} meta={{}} />
)

WithEmptyOptions.story = {
  name: 'with empty options',
}

export const WithDisabledOptions = () => (
  <RadioGroup input={inputProps} meta={{}} options={options} disabled={true} />
)

WithDisabledOptions.story = {
  name: 'with disabled options',
}

export const WithBooleanOptions = () => (
  <RadioGroup
    input={inputProps}
    label="Are you sure?"
    meta={{}}
    options={[
      { key: 'Yes', value: true },
      { key: 'No', value: false },
    ]}
  />
)

WithBooleanOptions.story = {
  name: 'with boolean options',
}

export const WithInputPropsSpecified = () => (
  <RadioGroup
    input={inputProps}
    meta={{}}
    options={options}
    radioInputProps={{
      labelComponent: SpecialLabel,
    }}
  />
)

WithInputPropsSpecified.story = {
  name: 'with input props specified',
}
