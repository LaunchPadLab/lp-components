import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

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
