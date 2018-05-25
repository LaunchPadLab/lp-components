import React from 'react'
import PropTypes from 'prop-types'
import { sortable, sortablePropTypes, noop } from '../utils'
import { getColumnData, Types } from './helpers'
import { TableHeader as Header, TableRow as Row } from './components' 
import classnames from 'classnames'

/**
 * A component for displaying sortable data in a table.
 * This component's behavior is largely determined by the {@link TableColumn} components that are passed to it.
 * 
 * @name SortableTable
 * @type Function
 * @param {Array} [data=[]] - An array of objects to display in the table- one object per row
 * @param {Number} [initialColumn=''] - The name of the column that's initially selected
 * @param {Boolean} [disableReverse=false] - Disables automatic reversing of descending sorts
 * @param {Boolean} [disableSort=false] - A flag to disable sorting on all columns and hide sorting arrows.
 * @param {Boolean} [controlled=false] - A flag to disable sorting on all columns, while keeping the sorting arrows. Used when sorting is controlled by an external source. 
 * @param {Function} [onChange] - A callback that will be fired when the sorting state changes
 * @param {Function} [rowComponent] - A custom row component for the table. Will be passed the `data` for the row, as well as `children` to render.
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
**/

/* eslint react/jsx-key: 0 */

const propTypes = {
  columns: PropTypes.arrayOf(Types.column).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  disableSort: PropTypes.bool.isRequired,
  controlled: PropTypes.bool.isRequired,
  rowComponent: Types.component,
  ...sortablePropTypes,
}

const defaultProps = {}

function SortableTable ({ 
  columns,
  data: unsortedData, 
  disableSort,
  controlled,
  sort, 
  ascending, 
  sortPath, 
  setSortPath, 
  setSortFunc,
  rowComponent,
}) {
  const data = (controlled || disableSort) ? unsortedData : sort(unsortedData)
  return (
    <table className={ classnames({ 'sortable-table': !disableSort }) }>
      <thead><tr>
        {
          columns.map((column, key) =>
            <Header {...{
              key,
              column,
              sortPath,
              ascending,
              onClick: () => {
                if (column.disabled) return
                const newSortPath = column.name
                const newSortFunc = column.sortFunc || null
                setSortPath(newSortPath)
                setSortFunc(newSortFunc)
              }
            }} />
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

const WrappedTable = sortable()(SortableTable)

// Passes relevant sortable props
function SortableTableWrapper ({ initialColumn, children, disableSort, disableReverse, onChange, ...rest }) {
  const columns = getColumnData(children, disableSort)
  const initialProps = columns.filter(col => col.name === initialColumn).pop()
  return <WrappedTable {...{
    // Sortable props
    initialSortPath: initialProps ? initialProps.name : '',
    initialSortFunc: initialProps ? initialProps.sortFunc : null,
    onChange,
    disableReverse,
    // Local props
    columns,
    disableSort,
    ...rest,
  }} />
}

SortableTableWrapper.propTypes = {
  initialColumn: PropTypes.string,
  children: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  disableSort: PropTypes.bool,
  disableReverse: PropTypes.bool,
  onChange: PropTypes.func,
  rowComponent: Types.component,
}

SortableTableWrapper.defaultProps = {
  initialColumn: '',
  disableSort: false,
  controlled: false,
  disableReverse: false,
  data: [],
  onChange: noop,
}

export default SortableTableWrapper
