import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { adaptToReactRouter, compose } from '../utils'

const propTypes = {
  authFunction: PropTypes.func.isRequired,
  redirect: PropTypes.string,
}

const defaultProps = {
  redirect: '/sign-in'
}

// A react-router route that requires an auth function to return 'true' before it's entered.

// Export this directly for testing
export function AuthorizedRoute ({ authFunction, redirect, ...rest }) {
  function handleRouteChange (prevState, nextState, replace) {
    const isAuthenticated = authFunction()
    if (!isAuthenticated) replace({ pathname: redirect, state: { redirectUrl: nextState.location.pathname }})
  }
  return (
    <Route
      onEnter={ (...args) => handleRouteChange('', ...args) /* onEnter isn't called with prevState, so we have to add it */ }
      onChange={ handleRouteChange }
      { ...rest }
    />
  )
}

AuthorizedRoute.propTypes = propTypes
AuthorizedRoute.defaultProps = defaultProps

export default compose(
  adaptToReactRouter()
)(AuthorizedRoute)
