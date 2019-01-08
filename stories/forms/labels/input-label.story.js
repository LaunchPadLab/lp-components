import React from 'react'
import { storiesOf } from '@storybook/react'
import { InputLabel } from 'src'

storiesOf('InputLabel', module)
  .add('with default label', () => (
    <InputLabel
      name="nameOfInput"
    />
  ))
  .add('with custom label', () => (
    <InputLabel
      name="nameOfInput"
      label="Custom Label"
    />
  ))
  .add('with no label', () => (
    <InputLabel
      name="nameOfInput"
      label={false}
    />
  ))
  .add('with required true default indicator', () => (
    <InputLabel
      name="nameOfInput"
      label="Custom Label"
      required
    />
  ))
  .add('with required true custom indicator', () => (
    <InputLabel
      name="nameOfInput"
      label="Custom Label"
      required
      requiredIndicator={ '@@@' }
    />
  ))
  .add('with required true no indicator', () => (
    <InputLabel
      name="nameOfInput"
      label="Custom Label"
      required
      requiredIndicator={ false }
    />
  ))
  .add('with hint', () => (
    <InputLabel
      name="nameOfInput"
      hint="hint"
    />
  ))
  .add('with tooltip', () => (
    <InputLabel
      name="nameOfInput"
      tooltip="tooltip"
    />
  ))
