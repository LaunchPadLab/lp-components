import React from 'react'
import { storiesOf, action } from '@storybook/react'
import { ColorPicker as StaticColorPicker } from 'src'
import dynamicInput from '../dynamic-input'

const ColorPicker = dynamicInput()(StaticColorPicker)

storiesOf('ColorPicker', module)
  .add('default', () => (
    <ColorPicker 
      onChange={ action('selected color') }
    />
  ))
