import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { CheckboxGroup } from '../src'

const checkboxProps = {
  name: 'person.checkboxOptions',
  value: '',
  onChange: action('field changed')
}

const options = [
  { key: 'First Option', value: '1' },
  { key: 'Second Option', value: '2' },
  { key: 'Third Option', value: '3' }
]

storiesOf('CheckboxGroup', module)
  .add('with default label', () => (
    <CheckboxGroup
      input={checkboxProps}
      meta={{}}
      options={options}
    />
  ))
  .add('with custom label', () => (
    <CheckboxGroup
      input={checkboxProps}
      meta={{}}
      label="Custom Label"
      options={options}
    />
  ))
  .add('with no label', () => (
    <CheckboxGroup
      input={checkboxProps}
      meta={{}}
      label={false}
      options={options}
    />
  ))
  .add('with error', () => (
    <CheckboxGroup
      input={checkboxProps}
      meta={{
        invalid: true,
        touched: true,
        error: 'Invalid input'
      }}
      value="0000"
    />
  ))
  .add('with empty options', () => (
    <CheckboxGroup
      input={checkboxProps}
      meta={{}}
    />
  ))
