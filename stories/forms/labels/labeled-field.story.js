import React from 'react'
import { LabeledField } from 'src'
import dynamicInput from '../../dynamic-input'
import { action } from '@storybook/addon-actions'

const StaticInput = (props) => <input {...props} />
const Input = dynamicInput()(StaticInput)
const inputName = 'inputName'

export default {
  title: 'LabeledField',
}

export const Default = () => (
  <LabeledField
    {...{
      input: {
        name: inputName,
      },
      meta: {},
    }}
  >
    <Input id={inputName} />
  </LabeledField>
)

Default.story = {
  name: 'default',
}

export const WithError = () => (
  <LabeledField
    {...{
      input: {
        name: inputName,
      },
      meta: {
        touched: true,
        invalid: true,
        error: 'Error message',
      },
    }}
  >
    <Input id={inputName} />
  </LabeledField>
)

WithError.story = {
  name: 'with error',
}

export const HideError = () => (
  <LabeledField
    {...{
      input: {
        name: inputName,
      },
      meta: {
        touched: true,
        invalid: true,
        error: 'Error message',
      },
      hideErrorLabel: true,
    }}
  >
    <Input id={inputName} />
  </LabeledField>
)

HideError.story = {
  name: 'hide error',
}

export const WithCustomLabel = () => {
  // eslint-disable-next-line
  const CustomLabel = ({ onClickLabel }) => (
    <label onClick={onClickLabel} htmlFor={inputName}>
      This is a <b>custom</b> label
    </label>
  )
  return (
    <LabeledField
      {...{
        input: {
          name: inputName,
        },
        meta: {},
        labelComponent: CustomLabel,
        onClickLabel: action('Custom Label Clicked'),
      }}
    >
      <Input id={inputName} />
    </LabeledField>
  )
}

WithCustomLabel.story = {
  name: 'with custom label',
}

export const WithCustomError = () => {
  // eslint-disable-next-line
  const CustomError = (props) => (
    <span id="inputError">
      This is a <b>custom</b> error message: {props.error}
    </span>
  )
  return (
    <LabeledField
      {...{
        input: {
          name: inputName,
        },
        meta: {
          touched: true,
          invalid: true,
          error: 'Cannot be blank',
        },
        errorComponent: CustomError,
      }}
    >
      <Input id={inputName} aria-describedby="inputError" />
    </LabeledField>
  )
}

WithCustomError.story = {
  name: 'with custom error',
}
