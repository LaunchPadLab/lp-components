import React from 'react'
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

export default {
  title: 'Checkbox',
}

export const WithDefaultLabel = {
  render: () => <Checkbox input={inputProps} meta={{}} />,
  name: 'with default label',
}

export const WithCustomLabel = {
  render: () => <Checkbox input={inputProps} meta={{}} label="Custom Label" />,

  name: 'with custom label',
}

export const WithNoLabel = {
  render: () => <Checkbox input={inputProps} meta={{}} label={false} />,

  name: 'with no label',
}

export const WithError = {
  render: () => (
    <Checkbox
      input={inputProps}
      meta={{
        invalid: true,
        touched: true,
        error: 'Invalid input',
      }}
      value="0000"
    />
  ),

  name: 'with error',
}

export const WithATooltip = {
  render: () => (
    <Checkbox input={inputProps} meta={{}} tooltip="I am a tooltip" />
  ),

  name: 'with a tooltip',
}
