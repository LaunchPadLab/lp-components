import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { sortable, sortablePropTypes } from '../utils'
import { getColumnData } from './helpers'
import { TableHeader as Header, TableRow as Row } from './components' 
import classnames from 'classnames'

const propTypes = {
  ...sortablePropTypes,
  data: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node.isRequired,
  disableSort: PropTypes.bool,
}

const defaultProps = {
  data: [],
  disableSort: false,
}

function SortableTable ({ 
  data: unsortedData, 
  sort, 
  ascending, 
  sortPath, 
  setSortPath, 
  setSortFunc, 
  children, 
  disableSort,
}) {
  const columns = getColumnData(children, disableSort)
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

function SortableTableWrapper ({ sortPath, ...rest }) {
  // Add initial sortPath
  const WrappedTable = compose(
    sortable({ sortPath })
  )(SortableTable)
  return <WrappedTable { ...rest } />
}

SortableTableWrapper.propTypes = {
  sortPath: PropTypes.string,
}

export default SortableTableWrapper
