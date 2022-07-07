import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Checkbox as StaticCheckbox } from 'src'
import dynamicInput from '../../dynamic-input'

const Checkbox = dynamicInput({
  initialValue: false,
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticCheckbox)

const inputProps = {
  name: 'person.selected',
  onChange: action('checkbox clicked'),
}

storiesOf('Checkbox', module)
  .add('with default label', () => <Checkbox input={inputProps} meta={{}} />)
  .add('with custom label', () => (
    <Checkbox input={inputProps} meta={{}} label="Custom Label" />
  ))
  .add('with no label', () => (
    <Checkbox input={inputProps} meta={{}} label={false} />
  ))
  .add('with error', () => (
    <Checkbox
      input={inputProps}
      meta={{
        invalid: true,
        touched: true,
        error: 'Invalid input',
      }}
      value="0000"
    />
  ))
  .add('with a tooltip', () => (
    <Checkbox input={inputProps} meta={{}} tooltip="I am a tooltip" />
  ))
