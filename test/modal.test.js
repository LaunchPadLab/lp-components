import React from 'react'
import { mount } from 'enzyme'
import { Modal } from '../src/'
import { noop } from 'lodash'

test('Modal is shown by default', () => {
  const wrapper = mount(<Modal onClose={noop} />)
  expect(wrapper.find('.modal-content').exists()).toEqual(true)
})

test('Modal can be hidden/animated by manually passing isOpen', () => {
  const wrapper = mount(<Modal isOpen={false} onClose={noop} />)
  expect(wrapper.find('.modal-content').exists()).toEqual(false)
})

test('Modal calls close handler when close button is clicked', () => {
  const onClose = jest.fn()
  const wrapper = mount(<Modal onClose={onClose} />)
  wrapper.find('.modal-close').simulate('click')
  expect(onClose).toHaveBeenCalled()
})

test('Modal hides close button when hideCloseButton=true', () => {
  const wrapper = mount(<Modal hideCloseButton onClose={noop} />)
  expect(wrapper.find('.modal-close').exists()).toEqual(false)
})

test('Modal adds className property to default class', () => {
  const wrapper = mount(<Modal onClose={noop} className='foo-bar' />)
  expect(wrapper.find('.modal-inner.foo-bar').exists()).toEqual(true)
})

test('Modal object className overwrites default class', () => {
  const wrapper = mount(<Modal onClose={noop} className={{ base: 'modal-custom', afterOpen: 'modal-is-open', beforeClose: 'modal-is-close'}} />)
  expect(wrapper.find('.modal-custom.modal-is-open').exists()).toEqual(true)
  expect(wrapper.find('.modal-inner').exists()).toEqual(false)
})
