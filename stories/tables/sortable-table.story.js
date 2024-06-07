import React from 'react'
import { lowerCase } from 'lodash'
import { SortableTable, TableColumn as Column, compareAtPath } from 'src'

const tableData = [
  { name: 'Kim', age: 45, active: 'yes' },
  { name: 'Tommy', age: 5, active: 'no' },
  { name: 'Lorax', age: 450, active: 'yes' },
]

function colorForStatus(active) {
  return active === 'yes' ? 'green' : 'red'
}

// eslint-disable-next-line react/prop-types
function CustomCell({ value }) {
  return <td style={{ color: colorForStatus(value) }}>{value}</td>
}

function CustomCellWithRowData({ data: { name, active } }) {
  const checkIfActive = (active) => {
    if (active === 'yes') return 'active'
    return 'not active'
  }
  return (
    <td style={{ color: colorForStatus(active) }}>
      {name} is {checkIfActive(active)}
    </td>
  )
}

// eslint-disable-next-line react/prop-types
function CustomRow({ data: { active }, children }) {
  return <tr style={{ backgroundColor: colorForStatus(active) }}>{children}</tr>
}

// eslint-disable-next-line react/prop-types
function CustomHeader({ column: { name }, onClick }) {
  return <th onClick={onClick}>{name.toUpperCase() + '!'}</th>
}

function createCustomValue(data) {
  return `${data.name}:${data.age}`
}

function compareCustomValue(a, b) {
  const ageA = Number(a)
  const ageB = Number(b)

  return ageA > ageB ? 1 : -1
}

export default {
  title: 'SortableTable',
}

export const Default = {
  render: () => (
    <SortableTable data={tableData}>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </SortableTable>
  ),

  name: 'default',
}

export const WithInitialColumn = {
  render: () => (
    <div>
      <h2> Table is sorted by "age" by default. </h2>
      <SortableTable data={tableData} initialColumn="age">
        <Column name="name" />
        <Column name="age" />
        <Column name="active" />
      </SortableTable>
    </div>
  ),

  name: 'with initial column',
}

export const WithInitialColumnSortedDescending = {
  render: () => (
    <div>
      <h2> Table is sorted (descending) by "age" by default. </h2>
      <SortableTable
        data={tableData}
        initialColumn="age"
        initialAscending={false}
      >
        <Column name="name" />
        <Column name="age" />
        <Column name="active" />
      </SortableTable>
    </div>
  ),

  name: 'with initial column sorted descending',
}

export const WithCustomLabels = {
  render: () => (
    <SortableTable data={tableData}>
      <Column name="name" label="FIRST NAME" />
      <Column name="age" label="AGE" />
      <Column name="active" label="IS ACTIVE" />
    </SortableTable>
  ),

  name: 'with custom labels',
}

export const WithCustomCellComponent = {
  render: () => (
    <SortableTable data={tableData}>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" component={CustomCell} />
    </SortableTable>
  ),

  name: 'with custom cell component',
}

export const WithAdditionalValidDomPropertiesOnCellComponentPerColumn = {
  render: () => (
    <SortableTable data={tableData}>
      <Column name="name" tabIndex="-1" />
      <Column name="age" data-cy="age" />
      <Column name="active" aria-label="Active" />
    </SortableTable>
  ),

  name: 'with additional valid DOM properties on cell component (per column)',
}

export const WithCustomCellComponentAndItsRowData = {
  render: () => (
    <SortableTable data={tableData}>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" component={CustomCellWithRowData} />
    </SortableTable>
  ),

  name: 'with custom cell component and its row data',
}

export const WithCustomRowComponent = {
  render: () => (
    <SortableTable data={tableData} rowComponent={CustomRow}>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </SortableTable>
  ),

  name: 'with custom row component',
}

export const WithCustomHeaderComponent = {
  render: () => (
    <SortableTable data={tableData} headerComponent={CustomHeader}>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </SortableTable>
  ),

  name: 'with custom header component',
}

export const WithColumnSpecificCustomHeaderComponent = {
  render: () => (
    <SortableTable data={tableData}>
      <Column name="name" headerComponent={CustomHeader} />
      <Column name="age" />
      <Column name="active" />
    </SortableTable>
  ),

  name: 'with column-specific custom header component',
}

export const WithDisabledColumn = {
  render: () => (
    <div>
      <h2> The "age" column is disabled and will not sort. </h2>
      <SortableTable data={tableData}>
        <Column name="name" />
        <Column name="age" disabled />
        <Column name="active" />
      </SortableTable>
    </div>
  ),

  name: 'with disabled column',
}

export const WithFormattedColumnValues = {
  render: () => (
    <SortableTable data={tableData}>
      <Column name="name" format={lowerCase} />
      <Column name="age" format={(val) => val.toFixed(1)} />
      <Column name="active" format={(val) => (val === 'yes' ? 'Y' : 'N')} />
    </SortableTable>
  ),

  name: 'with formatted column values',
}

export const WithCustomValueGetter = {
  render: () => (
    <div>
      <h2>"Name And Age" column combines name and age values</h2>
      <SortableTable data={tableData}>
        <Column name="name" format={lowerCase} />
        <Column name="age" format={(val) => val.toFixed(1)} />
        <Column name="active" format={(val) => (val === 'yes' ? 'Y' : 'N')} />
        <Column name="nameAndAge" valueGetter={createCustomValue} />
      </SortableTable>
    </div>
  ),

  name: 'with custom value getter',
}

export const WithCustomValueGetterAndCustomSorter = {
  render: () => (
    <div>
      <h2>
        "Name and Age" column combines name and age, sorted by age portion
      </h2>
      <SortableTable data={tableData}>
        <Column name="name" format={lowerCase} />
        <Column name="age" format={(val) => val.toFixed(1)} />
        <Column name="active" format={(val) => (val === 'yes' ? 'Y' : 'N')} />
        <Column
          name="nameAndAge"
          sortFunc={compareAtPath('age', compareCustomValue)}
          valueGetter={createCustomValue}
        />
      </SortableTable>
    </div>
  ),

  name: 'with custom value getter and custom sorter',
}

export const WithCustomValueGetterCustomSorterInitialColumn = {
  render: () => (
    <div>
      <h2>
        "Name and Age" column combines name and age, sorted by age portion,
        initial column
      </h2>
      <SortableTable data={tableData} initialColumn="nameAndAge">
        <Column name="name" format={lowerCase} />
        <Column name="age" format={(val) => val.toFixed(1)} />
        <Column name="active" format={(val) => (val === 'yes' ? 'Y' : 'N')} />
        <Column
          name="nameAndAge"
          sortFunc={compareAtPath('age', compareCustomValue)}
          valueGetter={createCustomValue}
        />
      </SortableTable>
    </div>
  ),

  name: 'with custom value getter, custom sorter, initial column',
}
