import React from 'react'
import PropTypes from 'prop-types'
import { useToggle } from '../../utils'
import OutsideClickHandler from 'react-outside-click-handler'
import classnames from 'classnames'

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
}

const defaultProps = {
  className: '',
  selectedValues: [],
  options: [],
}

// Wraps the `CheckboxGroup` component when dropdown is set to true.

function DropdownSelect({ children, className, selectedValues, options }) {
  const [expanded, toggleExpanded] = useToggle()

  return (
    <OutsideClickHandler onOutsideClick={() => toggleExpanded(false)}>
      <div
        className={classnames('dropdown-select', {
          'is-active': expanded,
        })}
      >
        <button
          type="button"
          className="select-input"
          onClick={() => toggleExpanded()}
        >
          <p>{getLabel(selectedValues, options)}</p>
        </button>
        <div
          className={classnames(className, 'options', {
            'is-active': expanded,
          })}
        >
          <div className="scroll-box">{children}</div>
        </div>
      </div>
    </OutsideClickHandler>
  )
}

DropdownSelect.propTypes = propTypes

DropdownSelect.defaultProps = defaultProps

function getLabel(values, options) {
  const labels = values.map((v) => options.find((o) => o.value === v).key)
  return values.length ? labels.join(', ') : 'None'
}

export default DropdownSelect
