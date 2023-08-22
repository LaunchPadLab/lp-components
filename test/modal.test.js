import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../src/'
import { noop } from 'lodash'

// Wrap modal to avoid console bloat
function MyModal(props) {
  return <Modal {...props} ariaHideApp={false} />
}

describe('Modal', () => {
  beforeEach(() => {
    // requestAnimationFrame is async, so the callback fails to trigger
    // https://github.com/reactjs/react-modal/issues/903
    // eslint-disable-next-line
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb())
  })

  afterEach(() => {
    // eslint-disable-next-line
    window.requestAnimationFrame.mockRestore()
  })

  test('is shown by default', () => {
    const content = Date.now()
    render(
      <MyModal onClose={noop}>
        <span>{content}</span>
      </MyModal>
    )
    expect(screen.getByText(content)).toBeInTheDocument()
  })

  test('can be hidden/animated by manually passing isOpen', () => {
    const content = Date.now()
    render(
      <MyModal isOpen={false} onClose={noop}>
        <span>{content}</span>
      </MyModal>
    )
    expect(screen.queryByText(content)).not.toBeInTheDocument()
  })

  test('calls close handler when close button is clicked', async () => {
    const onClose = jest.fn()
    const user = userEvent.setup()
    render(<MyModal onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Close Modal' }))
    expect(onClose).toHaveBeenCalled()
  })

  test('calls close handler when escape key is pressed', async () => {
    const onClose = jest.fn()
    const user = userEvent.setup()
    render(<MyModal onClose={onClose} />)

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })

  test('calls close handler when overlay is clicked', async () => {
    const onClose = jest.fn()
    const user = userEvent.setup()
    render(<MyModal onClose={onClose} />)
    const overlay = screen.getByRole('dialog').parentElement
    await user.click(overlay)
    expect(onClose).toHaveBeenCalled()
  })

  test('adds additional class string to default class', () => {
    render(<MyModal onClose={noop} className="custom" />)
    expect(screen.getByRole('dialog')).toHaveClass('modal-inner', 'custom')
  })

  test('adds additional overlay class string to default overlay class', () => {
    render(<MyModal onClose={noop} overlayClassName="custom-overlay" />)

    const overlay = screen.getByRole('dialog').parentElement
    expect(overlay).toHaveClass('modal-fade-screen', 'custom-overlay')
  })

  test('adds additional class object to default class', () => {
    render(
      <MyModal
        isOpen={true}
        onClose={noop}
        className={{
          base: 'custom',
          afterOpen: 'modal-is-open',
          beforeClose: 'modal-before-close',
        }}
      />
    )
    expect(screen.getByRole('dialog')).toHaveClass(
      'modal-inner',
      'custom',
      'modal-is-open'
    )
  })

  test('adds additional overlay class object to default overlay class', () => {
    render(
      <MyModal
        isOpen={true}
        onClose={noop}
        overlayClassName={{
          base: 'custom',
          afterOpen: 'modal-is-open',
          beforeClose: 'modal-before-close',
        }}
      />
    )
    const overlay = screen.getByRole('dialog').parentElement
    expect(overlay).toHaveClass('modal-fade-screen', 'custom', 'modal-is-open')
  })

  describe('when preventClose=true', () => {
    test('hides close button', () => {
      render(<MyModal preventClose={true} onClose={noop} />)
      expect(
        screen.queryByRole('button', { name: 'Close Modal' })
      ).not.toBeInTheDocument()
    })

    test('does not close by escape key', async () => {
      const onClose = jest.fn()
      const user = userEvent.setup()
      render(<MyModal preventClose={true} onClose={onClose} />)

      await user.keyboard('{Escape}')
      expect(onClose).not.toHaveBeenCalled()
    })

    test('does not close by overlay click', async () => {
      const onClose = jest.fn()
      const user = userEvent.setup()
      render(<MyModal preventClose={true} onClose={onClose} />)
      const overlay = screen.getByRole('dialog').parentElement
      await user.click(overlay)
      expect(onClose).not.toHaveBeenCalled()
    })

    test('allows individual prop overrides', async () => {
      const onClose = jest.fn()
      const user = userEvent.setup()
      render(
        <MyModal
          preventClose={true}
          onClose={onClose}
          shouldCloseOnEsc={true}
        />
      )
      await user.keyboard('{Escape}')
      expect(onClose).toHaveBeenCalled()
    })
  })
})
