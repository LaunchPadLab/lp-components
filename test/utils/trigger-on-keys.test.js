import { triggerOnKeys } from '../../src/utils'

describe('Trigger on Keys', () => {
  test('returns a function', () => {
    const fn = jest.fn()
    expect(triggerOnKeys(fn, 'Enter')).toBeInstanceOf(Function)
  })

  test('triggers the function when the key matches', () => {
    const fn = jest.fn()
    const e = { key: 'Enter' }
    const triggerOnEnter = triggerOnKeys(fn, 'Enter')
    triggerOnEnter(e)
    expect(fn).toHaveBeenCalled()
  })

  test('invokes the function with the event', () => {
    const fn = jest.fn()
    const e = { key: 'Enter' }
    const triggerOnEnter = triggerOnKeys(fn, 'Enter')
    triggerOnEnter(e)
    expect(fn).toHaveBeenCalledWith(e)
  })

  test('accepts a string key', () => {
    const fn = jest.fn()
    const e = { key: 'Enter' }
    const triggerOnEnter = triggerOnKeys(fn, 'Enter')
    triggerOnEnter(e)

    expect(fn).toHaveBeenCalled()
  })

  test('accepts an array of keys', () => {
    const fn = jest.fn()
    const e = { key: 'Space' }
    const triggerOnEnter = triggerOnKeys(fn, ['Enter', 'Space'])
    triggerOnEnter(e)

    expect(fn).toHaveBeenCalled()
  })

  test('does not trigger when invalid key is pressed', () => {
    const fn = jest.fn()
    const e = { key: 'Enter' }
    const triggerOnEnter = triggerOnKeys(fn, 'Space')
    triggerOnEnter(e)

    expect(fn).not.toHaveBeenCalled()
  })

  test('ignores undefined keys', () => {
    const fn = jest.fn()
    const e = { key: undefined }
    const triggerOnEnter = triggerOnKeys(fn)
    triggerOnEnter(e)

    expect(fn).not.toHaveBeenCalled()
  })

  test('ignores null keys', () => {
    const fn = jest.fn()
    const e = { key: null }
    const triggerOnEnter = triggerOnKeys(fn)
    triggerOnEnter(e)

    expect(fn).not.toHaveBeenCalled()
  })
})
