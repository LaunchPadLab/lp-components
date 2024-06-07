import React from 'react'
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

export default {
  title: 'RangeInput',
}

export const WithDefaultStepMinAndMax = {
  render: () => <RangeInput input={rangeInputProps} meta={{}} />,

  name: 'with default `step`, `min`, and `max`',
}

export const WithCustomStepMinAndMax = {
  render: () => (
    <RangeInput input={rangeInputProps} meta={{}} min={20} max={80} step={5} />
  ),

  name: 'with custom `step`, `min`, and `max`',
}

export const WithTheValueLabelHidden = {
  render: () => <RangeInput input={rangeInputProps} meta={{}} hideRangeLabel />,

  name: 'with the value label hidden',
}

export const WithError = {
  render: () => (
    <RangeInput
      input={rangeInputProps}
      meta={{
        invalid: true,
        touched: true,
        error: 'Invalid input',
      }}
    />
  ),

  name: 'with error',
}
