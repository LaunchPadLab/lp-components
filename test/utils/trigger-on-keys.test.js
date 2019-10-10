import { triggerOnKeys } from '../../src/utils'

describe('Trigger on Keys', () => {
  test('returns a function', () => {
    const fn = jest.fn()
    expect(triggerOnKeys(fn, 13)).toBeInstanceOf(Function)
  })
  
  test('triggers the function when the key code matches', () => {
    const fn = jest.fn()
    const e = { keyCode: 13 }
    const triggerOnEnter = triggerOnKeys(fn, 13)
    triggerOnEnter(e)
    expect(fn).toHaveBeenCalled()
  })
  
  test('invokes the function with the event', () => {
    const fn = jest.fn()
    const e = { keyCode: 13 }
    const triggerOnEnter = triggerOnKeys(fn, 13)
    triggerOnEnter(e)
    expect(fn).toHaveBeenCalledWith(e)
  })
  
  test('accepts a string key code', () => {
    const fn = jest.fn()
    const e = { keyCode: 13 }
    const triggerOnEnter = triggerOnKeys(fn, '13')
    triggerOnEnter(e)
    
    expect(fn).toHaveBeenCalled()
  })
  
  test('accepts a number key code', () => {
    const fn = jest.fn()
    const e = { keyCode: 13 }
    const triggerOnEnter = triggerOnKeys(fn, 13)
    triggerOnEnter(e)
    
    expect(fn).toHaveBeenCalled()
  })
  
  test('accepts an array of key codes', () => {
    const fn = jest.fn()
    const e = { keyCode: 13 }
    const triggerOnEnter = triggerOnKeys(fn, [13, 14, 15])
    triggerOnEnter(e)
    
    expect(fn).toHaveBeenCalled()
  })
  
  test('does not trigger when invalid key is pressed', () => {
    const fn = jest.fn()
    const e = { keyCode: 13 }
    const triggerOnEnter = triggerOnKeys(fn, 15)
    triggerOnEnter(e)
    
    expect(fn).not.toHaveBeenCalled()
  })
  
  test('ignores undefined key codes', () => {
    const fn = jest.fn()
    const e = { keyCode: undefined }
    const triggerOnEnter = triggerOnKeys(fn)
    triggerOnEnter(e)
    
    expect(fn).not.toHaveBeenCalled()
  })
  
  test('ignores null key codes', () => {
    const fn = jest.fn()
    const e = { keyCode: null }
    const triggerOnEnter = triggerOnKeys(fn)
    triggerOnEnter(e)
    
    expect(fn).not.toHaveBeenCalled()
  })
})
