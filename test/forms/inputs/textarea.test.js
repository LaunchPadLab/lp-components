import React from 'react'
import { shallow } from 'enzyme'
import { Textarea } from '../../../src/'

test('Textarea passes down defaults and does not show character count', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
  }
  const wrapper = shallow(<Textarea { ...props }/>)
  expect(wrapper.dive().find('textarea').prop('maxLength')).toEqual(null)
  expect(wrapper.dive().find('.character-count').exists()).toEqual(false)
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
  const wrapper = shallow(<Textarea { ...props }/>)
  expect(wrapper.dive().find('textarea').prop('maxLength')).toEqual(5)
  expect(wrapper.dive().find('.character-count').exists()).toEqual(true)
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
  const wrapper = shallow(<Textarea { ...props }/>)
  expect(wrapper.dive().find('textarea').prop('maxLength')).toEqual(5)
  expect(wrapper.dive().find('.character-count').exists()).toEqual(false)
})


