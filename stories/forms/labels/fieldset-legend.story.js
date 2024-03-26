import React from 'react'
import { storiesOf } from '@storybook/react'
import { FieldSetLegend } from 'src'

storiesOf('FieldSetLegend', module)
  .add('with default label', () => <FieldSetLegend name="nameOfInput" />)
  .add('with custom label', () => (
    <FieldSetLegend name="nameOfInput" label="Custom Label" />
  ))
  .add('with no label', () => (
    <FieldSetLegend name="nameOfInput" label={false} />
  ))
  .add('with required true default indicator', () => (
    <FieldSetLegend name="nameOfInput" label="Custom Label" required />
  ))
  .add('with required true custom indicator', () => (
    <FieldSetLegend
      name="nameOfInput"
      label="Custom Label"
      required
      requiredIndicator={'*'}
    />
  ))
  .add('with hint', () => <FieldSetLegend name="nameOfInput" hint="hint" />)
