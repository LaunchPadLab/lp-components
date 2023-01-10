import React from 'react'
import { mount } from 'enzyme'
import { Paginator } from '../../../src/'

test('Previous button renders unless value is min', () => {
  const wrapper = mount(<Paginator value={5} min={1} max={10} />)
  expect(wrapper.find('.prev').exists()).toBe(true)
  wrapper.setProps({ value: 1 })
  expect(wrapper.find('.prev').exists()).toBe(false)
})

test('Next button renders unless value is max', () => {
  const wrapper = mount(<Paginator value={5} min={1} max={10} />)
  expect(wrapper.find('.next').exists()).toBe(true)
  wrapper.setProps({ value: 10 })
  expect(wrapper.find('.next').exists()).toBe(false)
})

test('Button with current value is marked as active', () => {
  const wrapper = mount(<Paginator value={5} min={1} max={10} />)
  expect(wrapper.find('.active').text()).toBe('5')
})

test('Button click sets value', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <Paginator value={5} min={1} max={10} onChange={onChange} />
  )
  wrapper.find('li > a').at(2).simulate('click')
  expect(onChange).toHaveBeenCalledWith(4)
})

test('Previous button decrements value', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <Paginator value={5} min={1} max={10} onChange={onChange} />
  )
  wrapper.find('li > a').first().simulate('click')
  expect(onChange).toHaveBeenCalledWith(4)
})

test('Next button increments value', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <Paginator value={5} min={1} max={10} onChange={onChange} />
  )
  wrapper.find('li > a').last().simulate('click')
  expect(onChange).toHaveBeenCalledWith(6)
})

test('Min button sets value to min', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <Paginator value={5} min={1} max={10} onChange={onChange} />
  )
  wrapper.find('li > a').at(1).simulate('click')
  expect(onChange).toHaveBeenCalledWith(1)
})

test('Max button sets value to max', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <Paginator value={5} min={1} max={10} onChange={onChange} />
  )
  wrapper.find('li > a').at(5).simulate('click')
  expect(onChange).toHaveBeenCalledWith(10)
})

test('Current page is indicated via aria-current', () => {
  const wrapper = mount(<Paginator value={5} min={1} max={10} />)
  expect(wrapper.find('.active > a').prop('aria-current')).toBe('page')
  expect(wrapper.find('a').not('.active').first().prop('aria-current')).toBe(
    false
  )
})

test('Destination is indicated via aria-label', () => {
  const wrapper = mount(<Paginator value={5} min={1} max={10} />)
  expect(wrapper.find('.active > a').prop('aria-label')).toBe('Go to page 5')
})

test('Page button is triggered via click or enter', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <Paginator value={5} min={1} max={10} onChange={onChange} />
  )
  const link = wrapper.find('li > a').at(2)
  link.simulate('click')
  link.simulate('keypress', { keyCode: 13 })

  expect(onChange).toHaveBeenCalledTimes(2)
})

test('Can accept custom delimiter', () => {
  const wrapper = mount(
    <Paginator value={1} min={1} max={10} delimiter="foo" />
  )
  expect(wrapper.find('.delimiter').contains('foo')).toBe(true)
})
