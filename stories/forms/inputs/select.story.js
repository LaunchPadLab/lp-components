import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Select as StaticSelect } from 'src'
import dynamicInput from '../../dynamic-input'

const Select = dynamicInput({
  initialValue: '',
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticSelect)

const inputProps = {
  name: 'person.selectOptions',
  value: '',
  onChange: action('field changed'),
}

const options = [
  { key: 'First Option', value: '1' },
  { key: 'Second Option', value: '2' },
  { key: 'Third Option', value: '3' },
]

const optionGroups = [
  { name: 'Fruit Group', options: ['apple', 'banana'] },
  { name: 'Veggie Group', options: ['lettuce', 'green pepper'] },
  { name: 'Ice Cream Group', options: ['mint chocolate chip', 'cookie dough'] },
]

storiesOf('Select', module)
  .add('default', () => (
    <Select input={inputProps} meta={{}} options={options} />
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
    <Select input={inputProps} meta={{}} options={options} placeholder=" " />
  ))
  .add('with enabled placeholder option', () => (
    <Select
      input={inputProps}
      meta={{}}
      options={options}
      placeholder="Placeholder"
      enablePlaceholderOption={true}
    />
  ))
  .add('with option groups', () => (
    <Select input={inputProps} meta={{}} optionGroups={optionGroups} />
  ))
