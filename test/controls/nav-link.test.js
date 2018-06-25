import React from 'react'
import { mount } from 'enzyme'
import { Link } from 'react-router'
import { NavLink } from '../../src/'

test('NavLink renders a link tag with props', () => {
  const wrapper = mount(<NavLink to="/">Home</NavLink>)
  expect(wrapper.find('a').exists()).toBe(true)
  expect(wrapper.find(Link).props().to).toEqual('/')
  expect(wrapper.find(Link).props().activeClassName).toEqual('is-active')
})
