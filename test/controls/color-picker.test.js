import React from 'react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ColorPicker } from '../../src/'

test('ColorPicker toggles expanded when swatch is clicked', async () => {
  const user = userEvent.setup()
  render(<ColorPicker />)
  const swatchControl = screen.getByRole('button')

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  await user.click(swatchControl)
  expect(screen.queryByRole('dialog')).toBeInTheDocument()
  await user.click(swatchControl)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('ColorPicker can be externally controlled', () => {
  const { rerender } = render(<ColorPicker active={true} />)

  expect(screen.queryByRole('dialog')).toBeInTheDocument()
  rerender(<ColorPicker active={false} />)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('ColorPicker closes when a click is registered outside', async () => {
  const user = userEvent.setup()
  const { container } = render(<ColorPicker />)
  const swatchControl = screen.getByRole('button')

  await user.click(swatchControl)
  expect(screen.queryByRole('dialog')).toBeInTheDocument()

  user.click(container)
  await waitForElementToBeRemoved(screen.queryByRole('dialog'))
})

test('ColorPicker calls on change with a hex value', async () => {
  const user = userEvent.setup()
  const mock = jest.fn()
  render(<ColorPicker onChange={mock} />)
  const swatchControl = screen.getByRole('button')

  await user.click(swatchControl)
  const input = screen.getByRole('textbox')
  await user.clear(input)
  await user.type(input, '639')

  expect(mock).toHaveBeenCalledWith('#663399')
})