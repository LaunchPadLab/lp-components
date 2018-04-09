import React from 'react'
import PropTypes from 'prop-types'
import { compose } from '../../utils'
import { onOutsideClick, toggle, togglePropTypes } from '@launchpadlab/lp-hoc'
import classnames from 'classnames'

const propTypes = {
  ...togglePropTypes('expanded'),
  text: PropTypes.string,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
}

const defaultProps = {
  selectedValues: [],
}

function DropdownSelect ({ 
  children,
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
          'options', 
          'checkboxes', 
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
