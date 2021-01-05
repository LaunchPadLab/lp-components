import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { getColumnData, Types } from './helpers'
import { TableHeader as DefaultHeader, TableRow as Row } from './components'
import { get, noop, orderBy } from '../utils'
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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  initialAscending: PropTypes.bool,
  initialColumn: PropTypes.string,
  disableReverse: PropTypes.bool,
  disableSort: PropTypes.bool,
  controlled: PropTypes.bool,
  onChange: PropTypes.func,
  rowComponent: Types.component,
  headerComponent: Types.component,
}
const defaultProps = {
  className: '',
  data: [],
  initialAscending: true,
  initialColumn: '',
  disableReverse: false,
  disableSort: false,
  controlled: false,
  onChange: noop,
}
const defaultControls = {
  initialSortPath: '',
  initialSortFunc: null,
  initialValueGetter: null,
}

function getInitialSortControls(initialColumn, columns) {
  if (!initialColumn) return defaultControls

  const initialProps = columns.filter(col => col.name === initialColumn).pop()
  // Exceptional situation-- an initial column was specified but no column data
  // exists for the named column...
  if (!initialProps) throw new Error('initial column has no column definition')

  return {
    initialSortPath: initialProps.name,
    initialSortFunc: initialProps.sortFunc,
    initialValueGetter: initialProps.valueGetter,
  }
}


function SortableTable({
  className,
  children,
  data: unsortedData,
  initialAscending,
  initialColumn,
  disableReverse,
  disableSort,
  controlled,
  onChange,
  rowComponent,
  headerComponent,
  ...rest
}) {
  const columns = getColumnData(children, disableSort)
  const { initialSortPath, initialSortFunc, initialValueGetter } =
    getInitialSortControls(initialColumn, columns)
  const [ascending, setAscending] = useState(initialAscending)
  const [sortPath, setSortPath] = useState(initialSortPath)

  // Setting and storing a function object requires special syntax.
  // See: https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
  const [sortFunc, setSortFunc] = useState(() => initialSortFunc)
  const [valueGetter, setValueGetter] = useState(() => initialValueGetter)

  const data = useMemo(() => {
    if (controlled || disableSort) return unsortedData

    if (sortFunc) {
      const sorted = [...unsortedData].sort(sortFunc)
      if (!ascending && !disableReverse) sorted.reverse()
      return sorted
    }
    else {
      const order = ascending ? 'asc' : 'desc'
      const sorted = orderBy(
        unsortedData,
        (item) => valueGetter ? valueGetter(item) : get(sortPath, item),
        order
      )
      return sorted
    }
  }, [ascending, sortPath, sortFunc, valueGetter, controlled, disableSort, disableReverse, unsortedData])

  const handleColumnChange = (column) => {
    if (column.disabled) return

    const newSortPath = column.name
    const newSortFunc = column.sortFunc || null
    const newValueGetter = column.valueGetter || null

    // Toggle ascending if the path is already selected. Otherwise, default
    // to ascending when switching paths...
    const newAscending = newSortPath === sortPath ? !ascending : true

    setAscending(newAscending)
    setSortPath(newSortPath)
    setSortFunc(() => newSortFunc)
    setValueGetter(() => newValueGetter)

    if (onChange) onChange({
      ascending: newAscending,
      sortPath: newSortPath,
      sortFunc: newSortFunc
    })
  }

  return (
    <table className={classnames(className, { 'sortable-table': !disableSort })} {...rest}>
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

export default SortableTable
