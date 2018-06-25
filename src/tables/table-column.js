import { columnPropTypes } from './helpers'

/**
 * A component used to pass column information to a {@link Table} or {@link SortableTable}.
 * 
 * @name TableColumn
 * @type Function
 * @param {String} name - The key of the value to display in the column from each data object
 * @param {String} [label] - The text that will be displayed in the column header. Defaults to `name`.
 * @param {Function} [sortFunc] - The function that will be used to sort the table data when the column is selected
 * @param {Function} [component] - A custom cell component for the column. Will be passed the `key`, `name`, `value` and `data` for the row.
 * @param {Function} [onClick] - A function that will be called `onClick` on every cell in the column
 * @param {Function} [format] - A function that formats the value displayed in each cell in the column
 * @param {Boolean} [disabled] - A flag that disables sorting for the column
 * @example
 * 
 * function PersonTable ({ people }) {
 *   return (
 *     <SortableTable data={ people } initialColumn="name">
 *       <TableColumn name="name" />
 *       <TableColumn name="age" label="Years alive" disabled />
 *       <TableColumn name="status" component={ StatusCell } />
 *     </SortableTable>
 *   )
 * }
**/

const propTypes = {
  ...columnPropTypes
}

// This component isn't rendered - it's simply used as a way to
// pass column information to SortableTable.

function TableColumn () {
  return null
}

TableColumn.propTypes = propTypes

export default TableColumn
