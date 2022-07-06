import React from 'react'
import { mount } from 'enzyme'
import { LoadingContainer } from '../../src/'

test('LoadingContainer renders children', () => {
  const wrapper = mount(
    <LoadingContainer isLoading={true}>
      <div id="loading">This text IS loading. </div>
    </LoadingContainer>
  )
  expect(wrapper.find('div#loading').exists()).toBe(true)
})

test('LoadingContainer does not apply the is-loading class when isLoading is false', () => {
  const wrapper = mount(<LoadingContainer isLoading={false} />)
  expect(wrapper.find('div').props().className).toEqual('')
})

test('LoadingContainer applies the is-loading class when isLoading is true', () => {
  const wrapper = mount(<LoadingContainer isLoading={true} />)
  expect(wrapper.find('div').props().className).toEqual('is-loading')
})

test('LoadingContainer passes props', () => {
  const wrapper = mount(<LoadingContainer isLoading={true} />)
  expect(wrapper.find('div').props()).toEqual({ className: 'is-loading' })
})
