import React from 'react'
import PropTypes from 'prop-types'
import { sortable, sortablePropTypes } from '../utils'
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
 * @param {Boolean} [disableSort=false] - A flag to disable sorting on all columns
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
  ...sortablePropTypes,
}

const defaultProps = {}

function SortableTable ({ 
  columns,
  data: unsortedData, 
  disableSort,
  sort, 
  ascending, 
  sortPath, 
  setSortPath, 
  setSortFunc, 
}) {
  const data = disableSort ? unsortedData : sort(unsortedData)
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
                setSortPath(column.name)
                setSortFunc(column.sortFunc || null)
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
            }} />
          )
        }
      </tbody>
    </table>
  )
}

SortableTable.propTypes = propTypes
SortableTable.defaultProps = defaultProps

// Wraps SortableTable in sortable HOC
function SortableTableWrapper ({ initialColumn, children, disableSort, data }) {
  const columns = getColumnData(children, disableSort)
  const initialProps = columns.filter(col => col.name === initialColumn).pop()
  const WrappedTable = sortable({ 
    sortPath: initialProps ? initialProps.name : null,
    sortFunc: initialProps ? initialProps.sortFunc : null,
  })(SortableTable)
  return <WrappedTable {...{ columns, data, disableSort }} />
}

SortableTableWrapper.propTypes = {
  initialColumn: PropTypes.string,
  children: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  disableSort: PropTypes.bool,
}

SortableTableWrapper.defaultProps = {
  initialColumn: '',
  disableSort: false,
  data: [],
}

export default SortableTableWrapper
