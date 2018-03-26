import { getChildProps } from './helpers'
import { AuthorizedRoute } from '../../src/routes/authorized-route'

// Fixtures
const PREV_STATE_PATH = '/previous'
const NEXT_STATE_PATH = '/next'
const REDIRECT_PATH = '/redirect'
const PREV_STATE = { location: { pathname: PREV_STATE_PATH } }
const NEXT_STATE = { location: { pathname: NEXT_STATE_PATH } }

test('AuthorizedRoute redirects when unauthorized', () => {
  const props = {  
    authFunction: () => false,
    redirect: REDIRECT_PATH
  }
  // Get change handler passed to child route and call it manually
  const { onChange } = getChildProps(AuthorizedRoute, props)
  const replace = jest.fn()
  onChange(PREV_STATE, NEXT_STATE, replace)
  expect(replace).toHaveBeenCalledWith({ pathname: REDIRECT_PATH, state: { redirectUrl: NEXT_STATE_PATH }})
})

test('AuthorizedRoute does not redirect when authorized', () => {
  const props = {  
    authFunction: () => true,
    redirect: REDIRECT_PATH
  }
  const { onChange } = getChildProps(AuthorizedRoute, props)
  const replace = jest.fn()
  onChange(PREV_STATE, NEXT_STATE, replace)
  expect(replace).not.toHaveBeenCalled()
})
