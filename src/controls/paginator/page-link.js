import React from 'react'
import PropTypes from 'prop-types'
import { noop, triggerOnKeys } from '../../utils'
import classnames from 'classnames'

const ENTER_KEY_CODE = 13

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

function PageLink({ className, active, onClick, children, ...rest }) {
  return (
    <li className={classnames(className, { active: active })}>
      <a
        role="link"
        onClick={onClick}
        onKeyDown={triggerOnKeys(onClick, ENTER_KEY_CODE)} // keyboard interaction requirement
        aria-current={active ? 'page' : false}
        tabIndex="0" // add back to natural tab order (automatically removed without an href)
        {...rest}
      >
        {children}
      </a>
    </li>
  )
}

PageLink.propTypes = propTypes
PageLink.defaultProps = defaultProps

export default PageLink
