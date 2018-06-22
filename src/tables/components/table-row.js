import React from 'react'
import PropTypes from 'prop-types'
import { get, noop } from '../../utils'
import { Types } from '../helpers'

const propTypes = {
  columns: PropTypes.arrayOf(Types.column).isRequired,
  rowComponent: Types.component,
  rowData: PropTypes.any,
}

const DefaultRowComponent = ({ children }) => <tr>{ children }</tr> // eslint-disable-line
const DefaultCellComponent = ({ className, name, onClick, value, ...rest }) => // eslint-disable-line
  <td { ...{ className, onClick: () => onClick(name) } }>
    { value }
  </td>

function TableRow ({
  columns,
  rowComponent: RowComponent = DefaultRowComponent,
  rowData,
}) {
  return (
    <RowComponent { ...{ data: rowData } }>
      {
        columns.map((column, key) => {
          const { name, component: CellComponent=DefaultCellComponent, onClick=noop, ...rest } = column
          const value = get(name, rowData)
          return <CellComponent { ...{ // eslint-disable-line
            key, 
            value, 
            name, 
            data: rowData, 
            onClick: cellName => {
              if (column.disabled) return
              if (cellName === name) onClick()
            }, 
            ...rest 
          } } />
        })
      }
    </RowComponent>
  )
}

TableRow.propTypes = propTypes

export default TableRow
