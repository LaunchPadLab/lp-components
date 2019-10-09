import React from 'react'
import PropTypes from 'prop-types'
import { noop, triggerOnKeys } from '../../utils'
import classnames from 'classnames'

const propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

const defaultProps = {
  className: '',
  active: false,
  onClick: noop,
}

function PageLink ({ className, active, onClick, children, ...rest }) {
  return (
    <li className={ classnames(className, { 'active': active }) }>
      <a
        onClick={ onClick }
        onKeyPress={ triggerOnKeys(onClick, 13) } // keyboard interaction requirement
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

