import React from 'react'
import { storiesOf } from '@storybook/react'
import { FieldsetLegend } from 'src'

storiesOf('FieldsetLegend', module)
  .add('with default label', () => <FieldsetLegend name="nameOfInputGroup" />)
  .add('with custom label', () => (
    <FieldsetLegend name="nameOfInputGroup" label="Custom Legend" />
  ))
  .add('with no label', () => (
    <FieldsetLegend name="nameOfInputGroup" label={false} />
  ))
  .add('with required true default indicator', () => (
    <FieldsetLegend name="nameOfInputGroup" label="Custom Legend" required />
  ))
  .add('with required true custom indicator', () => (
    <FieldsetLegend
      name="nameOfInputGroup"
      label="Custom Legend"
      required
      requiredIndicator={'*'}
    />
  ))
  .add('with hint', () => (
    <FieldsetLegend name="nameOfInputGroup" hint="hint" />
  ))
  .add('with tooltip', () => (
    <FieldsetLegend name="nameOfInputGroup" tooltip="tooltip" />
  ))
