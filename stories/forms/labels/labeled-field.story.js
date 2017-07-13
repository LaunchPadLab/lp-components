import React from 'react'
import { storiesOf } from '@kadira/storybook'
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

