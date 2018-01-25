import React from 'react'
import { mount } from 'enzyme'
import { Spinner } from '../../src/'


test('Spinner creates div with id "spinner"', () => {
  const wrapper = mount(
    <Spinner/>
  )
  expect(wrapper.find('div#spinner').exists()).toBe(true)
})
