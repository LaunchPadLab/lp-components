import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { RadioGroup as StaticRadioGroup } from 'src'
import dynamicInput from '../../dynamic-input'

const RadioGroup = dynamicInput({
  initialValue: '',
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticRadioGroup)

const inputProps = {
  name: 'person.radioOptions',
  value: '',
  onChange: action('field changed')
}

const options = [
  { key: 'First Option', value: '1' },
  { key: 'Second Option', value: '2' },
  { key: 'Third Option', value: '3' }
]

storiesOf('RadioGroup', module)
  .add('with default label', () => (
    <RadioGroup
      input={inputProps}
      meta={{}}
      options={options}
    />
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
    <RadioGroup
      input={inputProps}
      meta={{}}
      label={false}
      options={options}
    />
  ))
  .add('with error', () => (
    <RadioGroup
      input={inputProps}
      meta={{
        invalid: true,
        touched: true,
        error: 'Invalid input'
      }}
      value="0000"
      options={options}
    />
  ))
  .add('with empty options', () => (
    <RadioGroup
      input={inputProps}
      meta={{}}
    />
  ))
