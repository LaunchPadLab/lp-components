import React from 'react'
import { FieldsetLegend } from 'src'

export default {
  title: 'FieldsetLegend',
}

export const WithDefaultLabel = () => <FieldsetLegend name="nameOfInput" />

WithDefaultLabel.story = {
  name: 'with default label',
}

export const WithCustomLabel = () => (
  <FieldsetLegend name="nameOfInput" label="Custom Label" />
)

WithCustomLabel.story = {
  name: 'with custom label',
}

export const WithNoLabel = () => (
  <FieldsetLegend name="nameOfInput" label={false} />
)

WithNoLabel.story = {
  name: 'with no label',
}

export const WithRequiredTrueCustomIndicator = () => (
  <FieldsetLegend
    name="nameOfInput"
    label="Custom Label"
    required={true}
    requiredIndicator={'*'}
  />
)

WithRequiredTrueCustomIndicator.story = {
  name: 'with required true custom indicator',
}

export const WithHint = () => <FieldsetLegend name="nameOfInput" hint="hint" />

WithHint.story = {
  name: 'with hint',
}
