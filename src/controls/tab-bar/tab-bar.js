import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { serializeOptions, noop, toLower } from '../../utils'
import manageFocus from './focus'

/**
 *
 * @name TabBar
 * @type Function
 * @description A control component for navigating among multiple tabs
 * @param {Boolean} [vertical=false] - A boolean setting the `className` of the `ul` to 'horizontal' (default), or 'vertical', which determines the alignment of the tabs
 * @param {Array} options - An array of tab values (strings or key-value pairs)
 * @param {String|Number} value - The value of the current tab
 * @param {Function} [onChange] - A function called with the new value when a tab is clicked
 * @param {String} [activeClassName='active'] - The class of the active tab
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

const propTypes = {
  vertical: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      }),
    ])
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
}

const defaultProps = {
  vertical: false,
  onChange: noop,
  className: '',
  activeClassName: 'active',
}

function TabBar({
  vertical,
  options,
  value,
  onChange,
  className,
  activeClassName,
}) {
  const optionObjects = serializeOptions(options)
  const alignment = vertical ? 'vertical' : 'horizontal'

  return (
    <ul
      className={classnames('tabs', `${alignment}-tabs`, className)}
      role="tablist"
      aria-orientation={alignment}
    >
      {optionObjects.map(({ key, value: optionValue }) => {
        const isActive = optionValue === value
        return (
          <li
            className={classnames({ [activeClassName]: isActive })}
            key={key}
            role="presentation"
            onKeyDown={(e) => manageFocus(e, { vertical })}
          >
            <button
              type="button"
              id={'tab-' + toLower(optionValue)} // allow sections to reference tab using `aria-labelledby`
              onClick={() => {
                onChange(optionValue)
              }}
              tabIndex={isActive ? '0' : '-1'} // remove inactive tabs from tab order (controlled with arrow keys)
              role="tab"
              aria-selected={isActive}
            >
              {key}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

TabBar.propTypes = propTypes
TabBar.defaultProps = defaultProps

export default TabBar
