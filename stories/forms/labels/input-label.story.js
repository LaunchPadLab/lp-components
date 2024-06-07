import React from 'react'
import { InputLabel } from 'src'

export default {
  title: 'InputLabel',
}

export const WithDefaultLabel = () => <InputLabel name="nameOfInput" />

WithDefaultLabel.story = {
  name: 'with default label',
}

export const WithCustomLabel = () => (
  <InputLabel name="nameOfInput" label="Custom Label" />
)

WithCustomLabel.story = {
  name: 'with custom label',
}

export const WithNoLabel = () => <InputLabel name="nameOfInput" label={false} />

WithNoLabel.story = {
  name: 'with no label',
}

export const WithRequiredTrueCustomIndicator = () => (
  <InputLabel
    name="nameOfInput"
    label="Custom Label"
    required={true}
    requiredIndicator={'*'}
  />
)

WithRequiredTrueCustomIndicator.story = {
  name: 'with required true custom indicator',
}

export const WithHint = () => <InputLabel name="nameOfInput" hint="hint" />

WithHint.story = {
  name: 'with hint',
}

export const WithTooltip = () => (
  <InputLabel name="nameOfInput" tooltip="tooltip" />
)

WithTooltip.story = {
  name: 'with tooltip',
}
