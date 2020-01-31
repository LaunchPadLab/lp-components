import { getChildProps } from './helpers'
import { UnauthorizedRouteWrapped } from '../../src/routes/unauthorized-route'

// Fixtures
const PREV_STATE_PATH = '/previous'
const NEXT_STATE_PATH = '/next'
const REDIRECT_PATH = '/redirect'
const PREV_STATE = { location: { pathname: PREV_STATE_PATH } }
const NEXT_STATE = { location: { pathname: NEXT_STATE_PATH } }

test('UnauthorizedRoute redirects when authorized', () => {
  const props = {  
    authFunction: () => true,
    redirect: REDIRECT_PATH
  }
  // Get change handler passed to child route and call it manually
  const { onChange } = getChildProps(UnauthorizedRouteWrapped, props)
  const replace = jest.fn()
  const callback = jest.fn()
  onChange(PREV_STATE, NEXT_STATE, replace, callback)
  expect(replace).toHaveBeenCalledWith({ pathname: REDIRECT_PATH })
})

test('UnauthorizedRoute does not redirect when unauthorized', () => {
  const props = {  
    authFunction: () => false,
    redirect: REDIRECT_PATH
  }
  const { onChange } = getChildProps(UnauthorizedRouteWrapped, props)
  const replace = jest.fn()
  const callback = jest.fn()
  onChange(PREV_STATE, NEXT_STATE, replace, callback)
  expect(replace).not.toHaveBeenCalled()
})
