import React from 'react'
import { render, screen } from '@testing-library/react'
import { Spinner } from '../../src/'

test('Spinner has a defined role', () => {
  render(<Spinner />)
  expect(screen.getByRole('progressbar')).toBeInTheDocument()
})

test('Spinner has class "spinner"', () => {
  render(<Spinner />)
  const spinner = screen.getByRole('progressbar')

  expect(spinner).toHaveClass('spinner')
})

test('Spinner can have a custom className', () => {
  render(<Spinner className="custom" />)
  const spinner = screen.getByRole('progressbar')

  expect(spinner).toHaveClass('spinner', 'custom')
})

test('Spinner passes props', () => {
  render(<Spinner name="Bob" />)
  const spinner = screen.getByRole('progressbar')

  expect(spinner).toHaveAttribute('name', 'Bob')
})

test('Spinner filters invalid props', () => {
  render(<Spinner name="Bob" someInvalidProp="I am not a valid DOM prop" />)
  const spinner = screen.getByRole('progressbar')

  expect(spinner).not.toHaveAttribute('someInvalidProp')
})
