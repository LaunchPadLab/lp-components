import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { DropdownCheckboxGroup as StaticDropdownCheckboxGroup } from 'src'
import dynamicInput from '../../dynamic-input'

const DropdownCheckboxGroup = dynamicInput({
  initialValue: '',
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticDropdownCheckboxGroup)

const inputProps = {
  name: 'person.checkboxOptions',
  value: '',
  onChange: action('field changed')
}

const options = [
  { key: 'First Option', value: '1' },
  { key: 'Second Option', value: '2' },
  { key: 'Third Option', value: '3' }
]

storiesOf('DropdownCheckboxGroup', module)
  .add('with default label', () => (
    <DropdownCheckboxGroup
      input={ inputProps }
      meta={ {} }
      options={ options }
    />
  ))
  .add('with custom label', () => (
    <DropdownCheckboxGroup
      input={ inputProps }
      meta={ {} }
      label="Custom Label"
      options={ options }
    />
  ))
  .add('with no label', () => (
    <DropdownCheckboxGroup
      input={ inputProps }
      meta={ {} }
      label={ false }
      options={ options }
    />
  ))
  .add('with error', () => (
    <DropdownCheckboxGroup
      input={ inputProps }
      meta={ {
        invalid: true,
        touched: true,
        error: 'Invalid input'
      } }
      value="0000"
      options={ options }
    />
  ))
  .add('with empty options', () => (
    <DropdownCheckboxGroup
      input={ inputProps }
      meta={ {} }
    />
  ))
