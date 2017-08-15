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

function TableHeader ({ 
  column: { name, label, disabled },
  sortPath,
  ascending,
  onClick,
}) {
  const active = (sortPath === name)
  const arrowClass = getArrowClass(active, ascending)
  return (
    <th
      onClick={ onClick }
      className={ classnames(arrowClass, { 'sortable': !disabled }) }
    >
      { label || startCase(name) }
    </th>
  )
}

function getArrowClass (active, ascending) {
  if (!active) return ''
  return ascending ? 'order-ascend' : 'order-descend'
}

TableHeader.propTypes = propTypes

export default TableHeader
