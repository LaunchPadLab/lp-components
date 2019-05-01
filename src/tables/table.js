import React from 'react'
import SortableTable from './sortable-table'

/**
 * A component for displaying data in a table.
 * This component's behavior is largely determined by the {@link TableColumn} components that are passed to it.
 * 
 * @name Table
 * @type Function
 * @param {Array} [data=[]] - An array of objects to display in the table- one object per row
 * @example
 * 
 * function PersonTable ({ people }) {
 *   return (
 *     <Table data={ people }>
 *       <TableColumn name="name" />
 *       <TableColumn name="age" label="Years alive" />
 *       <TableColumn name="status" component={ StatusCell } />
 *     </Table>
 *   )
 * }
 */

function Table (props) {
 return <SortableTable {...{ ...props, disableSort: true }} />
}

export default Table
