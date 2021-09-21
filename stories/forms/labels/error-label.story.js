import React from 'react'
import { storiesOf } from '@storybook/react'
import { ErrorLabel } from 'src'

storiesOf('ErrorLabel', module).add('with a single error', () => (
  <ErrorLabel>An error occurred</ErrorLabel>
))
