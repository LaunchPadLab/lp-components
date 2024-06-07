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

export const WithDefaultLabel = {
  render: () => <Switch input={inputProps} meta={{}} />,
  name: 'with default label',
}

export const WithCustomLabel = {
  render: () => <Switch input={inputProps} meta={{}} label="Custom Label" />,

  name: 'with custom label',
}

export const WithNoLabel = {
  render: () => <Switch input={inputProps} meta={{}} label={false} />,

  name: 'with no label',
}

export const WithNoIcons = {
  render: () => (
    <Switch
      input={inputProps}
      meta={{}}
      checkedIcon={false}
      uncheckedIcon={false}
    />
  ),

  name: 'with no icons',
}

export const WithError = {
  render: () => (
    <Switch
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
    <Switch input={inputProps} meta={{}} tooltip="I am a tooltip" />
  ),

  name: 'with a tooltip',
}
