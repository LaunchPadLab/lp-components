import React from 'react'
import { FieldsetLegend } from 'src'

export default {
  title: 'FieldsetLegend',
}

export const WithDefaultLabel = {
  render: () => <FieldsetLegend name="nameOfInput" />,
  name: 'with default label',
}

export const WithCustomLabel = {
  render: () => <FieldsetLegend name="nameOfInput" label="Custom Label" />,

  name: 'with custom label',
}

export const WithNoLabel = {
  render: () => <FieldsetLegend name="nameOfInput" label={false} />,

  name: 'with no label',
}

export const WithRequiredTrueCustomIndicator = {
  render: () => (
    <FieldsetLegend
      name="nameOfInput"
      label="Custom Label"
      required={true}
      requiredIndicator={'*'}
    />
  ),

  name: 'with required true custom indicator',
}

export const WithHint = {
  render: () => <FieldsetLegend name="nameOfInput" hint="hint" />,
  name: 'with hint',
}
