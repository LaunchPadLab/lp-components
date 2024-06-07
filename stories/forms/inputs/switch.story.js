import React from 'react'
import { action } from '@storybook/addon-actions'
import { Switch as StaticSwitch } from 'src'
import dynamicInput from '../../dynamic-input'

const Switch = dynamicInput({
  initialValue: false,
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticSwitch)

const inputProps = {
  name: 'person.selected',
  onChange: action('switch clicked'),
}

export default {
  title: 'Switch',
}

export const WithDefaultLabel = () => <Switch input={inputProps} meta={{}} />

WithDefaultLabel.story = {
  name: 'with default label',
}

export const WithCustomLabel = () => (
  <Switch input={inputProps} meta={{}} label="Custom Label" />
)

WithCustomLabel.story = {
  name: 'with custom label',
}

export const WithNoLabel = () => (
  <Switch input={inputProps} meta={{}} label={false} />
)

WithNoLabel.story = {
  name: 'with no label',
}

export const WithNoIcons = () => (
  <Switch
    input={inputProps}
    meta={{}}
    checkedIcon={false}
    uncheckedIcon={false}
  />
)

WithNoIcons.story = {
  name: 'with no icons',
}

export const WithError = () => (
  <Switch
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
  <Switch input={inputProps} meta={{}} tooltip="I am a tooltip" />
)

WithATooltip.story = {
  name: 'with a tooltip',
}
