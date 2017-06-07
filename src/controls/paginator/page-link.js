import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utils'
import classnames from 'classnames'

const propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
}

const defaultProps = {
  className: '',
  active: false,
  onClick: noop
}

function PageLink ({ className, active, onClick, children }) {
  return (
    <li className={classnames(className, { 'active': active })}>
      <a onClick={ onClick }>
        { children }
      </a>
    </li>
  )
}

PageLink.propTypes = propTypes
PageLink.defaultProps = defaultProps

export default PageLink

