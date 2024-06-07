import React from 'react'
import { InputLabel } from 'src'

export default {
  title: 'InputLabel',
}

export const WithDefaultLabel = {
  render: () => <InputLabel name="nameOfInput" />,
  name: 'with default label',
}

export const WithCustomLabel = {
  render: () => <InputLabel name="nameOfInput" label="Custom Label" />,

  name: 'with custom label',
}

export const WithNoLabel = {
  render: () => <InputLabel name="nameOfInput" label={false} />,
  name: 'with no label',
}

export const WithRequiredTrueCustomIndicator = {
  render: () => (
    <InputLabel
      name="nameOfInput"
      label="Custom Label"
      required={true}
      requiredIndicator={'*'}
    />
  ),

  name: 'with required true custom indicator',
}

export const WithHint = {
  render: () => <InputLabel name="nameOfInput" hint="hint" />,
  name: 'with hint',
}

export const WithTooltip = {
  render: () => <InputLabel name="nameOfInput" tooltip="tooltip" />,

  name: 'with tooltip',
}
