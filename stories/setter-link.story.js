import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { SetterLink } from '../src'

const inputProps = {
  onChange: action('field changed')
}

storiesOf('SetterLink', module)
  .add('set value to true (default)', () => (
    <SetterLink label="Activate" input={ inputProps } />
  ))
  .add('set value to false', () => (
    <SetterLink label="Deactivate" input={ inputProps } valueToSet={ false } />
  ))
  .add('set value to a string', () => (
    <SetterLink label="Set String" input={ inputProps } valueToSet='Something super random!' />
  ))