import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { SubmitButton, Submit } from '../src'

function submit (e) {
  e.preventDefault()
  action('submit')(e)
}

storiesOf('SubmitButton', module)
  .add('inside form', () => (
    <form onSubmit={submit}>
      <label> Clicking this button will submit the form. </label>
      <SubmitButton> Submit </SubmitButton>
    </form>
  ))
  .add('inside form with Submit (deprecated)', () => (
    <form onSubmit={submit}>
      <label>Check out the console to see a deprecation warning.</label> 
      <Submit> Submit </Submit>
    </form>
  ))