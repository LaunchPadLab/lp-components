import React from 'react'
import { Button } from '../../../src/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// test('Button is aria-disabled when form is invalid', () => {
//   const wrapper = shallow(<Button invalid={true}> Hi</Button>)
//   expect(wrapper.props()['aria-disabled']).toBe(true)
// })

test('Button is aria-disabled when form is invalid', () => {
  render(<Button invalid={true}>Hi</Button>)
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button')).toHaveAttribute('aria-disabled')
})

test('Button is aria-disabled when form is pristine', () => {
  render(<Button pristine={true}> Hi</Button>)

  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button')).toHaveAttribute('aria-disabled')
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
      {' '}
      Hi
    </Button>
  )
  const button = screen.getByRole('button')

  const user = userEvent.setup()

  await user.click(button);

  expect(onClick).toHaveBeenCalled()
})

test('Button onClick is not run when form is invalid', async () => {
  const onClick = jest.fn()
  render(
    <Button onClick={onClick} invalid={true}>
      {' '}
      Hi
    </Button>
  )
  const button = screen.getByRole('button')

  const user = userEvent.setup()

  await user.click(button);

  expect(onClick).not.toHaveBeenCalled()
})

test('Button onClick is not run when form is pristine', async () => {
  const onClick = jest.fn()
  render(
    <Button onClick={onClick} pristine={true}>
      {' '}
      Hi
    </Button>
  )

  const button = screen.getByRole('button')

  const user = userEvent.setup()

  await user.click(button);

  expect(onClick).not.toHaveBeenCalled()
})

test('Button onClick is not run when form is submitting', async () => {
  const onClick = jest.fn()
  render(
    <Button onClick={onClick} submitting={true}>
      {' '}
      Hi
    </Button>
  )

  const button = screen.getByRole('button')

  const user = userEvent.setup()

  await user.click(button);

  expect(onClick).not.toHaveBeenCalled()
})

test('Button adds variant string to class', () => {
  render(<Button variant="custom"> Hi</Button>)
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button').getAttribute("class")).toContain("custom")
})

test('Button adds type to button', () => {
  render(<Button type="reset"> Hi</Button>)
  expect(screen.getByRole('button').getAttribute("type")).toContain("reset")
})

test('Button has class "in-progress" when form is submitting', () => {
  render(<Button submitting={true}> Hi</Button>)
  expect(screen.getByRole('button').getAttribute("class")).toContain("in-progress")
})

test('Button passes extra props to button element', () => {
  render(<Button test="test"> Hi</Button>)
  expect(screen.getByRole('button')).toHaveAttribute('test')
})

test('Specifying a class name prop does not override variant class', () => {
  render(
    <Button variant="primary" className="button-large">
      Click Me
    </Button>
  )
  expect(screen.getByRole('button').getAttribute("class")).toContain("button-primary")
  expect(screen.getByRole('button').getAttribute("class")).toContain("button-large")
})

test('Specifying a class name prop does not override is-disabled class', () => {
  render(
    <Button className="button-large" invalid>
      Click Me
    </Button>
  )
  expect(screen.getByRole('button').getAttribute("class")).toContain("is-disabled")
  expect(screen.getByRole('button').getAttribute("class")).toContain("button-large")
})

test('Specifying a class name prop does not override in-progress class', () => {
  render(
    <Button className="button-large" submitting>
      Submit
    </Button>
  )
  expect(screen.getByRole('button').getAttribute("class")).toContain("in-progress")
  expect(screen.getByRole('button').getAttribute("class")).toContain("button-large")
})

test('Button can receive object style prop', () => {
  render(<Button style={{ display: 'none', backgroundColor: 'blue' }}>Submit</Button>)
  expect(screen.getByRole('button', { hidden: true })).toHaveStyle('background-color: blue; display: none;')
})