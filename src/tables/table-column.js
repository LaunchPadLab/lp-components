import { columnPropTypes } from './helpers'

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
