import React, { useState } from 'react'
import { Modal } from 'src'

export default {
  title: 'Modal',
}

export const Default = () => {
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
}

Default.story = {
  name: 'default',
}

export const WithClosePrevented = () => {
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
}

WithClosePrevented.story = {
  name: 'with close prevented',
}

export const WithCustomClassNameConfiguration = () => {
  const [modalShown, setModalShown] = useState(true)
  return (
    <div>
      {modalShown && (
        <Modal
          onClose={() => setModalShown(false)}
          className={{
            base: 'custom',
            afterOpen: 'custom--after-open',
            beforeClose: '',
          }}
        >
          This is the modal content!
        </Modal>
      )}
      <button onClick={() => setModalShown(true)}>Show modal</button>
    </div>
  )
}

WithCustomClassNameConfiguration.story = {
  name: 'with custom class name configuration',
}
