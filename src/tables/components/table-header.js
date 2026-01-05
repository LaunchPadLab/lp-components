import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from '../../utils'
import { Types } from '../helpers'
import classnames from 'classnames'

const propTypes = {
  column: Types.column.isRequired,
  sortPath: PropTypes.string,
  ascending: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
}

function TableHeader({
  column: { name, label, disabled },
  sortPath,
  ascending,
  onClick,
}) {
  const active = sortPath === name
  const sortOrder = getSortOrder(active, ascending)
  const headerProps = {}

  if (active) {
    headerProps['aria-sort'] = sortOrder
  }

  return (
    <th
      className={classnames(sortOrder, { sortable: !disabled })}
      {...headerProps}
    >
      <button onClick={onClick}>{label || startCase(name)}</button>
    </th>
  )
}

function getSortOrder(active, ascending) {
  if (!active) return undefined
  return ascending ? 'ascending' : 'descending'
}

TableHeader.propTypes = propTypes

export default TableHeader
