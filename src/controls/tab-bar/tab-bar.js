import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { fieldOptionsType } from '../../forms/helpers/field-prop-types'
import { serializeOptions, noop, get, first, toLower, triggerOnKeys } from '../../utils'
import createFocusListener from './focus'

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
 */

const ENTER_KEY_CODE = 13
const SPACE_KEY_CODE = 32

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
  const activeValue = value || get('value', first(optionObjects)) // a11y dictates that a tab must be active, so default to the first option
  const alignment = vertical ? 'vertical' : 'horizontal'
  
  return (
    <ul className={ classnames('tabs', `${alignment}-tabs`, className) } role="tablist">
      {
        optionObjects.map(({ key, value: optionValue }) => {
          const isActive = optionValue === activeValue
          return (
            <li
              className={ classnames({ [activeClassName]: isActive }) }
              key={ key }
              role="presentation"
              onKeyDown={createFocusListener(alignment)}
            >
              <a
                id={'tab-'+ toLower(optionValue)} // allow sections to reference tab using `aria-labelledby`
                onClick={() => { onChange(optionValue) }}
                onKeyPress={triggerOnKeys(() => { onChange(optionValue) }, [ENTER_KEY_CODE, SPACE_KEY_CODE])}
                tabIndex={ isActive ? '0' : '-1' } // remove inactive tabs from tab order (controlled with arrow keys)
                role="tab"
                aria-selected={ isActive }
              >
                { key }
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}

TabBar.propTypes = propTypes
TabBar.defaultProps = defaultProps

export default TabBar
