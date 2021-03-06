import React from 'react'
import PropTypes from 'prop-types'
import { compose, onOutsideClick, toggle, togglePropTypes } from '../../utils'
import classnames from 'classnames'

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  ...togglePropTypes('expanded'),
}

const defaultProps = {
  className: '',
  selectedValues: [],
}

// Wraps the `DropdownCheckboxGroup` component

function DropdownSelect ({ 
  children,
  className,
  expanded, 
  selectedValues, 
  toggleExpanded, 
}) {
  return (
    <div className="dropdown-select">
      <div className="select-input" onClick={ toggleExpanded }>
        <p>{ getLabel(selectedValues) }</p>
      </div>
      <div 
        className={ classnames(
          className,
          'options', 
          { 
            'is-active': expanded,
          }
      )}>
        <div className="scroll-box">
          { children }
        </div>
      </div>
    </div>
  )
}

DropdownSelect.propTypes = propTypes

DropdownSelect.defaultProps = defaultProps

function getLabel (values) {
  return values.length ? values.join(', ') : 'None'
}

function handleClickOutside ({ setExpanded }) {
  return setExpanded(false)
}

export default compose(
  toggle('expanded'),
  onOutsideClick(handleClickOutside),
)(DropdownSelect)
