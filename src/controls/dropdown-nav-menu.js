import React from 'react'
import PropTypes from 'prop-types'
import { menuItemType } from './helpers/nav-prop-types'
import DropdownNavMenuItem from './dropdown-nav-menu-item'
import DropdownNavMenuSubItem from './dropdown-nav-menu-sub-item'
import { isEmpty, first, last } from 'lodash'

const propTypes = {
  baseUrl: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(menuItemType).isRequired,
  activeMenuIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onInteractParentMenu: PropTypes.func.isRequired,
  toggleActiveMenuId: PropTypes.func.isRequired,
  closeSubmenu: PropTypes.func.isRequired,
  menuLabel: PropTypes.string.isRequired,
}

const defaultProps = {}

function DropdownNavMenu({
  baseUrl,
  menuItems,
  activeMenuIds,
  onInteractParentMenu,
  toggleActiveMenuId,
  closeSubmenu,
  menuLabel,
}) {
  return (
    <ul className="dropdown-nav-menu" aria-label={menuLabel}>
      {menuItems.map((parentItem, index) => {
        const isFirstParentItem = parentItem === first(menuItems)
        return (
          <DropdownNavMenuItem
            key={index}
            name={parentItem.name}
            id={parentItem.id}
            baseUrl={baseUrl}
            path={parentItem.path}
            active={activeMenuIds.includes(parentItem.id)}
            onInteractParentMenu={onInteractParentMenu}
            closeSubmenu={closeSubmenu}
            toggleActiveMenuId={toggleActiveMenuId}
            isFirstItem={isFirstParentItem}
          >
            {parentItem.childItems && !isEmpty(parentItem.childItems) && (
              <ul className="sub-menu">
                {parentItem.childItems.map((childItem, index) => {
                  const isLastChildItem =
                    childItem === last(parentItem.childItems)
                  return (
                    <DropdownNavMenuSubItem
                      key={index}
                      name={childItem.name}
                      baseUrl={baseUrl}
                      path={childItem.path}
                      isLastItem={isLastChildItem}
                      closeSubmenu={closeSubmenu}
                    />
                  )
                })}
              </ul>
            )}
          </DropdownNavMenuItem>
        )
      })}
    </ul>
  )
}

DropdownNavMenu.propTypes = propTypes
DropdownNavMenu.defaultProps = defaultProps

export default DropdownNavMenu
