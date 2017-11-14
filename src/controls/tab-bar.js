import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { fieldOptionsType } from '../forms/helpers/field-prop-types'
import { serializeOptions, noop } from '../utils'

/**
 *
 * @name TabBar
 * @type Function
 * @description A control component for navigating among multiple tabs
 * @param {Boolean} [vertical] A boolean setting the `className` of the `ul` to 'horizontal' (default), or 'vertical', which determines the alignment of the tabs (optional, default `false`)
 * @param {Array} [options] An array of tab values (strings or key-value pairs)
 * @param {String|Number} [value] - The value of the current tab
 * @param {Function} [onChange] - A function called with the new value when a tab is clicked
 * @param {String} [activeClassName] - The class of the active tab, (optional, default `active`)
 * @example
 *
 * function ShowTabs ({ currentTab, setCurrentTab }) {
 *   return (
 *     <div>
 *       <TabBar
 *         options={['Tab 1', 'Tab 2']}
 *         value={currentTab}
 *         onChange={setCurrentTab}
 *       />
 *     </div>
 *   )
 * }
**/

const propTypes = {
  vertical: PropTypes.bool,
  options: fieldOptionsType,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
}

const defaultProps = {
  vertical: false,
  options: [],
  value: '',
  onChange: noop,
  className: '',
  activeClassName: 'active',
}

function TabBar ({ vertical, options, value, onChange, className, activeClassName }) {
  const optionObjects = serializeOptions(options)
  const alignment = vertical ? 'vertical' : 'horizontal'
  return (
    <ul className={ classnames('tabs', `${alignment}-tabs`, className) }>
      {
        optionObjects.map(({ key, value: optionValue }) =>
          <li
            className={ classnames({ [activeClassName]: optionValue === value }) }
            key={ key }
          >
            <a onClick={() => { onChange(optionValue) }}>
              { key }
            </a>
          </li>
        )
      }
    </ul>
  )
}

TabBar.propTypes = propTypes

TabBar.defaultProps = defaultProps

export default TabBar
