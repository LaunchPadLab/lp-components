import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

/**
 * A component that wraps the `react-router` [`Link`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md) component, adding an `activeClassName`.
 * A full list of props supported by this component can be found [here](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md).
 * 
 * @name NavLink
 * @type Function
 * @example
 *
 * function Header () {
 *   return (
 *     <ul>
 *      <li><NavLink to="/">Home</NavLink></li>
 *      <li><NavLink to="/blog">Blog</NavLink></li>
 *     </ul>
 *   )
 * }
 * 
**/

const propTypes = {
  children: PropTypes.node,
}

function NavLink ({ children, ...rest }) {
  return (
    <Link activeClassName="is-active" { ...rest }>{ children }</Link>
  )
}

NavLink.propTypes = propTypes

export default NavLink
