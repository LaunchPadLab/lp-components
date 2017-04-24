import React from 'react'
import { storiesOf } from '@kadira/storybook'

storiesOf('RangeInput', module)
  .add('with default label', () => (
    <div>
      <input type="range" />
    </div>
  ))