import React from 'react'
import PropTypes from 'prop-types'
import { menuItemType } from './helpers/nav-prop-types'
import DropdownNavMenuItem from './dropdown-nav-menu-item'
import DropdownNavMenuSubItem from './dropdown-nav-menu-sub-item'
import { isEmpty, first, last } from 'lodash'

const propTypes = {
  baseURL: PropTypes.string,
  menuItems: PropTypes.arrayOf(menuItemType).isRequired,
  activeMenuIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onInteractParentMenu: PropTypes.func.isRequired,
  toggleActiveMenuId: PropTypes.func.isRequired,
  closeSubmenu: PropTypes.func.isRequired,
  children: PropTypes.node,
}

const defaultProps = {
  baseURL: '',
  children: null,
}

function DropdownNavMenu({
  baseURL,
  menuItems,
  activeMenuIds,
  onInteractParentMenu,
  toggleActiveMenuId,
  closeSubmenu,
  children,
}) {
  return (
    <div className="primary-menu">
      <ul id="menu-primary-navigation" className="menu">
        {menuItems.map((parentItem, index) => {
          const isFirstParentItem = parentItem === first(menuItems)
          return (
            <DropdownNavMenuItem
              key={index}
              name={parentItem.name}
              id={parentItem.id}
              baseURL={baseURL}
              path={parentItem.path}
              active={activeMenuIds.includes(parentItem.id)}
              onInteractParentMenu={onInteractParentMenu}
              closeSubmenu={closeSubmenu}
              toggleActiveMenuId={toggleActiveMenuId}
              isFirstItem={isFirstParentItem}
            >
              {parentItem.childItems && !isEmpty(parentItem.childItems) && (
                <React.Fragment>
                  {parentItem.childItems.map((childItem, index) => {
                    const isLastChildItem =
                      childItem === last(parentItem.childItems)
                    return (
                      <DropdownNavMenuSubItem
                        key={index}
                        name={childItem.name}
                        id={childItem.id}
                        baseURL={baseURL}
                        path={childItem.path}
                        isLastItem={isLastChildItem}
                        closeSubmenu={closeSubmenu}
                      />
                    )
                  })}
                </React.Fragment>
              )}
            </DropdownNavMenuItem>
          )
        })}
      </ul>
      {children}
    </div>
  )
}

DropdownNavMenu.propTypes = propTypes
DropdownNavMenu.defaultProps = defaultProps

export default DropdownNavMenu
