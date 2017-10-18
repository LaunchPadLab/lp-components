import React from 'react'
import { shallow } from 'enzyme'
import { Textarea } from '../../../src/'

test('Textarea passes down max length correctly', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
    maxLength: 5,
  }
  const wrapper = shallow(<Textarea { ...props }/>)
  expect(wrapper.dive().find('textarea').prop('maxLength')).toEqual(5)
})

test('Textarea hides character count correctly', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
    showCharacterCount: false,
  }
  const wrapper = shallow(<Textarea { ...props }/>)
  expect(wrapper.dive().find('.character-count').exists()).toEqual(false)
})

test('Textarea passes down max length and hides character count correctly', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
    maxLength: false,
  }
  const wrapper = shallow(<Textarea { ...props }/>)
  expect(wrapper.dive().find('textarea').prop('maxLength')).toEqual(false)
  expect(wrapper.dive().find('.character-count').exists()).toEqual(false)
})

