import React from 'react'
import PropTypes from 'prop-types'
import { get } from '../../utils'
import { Types } from '../helpers'

const propTypes = {
  rowData: PropTypes.any,
  columns: PropTypes.arrayOf(Types.column).isRequired,
  rowComponent: Types.component,
}

const DefaultRowComponent = ({ children }) => <tr>{ children }</tr> // eslint-disable-line
const DefaultCellComponent = ({ value, className }) => <td { ...{ className } }>{ value }</td> // eslint-disable-line

function TableRow ({
  rowData,
  columns,
  rowComponent: RowComponent = DefaultRowComponent,
}) {
  return (
    <RowComponent { ...{ data: rowData } }>
      {
        columns.map((column, key) => {
          const { name, component: CellComponent=DefaultCellComponent, ...rest } = column
          const value = get(name, rowData)
          return <CellComponent { ...{ key, value, name, data: rowData, ...rest } } /> // eslint-disable-line
        })
      }
    </RowComponent>
  )
}

TableRow.propTypes = propTypes

export default TableRow
