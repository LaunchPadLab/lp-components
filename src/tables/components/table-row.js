import React from 'react'
import PropTypes from 'prop-types'
import { get, identity, isNil, noop, filterInvalidDOMProps } from '../../utils'
import { Types } from '../helpers'

const propTypes = {
  columns: PropTypes.arrayOf(Types.column).isRequired,
  rowComponent: Types.component,
  rowComponentProps: PropTypes.object,
  rowData: PropTypes.any,
  ascending: PropTypes.bool,
  sortPath: PropTypes.string,
  sortFunc: PropTypes.func,
  valueGetter: PropTypes.func,
}

const DefaultRowComponent = ({ children }) => <tr>{children}</tr> // eslint-disable-line
const DefaultCellComponent = (
  { className, onClick, placeholder, value, ...rest } // eslint-disable-line
) => (
  <td {...{ className, onClick, ...filterInvalidDOMProps(rest) }}>
    {isNil(value) ? placeholder : value}
  </td>
)

function TableRow({
  columns,
  rowComponent: RowComponent = DefaultRowComponent,
  rowComponentProps: rowComponentProps = {},
  rowData,
  ascending,
  sortPath,
  sortFunc,
  valueGetter,
}) {
  return (
    <RowComponent
      {...{
        data: rowData,
        ascending,
        sortPath,
        sortFunc,
        valueGetter,
        ...rowComponentProps,
      }}
    >
      {columns.map((column, key) => {
        const {
          name,
          component: CellComponent = DefaultCellComponent,
          format = identity,
          onClick = noop,
          valueGetter,
          ...rest
        } = column
        const cellValue = valueGetter
          ? valueGetter(rowData)
          : get(name, rowData)
        const formattedValue = format(cellValue)
        const onColClick = column.disabled ? noop : () => onClick(rowData)
        return (
          // eslint-disable-next-line react/jsx-key
          <CellComponent
            {...{
              key,
              value: formattedValue,
              name,
              data: rowData,
              onClick: onColClick,
              ...rest,
            }}
          />
        )
      })}
    </RowComponent>
  )
}

TableRow.propTypes = propTypes

export default TableRow
