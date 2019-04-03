import React from 'react'
import { storiesOf } from '@storybook/react'
import { LabeledField } from 'src'
import dynamicInput from '../../dynamic-input'

const StaticInput = (props) => <input { ...props } />
const Input = dynamicInput()(StaticInput)

storiesOf('LabeledField', module)
  .add('default', () => (
    <LabeledField {...{
      input: {
        name: 'input name'
      },
      meta: {},
    }}>
      <Input />
    </LabeledField>
  ))
  .add('with error', () => (
    <LabeledField {...{
      input: {
        name: 'input name'
      },
      meta: {
        touched: true,
        invalid: true,
        error: 'Error message',
      },
    }}>
      <Input />
    </LabeledField>
  ))
  .add('hide error', () => (
    <LabeledField {...{
      input: {
        name: 'input name'
      },
      meta: {
        touched: true,
        invalid: true,
        error: 'Error message',
      },
      hideErrorLabel: true,
    }}>
      <Input />
    </LabeledField>
  ))
  .add('with custom label', () => {
    const CustomLabel = () => <label htmlFor="inputName">This is a <b>custom</b> label</label>
    return (
      <LabeledField {...{
        input: {
          name: 'inputName',
        },
        meta: {},
        labelComponent: CustomLabel
      }}>
        <Input id="inputName" />
      </LabeledField>
    )
  })
  .add('with custom error', () => {
    // eslint-disable-next-line
    const CustomError = (props) => <span id="inputError">This is a <b>custom</b> error message: {props.error}</span>
    return (
      <LabeledField {...{
        input: {
          name: 'inputName',
        },
        meta: {
          touched: true,
          invalid: true,
          error: 'Cannot be blank',
        },
        errorComponent: CustomError
      }}>
        <Input id="inputName" aria-describedby="inputError" />
      </LabeledField>
    )
  })

