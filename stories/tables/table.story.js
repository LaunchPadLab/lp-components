import React from 'react'
import { Table, TableColumn as Column } from 'src'

const tableData = [
  { name: 'Kim', age: 45, active: 'yes' },
  { name: 'Tommy', age: 5, active: 'no' },
  { name: 'Lorax', age: 450, active: 'yes' },
]

// eslint-disable-next-line react/prop-types
function CustomCell({ value }) {
  const color = value === 'yes' ? 'green' : 'red'
  return <td style={{ color }}>{value}</td>
}

export default {
  title: 'Table',
}

export const Default = {
  render: () => (
    <Table data={tableData}>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </Table>
  ),

  name: 'default',
}

export const WithCustomLabels = {
  render: () => (
    <Table data={tableData}>
      <Column name="name" label="FIRST NAME" />
      <Column name="age" label="AGE" />
      <Column name="active" label="IS ACTIVE" />
    </Table>
  ),

  name: 'with custom labels',
}

export const WithCustomComponent = {
  render: () => (
    <Table data={tableData}>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" component={CustomCell} />
    </Table>
  ),

  name: 'with custom component',
}

export const WithCaption = {
  render: () => (
    <Table data={tableData} caption="Participant Attributes">
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </Table>
  ),

  name: 'with caption',
}

export const WithCustomizedCaption = {
  render: () => (
    <Table
      data={tableData}
      caption={<span className="custom-caption">Participant Attributes</span>}
    >
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </Table>
  ),

  name: 'with customized caption',
}
