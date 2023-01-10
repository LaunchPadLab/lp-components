import React from 'react'
import { storiesOf } from '@storybook/react'
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

storiesOf('Table', module)
  .add('default', () => (
    <Table data={tableData}>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </Table>
  ))
  .add('with custom labels', () => (
    <Table data={tableData}>
      <Column name="name" label="FIRST NAME" />
      <Column name="age" label="AGE" />
      <Column name="active" label="IS ACTIVE" />
    </Table>
  ))
  .add('with custom component', () => (
    <Table data={tableData}>
      <Column name="name" />
      <Column name="age" />
      <Column name="active" component={CustomCell} />
    </Table>
  ))
  .add('with caption', () => (
    <Table data={tableData} caption="Participant Attributes">
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </Table>
  ))
  .add('with customized caption', () => (
    <Table
      data={tableData}
      caption={<span className="custom-caption">Participant Attributes</span>}
    >
      <Column name="name" />
      <Column name="age" />
      <Column name="active" />
    </Table>
  ))
