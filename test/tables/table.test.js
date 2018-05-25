import React from 'react'
import { mount } from 'enzyme'
import { Table, TableColumn as Column } from '../../src/'

const tableData = [
  { name: 'Kim' },
  { name: 'Tommy' },
  { name: 'Lorax' },
]

test('Table does not sort data', () => {
  const wrapper = mount(
    <Table data={ tableData }>
      <Column name="name"/>
    </Table>
  )
  wrapper.find('th').first().simulate('click')
  // Data remains unsorted
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Lorax')
})
