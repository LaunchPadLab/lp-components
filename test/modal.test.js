import React from 'react'
import { mount } from 'enzyme'
import { Modal } from '../src/'
import { noop } from 'lodash'

describe('Modal', () => {
  test('is shown by default', () => {
    const wrapper = mount(<Modal onClose={noop} />)
    expect(wrapper.find('.modal-content').exists()).toEqual(true)
  })
  
  test('can be hidden/animated by manually passing isOpen', () => {
    const wrapper = mount(<Modal isOpen={false} onClose={noop} />)
    expect(wrapper.find('.modal-content').exists()).toEqual(false)
  })
  
  test('calls close handler when close button is clicked', () => {
    const onClose = jest.fn()
    const wrapper = mount(<Modal onClose={onClose} />)
    wrapper.find('.modal-close').simulate('click')
    expect(onClose).toHaveBeenCalled()
  })

  describe('when preventClose=true', () => {
    test('hides close button', () => {
      const wrapper = mount(<Modal preventClose={true} onClose={noop} />)
      expect(wrapper.find('.modal-close').exists()).toEqual(false)
    })

    test('does not close by escape key', () => {
      const onClose = jest.fn()
      const wrapper = mount(<Modal preventClose={true} onClose={onClose} />)
      wrapper.find('.modal-content').simulate('keydown', { keyCode: 27 })
      expect(onClose).not.toHaveBeenCalled()
    })

    test('does not close by overlay click', () => {
      const onClose = jest.fn()
      const overlayClass = 'test-overlay'
      const wrapper = mount(<Modal preventClose={true} onClose={onClose} overlayClassName={overlayClass} />)
      wrapper.find('.' + overlayClass).simulate('click')
      expect(onClose).not.toHaveBeenCalled()
      expect(wrapper.find('.modal-content').exists()).toEqual(true)
    })

    test('allows individual prop overrides', () => {
      const onClose = jest.fn()
      const wrapper = mount(<Modal preventClose={true} onClose={onClose} shouldCloseOnEsc={true} />)
      wrapper.find('.modal-content').simulate('keydown', { keyCode: 27 })
      expect(onClose).toHaveBeenCalled()
    })
  })
})
