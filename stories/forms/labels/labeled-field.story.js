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

