import React from 'react'
import PropTypes from 'prop-types'
import { get } from '../../utils'
import { Types } from '../helpers'

const propTypes = {
  rowData: PropTypes.any,
  columns: PropTypes.arrayOf(Types.column).isRequired,
}

function TableRow ({
  rowData,
  columns,
}) {
  return (
    <tr>
      {
        columns.map((column, key ) => {
          const { name, component: CustomComponent } = column
          const value = get(name, rowData)
          return CustomComponent ?
            <CustomComponent { ...{ key, value } } />
          :
            <td { ...{ key } }>{ value }</td>
        })
      }
    </tr>
  )
}

TableRow.propTypes = propTypes

export default TableRow
