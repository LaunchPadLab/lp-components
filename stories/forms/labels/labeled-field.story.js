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

export const Default = {
  render: () => (
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
  ),

  name: 'default',
}

export const WithError = {
  render: () => (
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
  ),

  name: 'with error',
}

export const HideError = {
  render: () => (
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
  ),

  name: 'hide error',
}

export const WithCustomLabel = {
  render: () => {
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
  },

  name: 'with custom label',
}

export const WithCustomError = {
  render: () => {
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
  },

  name: 'with custom error',
}
