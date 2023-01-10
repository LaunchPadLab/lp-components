import React from 'react'
import { storiesOf } from '@storybook/react'
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

storiesOf('CheckboxGroup', module)
  .add('with default label', () => (
    <CheckboxGroup input={inputProps} meta={{}} options={options} />
  ))
  .add('with custom label', () => (
    <CheckboxGroup
      input={inputProps}
      meta={{}}
      label="Custom Label"
      options={options}
    />
  ))
  .add('with no label', () => (
    <CheckboxGroup
      input={inputProps}
      meta={{}}
      label={false}
      options={options}
    />
  ))
  .add('with error', () => (
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
  ))
  .add('with empty options', () => (
    <CheckboxGroup input={inputProps} meta={{}} />
  ))
  .add('with input props specified', () => (
    <CheckboxGroup
      input={inputProps}
      meta={{}}
      options={options}
      checkboxInputProps={{
        labelComponent: SpecialLabel,
      }}
    />
  ))
