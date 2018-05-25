import React from 'react'
import { mount } from 'enzyme'
import { SortableTable, TableColumn as Column, compareAtPath } from '../../src/'

const tableData = [
  { name: 'Kim', test: true },
  { name: 'Tommy' },
  { name: 'Lorax' },
]

const sortAscending = (a, b) => (a > b) ? 1 : -1

test('Column data is pulled out via name', () => {
  const wrapper = mount(
    <SortableTable data={ tableData }>
      <Column name="name"/>
    </SortableTable>
  )
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Lorax')
})

test('Clicking on column header changes sortPath', () => {
  const wrapper = mount(
    <SortableTable data={ tableData }>
      <Column name="name"/>
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  // Data should now be sorted by name
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Tommy')
})

test('onChange is fired when sorting state changes', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <SortableTable data={ tableData } onChange={ onChange }>
      <Column name="name"/>
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  expect(onChange).toHaveBeenCalledWith({ ascending: true, sortPath: 'name', sortFunc: null })
})


test('Clicking on column header twice toggles ascending', () => {
  const wrapper = mount(
    <SortableTable data={ tableData }>
      <Column name="name"/>
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  wrapper.find('th').first().simulate('click')
  // Data should now be sorted descending by name
  expect(wrapper.find('td').first().text()).toEqual('Tommy')
  expect(wrapper.find('td').last().text()).toEqual('Kim')
})

test('Clicking on disabled column header does nothing', () => {
  const wrapper = mount(
    <SortableTable data={ tableData }>
      <Column name="name" disabled/>
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  // Data remains unsorted
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Lorax')
})

test('disableSort disables all columns', () => {
  const wrapper = mount(
    <SortableTable data={ tableData } disableSort>
      <Column name="name"/>
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  // Data remains unsorted
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Lorax')
})

test('controlled disables all columns', () => {
  const wrapper = mount(
    <SortableTable data={ tableData } controlled>
      <Column name="name"/>
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  // Data remains unsorted
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Lorax')
})

test('column can have custom label', () => {
  const wrapper = mount(
    <SortableTable data={ tableData }>
      <Column name="name" label="FOO"/>
    </SortableTable>
  )
  expect(wrapper.find('th').first().text()).toEqual('FOO')
})

test('column can have custom sort function', () => {
  const mySort = jest.fn(compareAtPath('name', sortAscending))
  const wrapper = mount(
    <SortableTable data={ tableData }>
      <Column name="name" sortFunc={ mySort }/>
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  expect(mySort).toHaveBeenCalled()
})

test('column can have custom cell component', () => {
  const MyCell = () => <td> Hi! </td> 
  const wrapper = mount(
    <SortableTable data={ tableData }>
      <Column name="name" component={ MyCell }/>
    </SortableTable>
  )
  expect(wrapper.find(MyCell).exists()).toEqual(true)
  const expectedProps = {
    name: 'name',
    value: 'Kim',
    data: { name: 'Kim', test: true },
    disabled: false,
  }
  expect(wrapper.find(MyCell).first().props()).toEqual(expectedProps)
})

test('column can have custom row component', () => {
  const MyRow = ({ children }) => <tr>{ children }</tr> // eslint-disable-line
  const wrapper = mount(
    <SortableTable data={ tableData } rowComponent={ MyRow }>
      <Column name="name"/>
    </SortableTable>
  )
  expect(wrapper.find(MyRow).exists()).toEqual(true)
  expect(wrapper.find(MyRow).first().props().data).toEqual({ name: 'Kim', test: true })
})

test('initialColumn determines inital sortPath and sortFunc', () => {
  const mySort = jest.fn(compareAtPath('name', sortAscending))
  const wrapper = mount(
    <SortableTable data={ tableData } initialColumn="name">
      <Column name="name" sortFunc={ mySort }/>
    </SortableTable>
  )
  // Data should now be sorted by name
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Tommy')
  expect(mySort).toHaveBeenCalled()
})
