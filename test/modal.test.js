import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../src/'
import { noop } from 'lodash'


describe('Modal', () => {
  beforeEach(() => {
    // requestAnimationFrame is async, so the callback fails to trigger
    // https://github.com/reactjs/react-modal/issues/903
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb())

    // Ignore warnings about the app element not being defined
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    window.requestAnimationFrame.mockRestore()
    // eslint-disable-next-line
    console.error.mockRestore()
  })

  test('is shown by default', () => {
    const content = Date.now()
    render(<Modal onClose={noop}><span>{content}</span></Modal>)
    expect(screen.getByText(content)).toBeInTheDocument()
  })

  test('can be hidden/animated by manually passing isOpen', () => {
    const content = Date.now()
    render(<Modal isOpen={false} onClose={noop}><span>{content}</span></Modal>)
    expect(screen.queryByText(content)).not.toBeInTheDocument()
  })

  test('calls close handler when close button is clicked', async () => {
    const onClose = jest.fn()
    const user = userEvent.setup()
    render(<Modal onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Close Modal' }))
    expect(onClose).toHaveBeenCalled()
  })

  test('adds additional class string to default class', () => {
    render(<Modal onClose={noop} className="custom" />)
    expect(screen.getByRole('dialog')).toHaveClass('modal-inner', 'custom')
  })

  test('adds additional overlay class string to default overlay class', () => {
    render(
      <Modal onClose={noop} overlayClassName="custom-overlay" />
    )

    const overlay = screen.getByRole('dialog').parentElement
    expect(overlay).toHaveClass('modal-fade-screen', 'custom-overlay')
  })

  test('adds additional class object to default class', () => {
    render(
      <Modal
        isOpen={true}
        onClose={noop}
        className={{
          base: 'custom',
          afterOpen: 'modal-is-open',
          beforeClose: 'modal-before-close',
        }}
      />
    )
    expect(screen.getByRole('dialog')).toHaveClass('modal-inner', 'custom', 'modal-is-open')
  })

  test('adds additional overlay class object to default overlay class', () => {
    render(
      <Modal
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
      render(<Modal preventClose={true} onClose={noop} />)
      expect(screen.queryByRole('button', { name: 'Close Modal' })).not.toBeInTheDocument()
    })

    test('does not close by escape key', async () => {
      const onClose = jest.fn()
      const user = userEvent.setup()
      render(<Modal preventClose={true} onClose={onClose} />)

      await user.keyboard('{Escape}')
      expect(onClose).not.toHaveBeenCalled()
    })

    test('does not close by overlay click', async () => {
      const onClose = jest.fn()
      const user = userEvent.setup()
      render(
        <Modal
          preventClose={true}
          onClose={onClose}
        />
      )
      const overlay = screen.getByRole('dialog').parentElement
      await user.click(overlay)
      expect(onClose).not.toHaveBeenCalled()
    })

    test('allows individual prop overrides', async () => {
      const onClose = jest.fn()
      const user = userEvent.setup()
      render(
        <Modal preventClose={true} onClose={onClose} shouldCloseOnEsc={true} />
      )
      await user.keyboard('{Escape}')
      expect(onClose).toHaveBeenCalled()
    })
  })
})
