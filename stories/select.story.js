import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Select as StaticSelect } from '../src'
import dynamicInput from './dynamic-input'

const Select = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticSelect)

const inputProps = {
  name: 'person.selectOptions',
  value: '',
  onChange: action('field changed')
}

const options = [
  { key: 'First Option', value: '1' },
  { key: 'Second Option', value: '2' },
  { key: 'Third Option', value: '3' }
]

storiesOf('Select', module)
  .add('default', () => (
    <Select
      input={inputProps}
      meta={{}}
      options={options}
    />
  ))
  .add('with custom placeholder', () => (
    <Select
      input={inputProps}
      meta={{}}
      options={options}
      placeholder="Placeholder"
    />
  ))
  .add('with empty placeholder', () => (
    <Select
      input={inputProps}
      meta={{}}
      options={options}
      placeholder=" "
    />
  ))
  .add('with empty option', () => (
    <Select
      input={inputProps}
      meta={{}}
      options={options}
      placeholder="Placeholder"
      emptyOption={true}
    />
  ))