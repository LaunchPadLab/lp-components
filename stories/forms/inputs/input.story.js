import React from 'react'
import { storiesOf, action } from '@storybook/react'
import { Input as StaticInput } from 'src'
import dynamicInput from '../../dynamic-input'

const Input = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticInput)

const inputProps = {
  name: 'person.firstName',
  onChange: action('field changed')
}

storiesOf('Input', module)
  .add('with default label', () => (
    <Input
      input={inputProps}
      meta={{}}
    />
  ))
  .add('with custom label', () => (
    <Input
      input={inputProps}
      meta={{}}
      label="Custom Label"
    />
  ))
  .add('with no label', () => (
    <Input
      input={inputProps}
      meta={{}}
      label={false}
    />
  ))
  .add('with required true default indicator', () => (
    <Input
      input={inputProps}
      meta={{}}
      label="Custom Label"
      required
    />
  ))
  .add('with required true custom indicator', () => (
    <Input
      input={inputProps}
      meta={{}}
      label="Custom Label"
      required
      requiredIndicator={ '@@@' }
    />
  ))
  .add('with required true no indicator', () => (
    <Input
      input={inputProps}
      meta={{}}
      label="Custom Label"
      required
      requiredIndicator={ false }
    />
  ))
  .add('with error', () => (
    <Input
      input={inputProps}
      meta={{
        invalid: true,
        touched: true,
        error: 'Invalid input'
      }}
      value="0000"
    />
  ))
