import React from 'react'
import { storiesOf } from '@storybook/react'
import { Modal } from 'src'

storiesOf('Modal', module).add('default', () => (
  <Modal>There's stuff in this modal.</Modal>
))
