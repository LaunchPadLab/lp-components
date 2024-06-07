import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button, SubmitButton } from 'src'

function submit(e) {
  e.preventDefault()
  action('form submitted')(e)
}

export default {
  title: 'SubmitButton',
}

export const InsideForm = {
  render: () => (
    <form onSubmit={submit}>
      <label>
        {' '}
        Clicking this button will NOT submit the form (ordinary Button
        component).{' '}
      </label>
      <Button> Test </Button>
      <label> Clicking this button will submit the form. </label>
      <SubmitButton> Submit </SubmitButton>
    </form>
  ),

  name: 'inside form',
}
