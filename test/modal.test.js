import React from 'react'
import { mount } from 'enzyme'
import { Modal } from '../src/'
import { noop } from 'lodash'

describe('Modal', () => {
  // requestAnimationFrame is async, so the callback fails to trigger
  // https://github.com/reactjs/react-modal/issues/903
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });
  
  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

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

  test('adds additional class string to default class', () => {
    const wrapper = mount(<Modal onClose={noop} className="custom" />)
    expect(wrapper.find('.modal-inner.custom').exists()).toEqual(true)
  })

  test('adds additional overlay class string to default overlay class', () => {
    const wrapper = mount(<Modal onClose={noop} overlayClassName="custom-overlay" />)
    expect(wrapper.find('.modal-fade-screen.custom-overlay').exists()).toEqual(true)
  })

  test('adds additional class object to default class', () => {
    const wrapper = mount(<Modal isOpen={true} onClose={noop} className={{ base: 'custom', afterOpen: 'modal-is-open', beforeClose: 'modal-before-close' }} />)
    expect(wrapper.find('.modal-inner.custom.modal-is-open').exists()).toEqual(true)
  })

  test('adds additional overlay class object to default overlay class', () => {
    const wrapper = mount(<Modal isOpen={true} onClose={noop} overlayClassName={{ base: 'custom', afterOpen: 'modal-is-open', beforeClose: 'modal-before-close' }} />)
    expect(wrapper.find('.modal-fade-screen.custom.modal-is-open').exists()).toEqual(true)
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
