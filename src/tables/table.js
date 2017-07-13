import React from 'react'
import SortableTable from './sortable-table'

function Table (props) {
 return <SortableTable { ...props } disableSort />
}

export default Table
