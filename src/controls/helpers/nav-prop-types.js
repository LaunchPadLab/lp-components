import PropTypes from 'prop-types'

/**
 *
 * A constant representing the `PropTypes` of the `childItem` prop for the `menuItem` prop, {@link menuItemType}
 *
 * @constant {PropTypes} childItemType
 *
 */

const childItemType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
})

/**
 *
 * A constant representing the `PropTypes` of the `menuItem` prop for DropdownNavBar component, {@link DropdownNavBar}
 *
 * @constant {PropTypes} menuItemType
 *
 */

export const menuItemType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  childItems: PropTypes.arrayOf(childItemType),
})
