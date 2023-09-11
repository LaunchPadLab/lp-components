import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Paginator } from '../../../src/'

describe('Paginator', () => {
  test('Previous control renders unless value is min', () => {
    const { rerender } = render(<Paginator value={5} min={1} max={10} />)
    expect(screen.getByRole('link', { name: /previous page/i })).toBeInTheDocument()
    rerender(<Paginator value={1} min={1} max={10} />)
    expect(screen.queryByRole('link', { name: /previous page/i })).not.toBeInTheDocument()
  })

  test('Next control renders unless value is max', () => {
    const { rerender } = render(<Paginator value={5} min={1} max={10} />)
    expect(screen.getByRole('link', { name: /next page/i })).toBeInTheDocument()
    rerender(<Paginator value={10} min={1} max={10} />)
    expect(screen.queryByRole('link', { name: /next page/i })).not.toBeInTheDocument()
  })

  test('Control with current value is marked as active', () => {
    render(<Paginator value={5} min={1} max={10} />)
    expect(screen.getByText(5).parentElement).toHaveClass('active')
  })

  test('Control click sets value', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()

    render(
      <Paginator value={5} min={1} max={10} onChange={onChange} />
    )
    await user.click(screen.getAllByRole('link').at(2))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  test('Previous control decrements value', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    const currentValue = 5
    render(
      <Paginator value={currentValue} min={1} max={10} onChange={onChange} />
    )
    await user.click(screen.getByRole('link', { name: /previous page/i }))
    expect(onChange).toHaveBeenCalledWith(currentValue - 1)
  })

  test('Next control increments value', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    const currentValue = 5
    render(
      <Paginator value={currentValue} min={1} max={10} onChange={onChange} />
    )
    await user.click(screen.getByRole('link', { name: /next page/i }))
    expect(onChange).toHaveBeenCalledWith(currentValue + 1)
  })

  test('Min control sets value to min', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    render(
      <Paginator value={5} min={1} max={10} onChange={onChange} />
    )
    await user.click(screen.getByRole('link', { name: /page 1$/ }))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  test('Max control sets value to max', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    render(
      <Paginator value={5} min={1} max={10} onChange={onChange} />
    )
    await user.click(screen.getByRole('link', { name: /page 10$/ }))
    expect(onChange).toHaveBeenCalledWith(10)
  })

  test('Current page is indicated via aria-current', () => {
    render(<Paginator value={5} min={1} max={10} />)
    expect(screen.getByText(5)).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText(1)).toHaveAttribute('aria-current', 'false')
  })

  test('Destination is indicated via aria-label', () => {
    render(<Paginator value={5} min={1} max={10} />)
    expect(screen.getByLabelText('Go to page 5')).toBeInTheDocument()
  })

  test('Page control is triggered via click or enter', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    render(
      <Paginator value={5} min={1} max={10} onChange={onChange} />
    )

    await user.click(screen.getByLabelText('Go to page 1'))
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenNthCalledWith(1, 1)
    expect(onChange).toHaveBeenNthCalledWith(2, 1)
  })

  test('Can accept custom delimiter', () => {
    render(
      <Paginator value={1} min={1} max={10} delimiter="foo" />
    )
    expect(screen.getByText('foo')).toBeInTheDocument()
  })

  test('Renders empty state by default when only 1 page exists', () => {
    render(
      <Paginator value={1} min={1} max={1} />
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /page 1$/ })).not.toBeInTheDocument()
  })
})
