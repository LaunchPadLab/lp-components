import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button, ButtonArea } from 'src'

export default {
  title: 'ButtonArea',
}

export const WithButtons = () => (
  <ButtonArea>
    <Button onClick={action('clicked button one')}> Button One </Button>
    <Button onClick={action('clicked button two ')}> Button Two </Button>
  </ButtonArea>
)

WithButtons.story = {
  name: 'with buttons',
}

export const WithoutButtonsEmpty = () => <ButtonArea />

WithoutButtonsEmpty.story = {
  name: 'without buttons (empty)',
}
