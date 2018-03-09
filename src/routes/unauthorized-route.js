import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { adaptToReactRouter, compose, flip } from '../utils'

const propTypes = {
  authFunction: PropTypes.func.isRequired,
  redirect: PropTypes.string,
}

const defaultProps = {
  redirect: '/sign-in'
}

// A react-router route that requires an auth function to return 'false' before it's entered.

export function UnauthorizedRoute ({ authFunction, redirect, ...rest }) {
  function handleRouteChange (prevState, nextState, replace, callback) {
    const isAuthenticated = authFunction()
    if (isAuthenticated) replace({ pathname: redirect })
    return callback()
  }
  return (
    <Route
    onEnter={ (...args) => handleRouteChange('', ...args) /* onEnter isn't called with prevState, so we have to add it */ }
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
