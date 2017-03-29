import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Button } from '../src'

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with emoji', () => (
    <Button onClick={action('clicked')}>😎</Button>
  ))