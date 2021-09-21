import React, { createRef } from 'react'
import { mount } from 'enzyme'
import { Textarea } from '../../../src/'

test('Textarea passes down defaults and does not show character count', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
  }
  const wrapper = mount(<Textarea {...props} />)
  expect(wrapper.find('textarea').prop('maxLength')).toEqual(null)
  expect(wrapper.find('.character-count').exists()).toEqual(false)
})

test('Textarea passes down max length and shows character count correctly', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
    maxLength: 5,
  }
  const wrapper = mount(<Textarea {...props} />)
  expect(wrapper.find('textarea').prop('maxLength')).toEqual(5)
  expect(wrapper.find('.character-count').exists()).toEqual(true)
})

test('Textarea hides character count correctly', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
    maxLength: 5,
    hideCharacterCount: true,
  }
  const wrapper = mount(<Textarea {...props} />)
  expect(wrapper.find('textarea').prop('maxLength')).toEqual(5)
  expect(wrapper.find('.character-count').exists()).toEqual(false)
})

test('Textarea is given an aria-describedby attribute when there is an input error', () => {
  const name = 'test'
  const props = {
    input: {
      name,
      value: '',
    },
    meta: {
      touched: true,
      invalid: true,
    },
    maxLength: 5,
    hideCharacterCount: true,
  }
  const wrapper = mount(<Textarea {...props} />)
  expect(wrapper.find('textarea').prop('aria-describedby')).toContain(name)
})

test('Textarea does not receive invalid dom attributes', () => {
  const name = 'test'
  const props = {
    input: {
      name,
      value: '',
    },
    meta: {},
    maxLength: 5,
    hideCharacterCount: true,
    onClickLabel: () => 'foo',
  }

  const wrapper = mount(<Textarea {...props} />)
  expect(wrapper.find('textarea').prop('onClickLabel')).toBe(undefined)
})

test('Textarea passes down forwardedRef to input correctly', () => {
  const inputRef = createRef()
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
    forwardedRef: inputRef,
  }

  const wrapper = mount(<Textarea {...props} />)
  expect(wrapper.find('textarea').prop('id')).toEqual(inputRef.current.id)
})
