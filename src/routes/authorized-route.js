import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { adaptToReactRouter, compose } from '../utils'

/**
 *
 * A [react-router](https://github.com/ReactTraining/react-router) `Route` component that requires an auth function to return `true` before it can be entered.
 *
 * Note: this component is only compatible with react-router ^3.0.0.
 *
 * @name AuthorizedRoute
 * @type Function
 * @param {Function} authFunction - A function that returns true or false, indicating whether the current user is authenticated
 * @param {String} [redirect='/sign-in'] - A redirect path if the user is not authenticated
 * @example
 *
 * function isMember () {
 *    return someUser.isMember()
 * }
 *
 * const MyRoutes = (
 *     <Route path="/" component={ Layout }>
 *        <Route path="/welcome" component={ WelcomePage } />
 *        <AuthorizedRoute
 *           path="/members"
 *           component={ MembersPage }
 *           authFunction={ isMember }
 *           redirect="/welcome"
 *        />
 *     </Route>
 * )
 */

const propTypes = {
  authFunction: PropTypes.func.isRequired,
  redirect: PropTypes.string,
}

const defaultProps = {
  redirect: '/sign-in',
}

// Note: this component is exported directly for testing
export function AuthorizedRoute({ authFunction, redirect, ...rest }) {
  function handleRouteChange(prevState, nextState, replace) {
    const isAuthenticated = authFunction()
    if (!isAuthenticated)
      return replace({
        pathname: redirect,
        state: { redirectUrl: nextState.location.pathname },
      })
  }
  return (
    <Route
      onEnter={
        (...args) =>
          handleRouteChange(
            '',
            ...args
          ) /* onEnter isn't called with prevState, so we add it here */
      }
      onChange={handleRouteChange}
      {...rest}
    />
  )
}

AuthorizedRoute.propTypes = propTypes
AuthorizedRoute.defaultProps = defaultProps

export default compose(adaptToReactRouter())(AuthorizedRoute)
