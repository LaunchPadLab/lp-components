import React from 'react'
import { storiesOf } from '@storybook/react'
import { LabeledFieldset, Checkbox as StaticCheckbox } from 'src'
import dynamicInput from '../../dynamic-input'
import { action } from '@storybook/addon-actions'

const Checkbox = dynamicInput({
  initialValue: false,
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticCheckbox)

const inputProps = {
  name: 'person.option',
  onChange: action('checkbox clicked'),
}

storiesOf('LabeledFieldset', module)
  .add('default', () => (
    <LabeledFieldset
      {...{
        input: {
          name: 'inputName',
        },
        label: 'Select options',
        meta: {},
      }}
    >
      <Checkbox input={inputProps} meta={{}} />
    </LabeledFieldset>
  ))
  .add('with error', () => (
    <LabeledFieldset
      {...{
        input: {
          name: 'inputName',
        },
        label: 'Select options',
        meta: {
          touched: true,
          invalid: true,
          error: 'Error message',
        },
      }}
    >
      <Checkbox input={inputProps} meta={{}} />
    </LabeledFieldset>
  ))
  .add('hide error', () => (
    <LabeledFieldset
      {...{
        input: {
          name: 'inputName',
        },
        label: 'Select options',
        meta: {
          touched: true,
          invalid: true,
          error: 'Error message',
        },
        hideErrorLabel: true,
      }}
    >
      <Checkbox input={inputProps} meta={{}} />
    </LabeledFieldset>
  ))
  .add('with custom label', () => {
    // eslint-disable-next-line
    const CustomLabel = ({ onClickLabel }) => (
      <legend onClick={onClickLabel} htmlFor="inputName">
        This is a <strong>custom</strong> legend
      </legend>
    )
    return (
      <LabeledFieldset
        {...{
          input: {
            name: 'inputName',
          },
          meta: {},
          labelComponent: CustomLabel,
          onClickLabel: action('Custom Label Clicked'),
        }}
      >
        <Checkbox input={inputProps} meta={{}} />
      </LabeledFieldset>
    )
  })
  .add('with custom error', () => {
    const CustomError = (props) => (
      <span id="inputError">
        This is a <strong>custom</strong> error message: {props.error}
      </span>
    )
    return (
      <LabeledFieldset
        {...{
          input: {
            name: 'inputName',
          },
          label: 'Select options',
          meta: {
            touched: true,
            invalid: true,
            error: 'An option must be selected',
          },
          errorComponent: CustomError,
        }}
      >
        <Checkbox input={inputProps} meta={{}} />
      </LabeledFieldset>
    )
  })
