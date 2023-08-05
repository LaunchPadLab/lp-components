import React, { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { Textarea } from '../../../src/'

const onChange = () => {}

test('Textarea passes down defaults and does not show character count', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    meta: {},
  }
  render(<Textarea {...props} />)
  const textarea = screen.getByLabelText('Test')
  expect(textarea).not.toHaveAttribute('maxLength')
  expect(textarea.previousSibling).not.toHaveClass('character-count')
})

test('Textarea passes down max length and shows character count correctly', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    meta: {},
    maxLength: 5,
  }
  render(<Textarea {...props} />)
  expect(screen.getByLabelText('Test')).toHaveAttribute('maxLength', '5')
  expect(screen.getByText('0/5 characters'))
})

test('Textarea hides character count correctly', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    meta: {},
    maxLength: 5,
    hideCharacterCount: true,
  }
  render(<Textarea {...props} />)
  expect(screen.getByLabelText('Test')).toHaveAttribute('maxLength', '5')
  expect(screen.queryByText('0/5 characters')).not.toBeInTheDocument()
})

test('Textarea is given an aria-describedby attribute when there is an input error', () => {
  const name = 'test'
  const props = {
    input: {
      name,
      value: '',
      onChange,
    },
    meta: {
      touched: true,
      invalid: true,
    },
    maxLength: 5,
    hideCharacterCount: true,
  }
  render(<Textarea {...props} />)
  expect(screen.getByLabelText('Test').getAttribute('aria-describedby')).toContain(name)
})

test('Textarea does not receive invalid dom attributes', () => {
  const name = 'test'
  const props = {
    input: {
      name,
      value: '',
      onChange,
    },
    meta: {},
    maxLength: 5,
    hideCharacterCount: true,
    onClickLabel: () => 'foo',
  }

  render(<Textarea {...props} />)
  expect(screen.getByLabelText('Test')).not.toHaveAttribute('onClickLabel')
})

test('Textarea passes down forwardedRef to input correctly', () => {
  const inputRef = createRef()
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    meta: {},
    forwardedRef: inputRef,
  }

  render(<Textarea {...props} />)
  expect(screen.getByLabelText('Test').id).toEqual(inputRef.current.id)
})
