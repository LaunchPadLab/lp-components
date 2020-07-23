import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { applyValueGetters, getColumnData, Types } from './helpers'
import { TableHeader as DefaultHeader, TableRow as Row } from './components'
import { noop, orderBy } from '../utils'
import classnames from 'classnames'

/**
 * A component for displaying sortable data in a table.
 * This component's behavior is largely determined by the {@link TableColumn} components that are passed to it.
 *
 * @name SortableTable
 * @type Function
 * @param {Array} [data=[]] - An array of objects to display in the table- one object per row
 * @param {Number} [initialColumn=''] - The name of the column that's initially selected
 * @param {Boolean} [initialAscending=true] - The sort direction of the initial column
 * @param {Boolean} [disableReverse=false] - Disables automatic reversing of descending sorts
 * @param {Boolean} [disableSort=false] - A flag to disable sorting on all columns and hide sorting arrows.
 * @param {Boolean} [controlled=false] - A flag to disable sorting on all columns, while keeping the sorting arrows. Used when sorting is controlled by an external source.
 * @param {Function} [onChange] - A callback that will be fired when the sorting state changes
 * @param {Function} [rowComponent] - A custom row component for the table. Will be passed the `data` for the row, as well as `children` to render.
 * @param {Function} [headerComponent] - A custom header component for the table. Will be passed the configuration of the corresponding column, as well as the current `sortPath` / `ascending` and an `onClick` handler. May be overridden by a custom `headerComponent` for a column.
 * @example
 *
 * function PersonTable ({ people }) {
 *   return (
 *     <SortableTable data={ people } initialColumn="name">
 *       <TableColumn name="name" />
 *       <TableColumn name="age" label="Years alive" />
 *       <TableColumn name="status" component={ StatusCell } />
 *     </SortableTable>
 *   )
 * }
 */

/* eslint react/jsx-key: 0 */

const propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(Types.column).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialSortPath: PropTypes.string.isRequired,
  initialSortFunc: PropTypes.func,
  initialAscending: PropTypes.bool,
  disableReverse: PropTypes.bool,
  disableSort: PropTypes.bool.isRequired,
  controlled: PropTypes.bool,
  onChange: PropTypes.func,
  rowComponent: Types.component,
  headerComponent: Types.component,
}
const defaultProps = {
  className: '',
  initialAscending: true,
  disableReverse: false,
  controlled: false,
  onChange: noop,
}


function SortableTable({
  className,
  columns,
  data: unsortedData,
  initialSortPath,
  initialSortFunc,
  initialAscending,
  disableReverse,
  disableSort,
  controlled,
  onChange,
  rowComponent,
  headerComponent,
}) {
  const [sortControls, setSortControls] = useState({
    ascending: initialAscending,
    sortPath: initialSortPath,
    sortFunc: initialSortFunc
  })
  const [data, setData] = useState(unsortedData)
  const { ascending, sortPath, sortFunc } = sortControls

  const handleColumnChange = (column) => {
    if (column.disabled) return

    const newSortPath = column.name
    const newSortFunc = column.sortFunc || null

    // Toggle ascending if the path is already selected. Otherwise, default
    // to ascending when switching paths...
    const newAscending = newSortPath === sortPath ? !ascending : true

    setSortControls({
      ...sortControls,
      ascending: newAscending,
      sortPath: newSortPath,
      sortFunc: newSortFunc,
    })
  }

  useEffect(() => {
    // Sort the data, if necessary...
    if (controlled || disableSort) return

    if (sortFunc) {
      const sorted = [...data].sort(sortFunc)
      if (!ascending && !disableReverse) sorted.reverse()
      setData(sorted)
    }
    else {
      const order = ascending ? 'asc' : 'desc'
      const sorted = orderBy(data, sortPath, order)
      setData(sorted)
    }

    // Call onChange if the sort controls change...
    if (onChange) onChange({ ascending, sortPath, sortFunc })
  }, [sortControls])

  return (
    <table className={classnames(className, { 'sortable-table': !disableSort })}>
      <thead><tr>
        {
          columns.map((column, key) => {
            const Header = column.headerComponent || headerComponent || DefaultHeader
            return (
              <Header {...{
                key,
                column,
                sortPath,
                ascending,
                onClick: () => handleColumnChange(column)
              }} />
            )
          }
          )
        }
      </tr></thead>
      <tbody>
        {
          data.map((rowData, key) =>
            <Row {...{
              key,
              rowData,
              columns,
              rowComponent,
            }} />
          )
        }
      </tbody>
    </table>
  )
}

SortableTable.propTypes = propTypes
SortableTable.defaultProps = defaultProps

// Passes relevant SortableTable props and applies valueGetters...
function SortableTableWrapper({
  data: unsortedData,
  initialColumn,
  children,
  disableSort,
  ...rest
}) {
  const columns = getColumnData(children, disableSort)
  const initialProps = columns.filter(col => col.name === initialColumn).pop()
  const data = applyValueGetters(columns, unsortedData)

  return <SortableTable {...{
    data,
    initialSortPath: initialProps ? initialProps.name : '',
    initialSortFunc: initialProps ? initialProps.sortFunc : null,
    columns,
    disableSort,
    ...rest,
  }} />
}

SortableTableWrapper.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  initialColumn: PropTypes.string,
  disableSort: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

SortableTableWrapper.defaultProps = {
  data: [],
  initialColumn: '',
  disableSort: false,
}

export default SortableTableWrapper
