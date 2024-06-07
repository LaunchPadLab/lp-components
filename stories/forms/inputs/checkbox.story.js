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

export const WithDefaultLabel = () => <Checkbox input={inputProps} meta={{}} />

WithDefaultLabel.story = {
  name: 'with default label',
}

export const WithCustomLabel = () => (
  <Checkbox input={inputProps} meta={{}} label="Custom Label" />
)

WithCustomLabel.story = {
  name: 'with custom label',
}

export const WithNoLabel = () => (
  <Checkbox input={inputProps} meta={{}} label={false} />
)

WithNoLabel.story = {
  name: 'with no label',
}

export const WithError = () => (
  <Checkbox
    input={inputProps}
    meta={{
      invalid: true,
      touched: true,
      error: 'Invalid input',
    }}
    value="0000"
  />
)

WithError.story = {
  name: 'with error',
}

export const WithATooltip = () => (
  <Checkbox input={inputProps} meta={{}} tooltip="I am a tooltip" />
)

WithATooltip.story = {
  name: 'with a tooltip',
}
