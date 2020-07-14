import React from 'react'
import { storiesOf } from '@storybook/react'
import { lowerCase } from 'lodash'
import { SortableTable, TableColumn as Column } from 'src'

const tableData = [
  { name: 'Kim', age: 45, active: 'yes' },
  { name: 'Tommy', age: 5, active: 'no' },
  { name: 'Lorax', age: 450, active: 'yes' },
]

function colorForStatus (active) {
  return active === 'yes' ? 'green' : 'red'
}

// eslint-disable-next-line react/prop-types
function CustomCell ({ value }) {
  return (
    <td style={{ color: colorForStatus(value) }}>{ value }</td>
  )
}

// eslint-disable-next-line react/prop-types
function CustomRow ({ data: { active }, children }) {
  return (
    <tr style={{ backgroundColor: colorForStatus(active) }}>{ children }</tr>
  )
}

// eslint-disable-next-line react/prop-types
function CustomHeader ({ column: { name } }) {
  return (
    <th>{ name.toUpperCase() + '!' }</th>
  )
}

function createCustomValue(data) {
  return `${data.name}:${data.age}`
}

storiesOf('SortableTable', module)
  .add('default', () => (
    <SortableTable data={ tableData }>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </SortableTable>
  ))
  .add('with initial column', () => (
    <div>
      <h2> Table is sorted by "age" by default. </h2>
      <SortableTable data={ tableData } initialColumn="age">
        <Column name="name" />
        <Column name="age"/>
        <Column name="active" />
      </SortableTable>
    </div>
  ))
  .add('with custom labels', () => (
    <SortableTable data={ tableData }>
      <Column name="name" label="FIRST NAME" />
      <Column name="age" label="AGE" />
      <Column name="active" label="IS ACTIVE" />
    </SortableTable>
  ))
  .add('with custom cell component', () => (
    <SortableTable data={ tableData }>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" component={ CustomCell } />
    </SortableTable>
  ))
  .add('with custom row component', () => (
    <SortableTable data={ tableData } rowComponent={ CustomRow }>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </SortableTable>
  ))
  .add('with custom header component', () => (
    <SortableTable data={ tableData } headerComponent={ CustomHeader }>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </SortableTable>
  ))
  .add('with column-specific custom header component', () => (
    <SortableTable data={ tableData }>
      <Column name="name" headerComponent={ CustomHeader } />
      <Column name="age" />
      <Column name="active" />
    </SortableTable>
  ))
  .add('with disabled column', () => (
    <div>
      <h2> The "age" column is disabled and will not sort. </h2>
      <SortableTable data={ tableData }>
        <Column name="name" />
        <Column name="age" disabled/>
        <Column name="active" />
      </SortableTable>
    </div>
  ))
  .add('with formatted column values', () => (
    <SortableTable data={ tableData }>
      <Column name="name" format={ lowerCase }/>
      <Column name="age" format={ val => val.toFixed(1) } />
      <Column name="active" format={ val => val === 'yes' ? 'Y' : 'N' } />
    </SortableTable>
  ))
  .add('with custom value getter', () => (
    <SortableTable data={ tableData }>
      <Column name="name" format={ lowerCase }/>
      <Column name="age" format={ val => val.toFixed(1) } />
      <Column name="active" format={ val => val === 'yes' ? 'Y' : 'N' } />
      <Column name="nameAndAge" valueGetter={createCustomValue} />
    </SortableTable>
  ))
