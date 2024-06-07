import React, { useState } from 'react'
import { Modal } from 'src'

export default {
  title: 'Modal',
}

export const Default = {
  render: () => {
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
  },

  name: 'default',
}

export const WithClosePrevented = {
  render: () => {
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
  },

  name: 'with close prevented',
}

export const WithCustomClassNameConfiguration = {
  render: () => {
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
  },

  name: 'with custom class name configuration',
}
