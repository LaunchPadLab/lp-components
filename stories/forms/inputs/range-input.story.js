import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { RangeInput as StaticRangeInput } from 'src'
import dynamicInput from '../../dynamic-input'

const RangeInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticRangeInput)

const rangeInputProps = {
  name: 'person.minAge',
  onChange: action('field changed'),
}

storiesOf('RangeInput', module)
  .add('with default `step`, `min`, and `max`', () => (
    <RangeInput input={rangeInputProps} meta={{}} />
  ))
  .add('with custom `step`, `min`, and `max`', () => (
    <RangeInput input={rangeInputProps} meta={{}} min={20} max={80} step={5} />
  ))
  .add('with the value label hidden', () => (
    <RangeInput input={rangeInputProps} meta={{}} hideRangeLabel />
  ))
  .add('with error', () => (
    <RangeInput
      input={rangeInputProps}
      meta={{
        invalid: true,
        touched: true,
        error: 'Invalid input',
      }}
    />
  ))
