import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SetterLink } from 'src'

const inputProps = {
  onChange: action('field changed'),
}

storiesOf('SetterLink', module)
  .add('with default `valueToSet`', () => (
    <SetterLink input={inputProps} label="Set True" />
  ))
  .add('with custom `valueToSet`', () => (
    <SetterLink label="Set String" input={inputProps} valueToSet="A string!" />
  ))
