import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Switch as StaticSwitch } from 'src'
import dynamicInput from '../../dynamic-input'

const Switch = dynamicInput({
  initialValue: false,
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticSwitch)

const inputProps = {
  name: 'person.selected',
  onChange: action('switch clicked')
}

storiesOf('Switch', module)
  .add('with default label', () => (
    <Switch
      input={ inputProps }
      meta={{}}
    />
  ))
  .add('with custom label', () => (
    <Switch
      input={ inputProps }
      meta={{}}
      label="Custom Label"
    />
  ))
  .add('with no label', () => (
    <Switch
      input={ inputProps }
      meta={{}}
      label={false}
    />
  ))
  .add('with no icons', () => (
    <Switch
      input={ inputProps }
      meta={{}}
      checkedIcon={false}
      uncheckedIcon={false}
    />
  ))
  .add('with error', () => (
    <Switch
      input={ inputProps }
      meta={{
        invalid: true,
        touched: true,
        error: 'Invalid input'
      }}
      value="0000"
    />
  ))
  .add('with a tooltip', () => (
    <Switch
      input={ inputProps }
      meta={{}}
      tooltip="I am a tooltip"
    />
  ))
