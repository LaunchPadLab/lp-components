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

export const Default = () => (
  <Table data={tableData}>
    <Column name="name" />
    <Column name="age" />
    <Column name="active" />
  </Table>
)

Default.story = {
  name: 'default',
}

export const WithCustomLabels = () => (
  <Table data={tableData}>
    <Column name="name" label="FIRST NAME" />
    <Column name="age" label="AGE" />
    <Column name="active" label="IS ACTIVE" />
  </Table>
)

WithCustomLabels.story = {
  name: 'with custom labels',
}

export const WithCustomComponent = () => (
  <Table data={tableData}>
    <Column name="name" />
    <Column name="age" />
    <Column name="active" component={CustomCell} />
  </Table>
)

WithCustomComponent.story = {
  name: 'with custom component',
}

export const WithCaption = () => (
  <Table data={tableData} caption="Participant Attributes">
    <Column name="name" />
    <Column name="age" />
    <Column name="active" />
  </Table>
)

WithCaption.story = {
  name: 'with caption',
}

export const WithCustomizedCaption = () => (
  <Table
    data={tableData}
    caption={<span className="custom-caption">Participant Attributes</span>}
  >
    <Column name="name" />
    <Column name="age" />
    <Column name="active" />
  </Table>
)

WithCustomizedCaption.story = {
  name: 'with customized caption',
}
