import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button, ButtonArea } from 'src'

storiesOf('ButtonArea', module)
  .add('with buttons', () => (
    <ButtonArea>
      <Button onClick={action('clicked button one')}> Button One </Button>
      <Button onClick={action('clicked button two ')}> Button Two </Button>
    </ButtonArea>
  ))
  .add('without buttons (empty)', () => <ButtonArea />)
