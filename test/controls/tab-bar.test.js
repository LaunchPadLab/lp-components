import React from 'react'
import { mount } from 'enzyme'
import { TabBar } from '../../src/'

const defaultOptions = ['Home', 'Account']
const objectOptions = [{key: 'Home', value: 'home'}, {key: 'Account', value: 4}]

test('TabBar defaults to horizontal alignment', () => {
  const wrapper = mount(<TabBar options={defaultOptions} />)
  expect(wrapper.find('ul').hasClass('horizontal-tabs')).toEqual(true)
})

test('TabBar aligns vertically with vertical option', () => {
  const wrapper = mount(<TabBar options={defaultOptions} vertical={true} />)
  expect(wrapper.find('ul').hasClass('vertical-tabs')).toEqual(true)
})

test('TabBar renders defaultOptions', () => {
  const wrapper = mount(<TabBar options={defaultOptions} />)
  expect(wrapper.find('li').first().text()).toEqual('Home')
  expect(wrapper.find('li').last().text()).toEqual('Account')
})

test('TabBar renders objectOptions', () => {
  const wrapper = mount(<TabBar options={objectOptions} />)
  expect(wrapper.find('li').first().text()).toEqual('Home')
  expect(wrapper.find('li').last().text()).toEqual('Account')
})

test('TabBar adds Active class', () => {
  const wrapper = mount(<TabBar options={objectOptions} value='home' />)
  expect(wrapper.find('li').first().hasClass('active')).toEqual(true)
})

test('TabBar calls onChange', () => {
  const onChange = jest.fn()
  const wrapper = mount(<TabBar options={objectOptions} onChange={ onChange } />)
  wrapper.find('li').first().simulate('click')
  expect(onChange).toHaveBeenCalledWith('home')
})
