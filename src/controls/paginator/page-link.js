import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utils'
import classnames from 'classnames'

const propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string,
}

const defaultProps = {
  className: '',
  active: false,
  onClick: noop,
  'aria-label': '',
}

const triggerOnEnter = (fn) => {
  return function (e) {
    const key = e.which || e.keyCode
    if (key !== 13) return
    
    return fn()
  }
}

function PageLink ({ className, active, onClick, children, ...rest }) {
  return (
    <li className={ classnames(className, { 'active': active }) }>
      <a
        onClick={ onClick }
        onKeyPress={ triggerOnEnter(onClick) } // keyboard interaction requirement
        aria-current={ active ? 'page' : false }
        tabIndex="0" // add back to tab order
        { ...rest }
      >
        { children }
      </a>
    </li>
  )
}

PageLink.propTypes = propTypes
PageLink.defaultProps = defaultProps

export default PageLink

