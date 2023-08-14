import React, { createRef } from 'react'
import { Button } from '../../../src/'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('Button is aria-disabled when form is invalid', () => {
  render(<Button invalid={true}>Hi</Button>)
  const button = screen.getByRole('button')

  expect(button).toHaveAttribute('aria-disabled')
})

test('Button is aria-disabled when form is pristine', () => {
  render(<Button pristine={true}>Hi</Button>)
  const button = screen.getByRole('button')

  expect(button).toHaveAttribute('aria-disabled')
})

test('Button onClick is run when the form is not submitting, pristine, or invalid', async () => {
  const onClick = jest.fn()

  const formProps = {
    invalid: false,
    pristine: false,
    submitting: false,
  }
  render(
    <Button onClick={onClick} {...formProps}>
      Hi
    </Button>
  )

  const user = userEvent.setup()
  const button = screen.getByRole('button')
  await user.click(button)

  expect(onClick).toHaveBeenCalled()
})

test('Button onClick is not run when form is invalid', async () => {
  const onClick = jest.fn()
  render(
    <Button onClick={onClick} invalid={true}>
      Hi
    </Button>
  )

  const user = userEvent.setup()
  const button = screen.getByRole('button')
  await user.click(button)

  expect(onClick).not.toHaveBeenCalled()
})

test('Button onClick is not run when form is pristine', async () => {
  const onClick = jest.fn()
  render(
    <Button onClick={onClick} pristine={true}>
      Hi
    </Button>
  )

  const user = userEvent.setup()
  const button = screen.getByRole('button')
  await user.click(button)

  expect(onClick).not.toHaveBeenCalled()
})

test('Button onClick is not run when form is submitting', async () => {
  const onClick = jest.fn()
  render(
    <Button onClick={onClick} submitting={true}>
      Hi
    </Button>
  )

  const user = userEvent.setup()
  const button = screen.getByRole('button')
  await user.click(button)

  expect(onClick).not.toHaveBeenCalled()
})

test('Button adds variant string to class', () => {
  render(<Button variant="custom">Hi</Button>)
  const button = screen.getByRole('button')

  expect(button).toHaveClass('button-custom')
})

test('Button adds type to button', () => {
  render(<Button type="reset">Hi</Button>)
  const button = screen.getByRole('button')

  expect(button).toHaveAttribute('type', 'reset')
})

test('Button has class "in-progress" when form is submitting', () => {
  render(<Button submitting={true}>Hi</Button>)
  const button = screen.getByRole('button')

  expect(button).toHaveClass('in-progress')
})

test('Button passes extra props to button element', () => {
  render(<Button test="test">Hi</Button>)
  const button = screen.getByRole('button')

  expect(button).toHaveAttribute('test')
})

test('Specifying a class name prop does not override variant class', () => {
  render(
    <Button variant="primary" className="button-large">
      Click Me
    </Button>
  )
  const button = screen.getByRole('button')

  expect(button).toHaveClass('button-primary')
  expect(button).toHaveClass('button-large')
})

test('Specifying a class name prop does not override is-disabled class', () => {
  render(
    <Button className="button-large" invalid>
      Click Me
    </Button>
  )
  const button = screen.getByRole('button')

  expect(button).toHaveClass('is-disabled')
  expect(button).toHaveClass('button-large')
})

test('Specifying a class name prop does not override in-progress class', () => {
  render(
    <Button className="button-large" submitting>
      Submit
    </Button>
  )
  const button = screen.getByRole('button')

  expect(button).toHaveClass('in-progress')
  expect(button).toHaveClass('button-large')
})

test('Button passes down forwardedRef to button', () => {
  const ref = createRef()
  render(
    <Button id="my-button" ref={ref}>
      Click Me
    </Button>
  )
  const button = screen.getByRole('button')

  expect(button).toHaveProperty('id', ref.current.id)
})

test('Button can receive object style prop', () => {
  render(<Button style={{ display: 'none' }}>Submit</Button>)
  const button = screen.getByRole('button', { hidden: true })

  expect(button).toHaveStyle('display: none;')
})
