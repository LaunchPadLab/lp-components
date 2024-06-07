import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button, ButtonArea } from 'src'

export default {
  title: 'ButtonArea',
}

export const WithButtons = {
  render: () => (
    <ButtonArea>
      <Button onClick={action('clicked button one')}> Button One </Button>
      <Button onClick={action('clicked button two ')}> Button Two </Button>
    </ButtonArea>
  ),

  name: 'with buttons',
}

export const WithoutButtonsEmpty = {
  render: () => <ButtonArea />,
  name: 'without buttons (empty)',
}
