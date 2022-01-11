import React from 'react'
import { mount } from 'enzyme'
import { Spinner } from '../../src/'


test('Spinner creates div with id "spinner"', () => {
  const wrapper = mount(
    <Spinner/>
  )
  expect(wrapper.find('div#spinner').exists()).toBe(true)
})

test('Spinner passes props', () => {
  const wrapper = mount(
    <Spinner name="Bob" />
  )
  expect(wrapper.find('div#spinner').props().name).toEqual('Bob')
})

test('Spinner filters invalid props', () => {
  const wrapper = mount(
    <Spinner name="Bob" someInvalidProp="I am not a valid DOM prop" />
  )
  expect(wrapper.find('div#spinner').props().someInvalidProp).not.toBeDefined()
})

test('Spinner can have custom className', () => {
  const wrapper = mount(
    <Spinner className="custom" />
  )
  expect(wrapper.find('div.custom').exists()).toBe(true)
})