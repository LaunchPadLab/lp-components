import React from 'react'
import { shallow } from 'enzyme'
import { InputError } from '../../../src/'

test('only renders when input is touched and invalid', () => {
  // Does not render
  const wrapper = shallow(<InputError invalid={false} touched={true}/>)
  expect(wrapper.find('span').exists()).toEqual(false)
  wrapper.setProps({ invalid: true, touched: false })
  expect(wrapper.find('span').exists()).toEqual(false)
  // Does render
  wrapper.setProps({ invalid: true, touched: true })
  expect(wrapper.find('span').exists()).toEqual(true)
  expect(wrapper.find('span').hasClass('error-message')).toEqual(true)
})

test('formats error messages correctly', () => {
  // Single error
  const wrapper = shallow(<InputError error="Foo" invalid={true} touched={true}/>)
  expect(wrapper.find('span').text()).toEqual('Foo')
  // Multiple errors
  wrapper.setProps({ error: ['Foo', 'Bar'] })
  expect(wrapper.find('span').text()).toEqual('Foo, Bar')
})

test('passes class to span element correctly', () => {
  const wrapper = shallow(<InputError className="small" error="Foo" touched invalid />)
  expect(wrapper.hasClass('error-message')).toBe(true)
  expect(wrapper.hasClass('small')).toBe(true)
})

test('passes extra props to span element', () => {
  const onClick = () => 'More info'
  const wrapper = shallow(<InputError onClick={ onClick } error="Foo" touched invalid />)
  expect(wrapper.props().onClick).toBe(onClick)
})
