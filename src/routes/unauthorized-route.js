import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { adaptToReactRouter, compose } from '../utils'

/**
 *
 * A react-router `Route` component that requires an auth function to return `false` before it can be entered.
 *
 * @name UnauthorizedRoute
 * @type Function
 * @param {Function} authFunction - A function that returns true or false, indicating whether the current user is authenticated
 * @param {String} [redirect='/'] - A redirect path if the user is authenticated
 * @example
 * 
 * function isMember () {
 *    return someUser.isMember()
 * }
 *
 * const MyRoutes = (
 *     <Route path="/" component={ Layout }>
 *        <Route path="/members" component={ MembersPage } />
 *        <UnauthorizedRoute 
 *           path="/welcome" 
 *           component={ WelcomePage }
 *           authFunction={ isMember }
 *           redirect="/members"
 *        />
 *     </Route>
 * )
 */

const propTypes = {
  authFunction: PropTypes.func.isRequired,
  redirect: PropTypes.string,
}

const defaultProps = {
  redirect: '/'
}

// Note: this component is exported directly for testing
export function UnauthorizedRoute ({ authFunction, redirect, ...rest }) {
  function handleRouteChange (prevState, nextState, replace, callback) {
    const isAuthenticated = authFunction()
    if (isAuthenticated) replace({ pathname: redirect })
    return callback()
  }
  return (
    <Route
    onEnter={ (...args) => handleRouteChange('', ...args) /* onEnter isn't called with prevState, so we add it here */ }
    onChange={ handleRouteChange }
    { ...rest }
    />
  )
}

UnauthorizedRoute.propTypes = propTypes
UnauthorizedRoute.defaultProps = defaultProps

export default compose(
  adaptToReactRouter()
)(UnauthorizedRoute)
