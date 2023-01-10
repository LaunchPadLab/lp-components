import React from 'react'
import { storiesOf } from '@storybook/react'
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

storiesOf('RadioGroup', module)
  .add('with default label', () => (
    <RadioGroup input={inputProps} meta={{}} options={options} />
  ))
  .add('with custom label', () => (
    <RadioGroup
      input={inputProps}
      meta={{}}
      label="Custom Label"
      options={options}
    />
  ))
  .add('with no label', () => (
    <RadioGroup input={inputProps} meta={{}} label={false} options={options} />
  ))
  .add('with error', () => (
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
  ))
  .add('with empty options', () => <RadioGroup input={inputProps} meta={{}} />)
  .add('with disabled options', () => (
    <RadioGroup
      input={inputProps}
      meta={{}}
      options={options}
      disabled={true}
    />
  ))
  .add('with boolean options', () => (
    <RadioGroup
      input={inputProps}
      label="Are you sure?"
      meta={{}}
      options={[
        { key: 'Yes', value: true },
        { key: 'No', value: false },
      ]}
    />
  ))
  .add('with input props specified', () => (
    <RadioGroup
      input={inputProps}
      meta={{}}
      options={options}
      radioInputProps={{
        labelComponent: SpecialLabel,
      }}
    />
  ))
