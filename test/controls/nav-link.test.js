import React from 'react'
import { mount } from 'enzyme'
import { NavLink } from '../../src/'

test('NavLink renders a link tag with props', () => {
  const wrapper = mount(<NavLink to="/">Home</NavLink>)
  expect(wrapper.find('a').exists()).toBe(true)
  expect(wrapper.props().to).toEqual('/')
})
