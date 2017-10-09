import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { fieldOptionsType } from '../forms/helpers/field-prop-types'
import { objectify, noop } from '../utils'

/**
 *
 * @name TabBar
 * @type Function
 * @description A control component for navigating among multiple tabs
 * @param {String|Number} [value] - The value of the current tab
 * @param {Function} [onChange] - A function called with the new value when a tab is clicked
 * @param {Array} [options] An array of checkbox values (strings or key-value pairs)
 * @example
 *
 * function ShowTabs ({ tabs, currentTab, changeCurrentTab }) {
 *   return (
 *     <div>
 *       <TabBar
 *         options={tabs}
 *         value={currentTab}
 *         onChange={changeCurrentTab}
 *       />
 *     </div>
 *   )
 * }
**/

const propTypes = {
  options: fieldOptionsType,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
}

const defaultProps = {
  options: [],
  value: '',
  onChange: noop,
}

function TabBar ({ options, value, onChange }) {
  const optionObjects = objectify(options)
  return (
    <ul className="tabs horizontal-tabs">
      {
        optionObjects.map(({ key, value: optionValue }) =>
          <li
            className={classnames({ 'active': optionValue == value })}
            key={key}
            onClick={() => { onChange(optionValue) }}
          >
          { key }
          </li>
        )
      }
    </ul>
  )
}

TabBar.propTypes = propTypes

TabBar.defaultProps = defaultProps

export default TabBar
