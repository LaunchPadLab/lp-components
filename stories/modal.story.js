import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Modal } from 'src'

storiesOf('Modal', module)
  .add('default', () => {
    const [modalShown, setModalShown] = useState(true)
    return (
      <div>
        {modalShown && (
          <Modal onClose={() => setModalShown(false)}>
            This is the modal content!
          </Modal>
        )}
        <button onClick={() => setModalShown(true)}>Show modal</button>
      </div>
    )
  })
  .add('with close prevented', () => {
    const [modalShown, setModalShown] = useState(true)
    return (
      <div>
        {modalShown && (
          <Modal onClose={() => setModalShown(false)} preventClose={true}>
            This is the modal content!
          </Modal>
        )}
        <button onClick={() => setModalShown(true)}>Show modal</button>
      </div>
    )
  })
