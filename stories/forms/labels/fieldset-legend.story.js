import React from 'react'
import { storiesOf } from '@storybook/react'
import { FieldsetLegend } from 'src'

storiesOf('FieldsetLegend', module)
  .add('with default label', () => <FieldsetLegend name="nameOfInput" />)
  .add('with custom label', () => (
    <FieldsetLegend name="nameOfInput" label="Custom Label" />
  ))
  .add('with no label', () => (
    <FieldsetLegend name="nameOfInput" label={false} />
  ))
  .add('with required true custom indicator', () => (
    <FieldsetLegend
      name="nameOfInput"
      label="Custom Label"
      required={true}
      requiredIndicator={'*'}
    />
  ))
  .add('with hint', () => <FieldsetLegend name="nameOfInput" hint="hint" />)
