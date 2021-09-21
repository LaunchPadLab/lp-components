import React from 'react'
import { mount } from 'enzyme'
import { lowerCase } from 'lodash'
import { SortableTable, TableColumn as Column, compareAtPath } from '../../src/'

const tableData = [
  { name: 'Kim', test: true },
  { name: 'Tommy' },
  { name: 'Lorax' },
]

const sortAscending = (a, b) => (a > b) ? 1 : -1

test('Column data is pulled out via name', () => {
  const wrapper = mount(
    <SortableTable data={tableData}>
      <Column name="name" />
    </SortableTable>
  )
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Lorax')
})

test('Columns without props are ignored', () => {
  const wrapper = mount(
    <SortableTable data={tableData}>
      <Column name="name" />
      {false}
    </SortableTable>
  )
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Lorax')
})

test('Clicking on column header changes sortPath', () => {
  const wrapper = mount(
    <SortableTable data={tableData}>
      <Column name="name" />
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
    <SortableTable data={tableData} onChange={onChange}>
      <Column name="name" />
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  expect(onChange).toHaveBeenCalledWith({ ascending: true, sortPath: 'name', sortFunc: null })
})


test('Clicking on column header twice toggles ascending', () => {
  const wrapper = mount(
    <SortableTable data={tableData}>
      <Column name="name" />
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
    <SortableTable data={tableData}>
      <Column name="name" disabled />
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  // Data remains unsorted
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Lorax')
})

test('disableSort disables all columns', () => {
  const wrapper = mount(
    <SortableTable data={tableData} disableSort>
      <Column name="name" />
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  // Data remains unsorted
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Lorax')
})

test('controlled disables all columns', () => {
  const wrapper = mount(
    <SortableTable data={tableData} controlled>
      <Column name="name" />
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  // Data remains unsorted
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Lorax')
})

test('column can have custom label', () => {
  const wrapper = mount(
    <SortableTable data={tableData}>
      <Column name="name" label="FOO" />
    </SortableTable>
  )
  expect(wrapper.find('th').first().text()).toEqual('FOO')
})

test('column can have custom sort function', () => {
  const mySort = jest.fn(compareAtPath('name', sortAscending))
  const wrapper = mount(
    <SortableTable data={tableData}>
      <Column name="name" sortFunc={mySort} />
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  expect(mySort).toHaveBeenCalled()
})

test('column can have custom className', () => {
  const wrapper = mount(
    <SortableTable data={tableData}>
      <Column name="name" className="foo" />
    </SortableTable>
  )
  expect(wrapper.find('td.foo').exists()).toBe(true)
})

test('column can have custom cell component', () => {
  const MyCell = () => <td> Hi! </td>
  const wrapper = mount(
    <SortableTable data={tableData}>
      <Column name="name" component={MyCell} />
    </SortableTable>
  )
  expect(wrapper.find(MyCell).exists()).toBe(true)
  const expectedProps = {
    name: 'name',
    value: 'Kim',
    data: { name: 'Kim', test: true },
    disabled: false,
  }
  expect(wrapper.find(MyCell).first().props()).toMatchObject(expectedProps)
})

test('table can have custom row component initialized with table state props', () => {
  const MyRow = ({ children }) => <tr>{children}</tr> // eslint-disable-line
  const mySort = jest.fn(compareAtPath('name', sortAscending))
  const myValueGetter = jest.fn((data) => data.name.toUpperCase())
  const wrapper = mount(
    <SortableTable
      data={tableData}
      rowComponent={MyRow}
      initialAscending={false}
      initialColumn={'name'}
    >
      <Column name="name" sortFunc={mySort} valueGetter={myValueGetter} />
    </SortableTable>
  )
  expect(wrapper.find(MyRow).exists()).toBe(true)
  const expectedProps = {
    data: { name: 'Tommy'},
    ascending: false,
    sortPath: 'name',
    sortFunc: mySort,
    valueGetter: myValueGetter,
  }
  expect(wrapper.find(MyRow).first().props()).toMatchObject(expectedProps)
})

test('column can have custom header component', () => {
  const MyHeader = ({ column: { name } }) => <th>{name}</th> // eslint-disable-line
  const wrapper = mount(
    <SortableTable data={tableData} headerComponent={MyHeader}>
      <Column name="name" />
      <Column name="date" />
    </SortableTable>
  )
  expect(wrapper.find(MyHeader).exists()).toBe(true)
  expect(wrapper.find(MyHeader).length).toEqual(2)
  expect(wrapper.find(MyHeader).first().props().column.name).toEqual('name')
  expect(wrapper.find(MyHeader).last().props().column.name).toEqual('date')
})

test('column can have a column-specific custom header component', () => {
  const MyHeader = ({ column: { name } }) => <th>{name}</th> // eslint-disable-line
  const wrapper = mount(
    <SortableTable data={tableData}>
      <Column name="name" headerComponent={MyHeader} />
      <Column name="date" />
    </SortableTable>
  )
  expect(wrapper.find(MyHeader).exists()).toBe(true)
  expect(wrapper.find(MyHeader).length).toEqual(1)
  expect(wrapper.find(MyHeader).first().props().column.name).toEqual('name')
})

test('initialColumn determines inital sortPath and sortFunc', () => {
  const mySort = jest.fn(compareAtPath('name', sortAscending))
  const wrapper = mount(
    <SortableTable data={tableData} initialColumn="name">
      <Column name="name" sortFunc={mySort} />
    </SortableTable>
  )
  // Data should now be sorted by name
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  expect(wrapper.find('td').last().text()).toEqual('Tommy')
  expect(mySort).toHaveBeenCalled()
})

test('initialColumn can be default sorted descending', () => {
  const wrapper = mount(
    <SortableTable
      data={tableData}
      initialColumn="name"
      initialAscending={false}
    >
      <Column name="name" />
    </SortableTable>
  )
  // Data should now be sorted, descending, by name
  expect(wrapper.find('td').first().text()).toEqual('Tommy')
  expect(wrapper.find('td').last().text()).toEqual('Kim')
})

test('`onClick` function is called on correct column cells', () => {
  const onClick = jest.fn()
  const wrapper = mount(
    <SortableTable data={tableData} initialColumn="name">
      <Column name="name" onClick={onClick} className="click" />
      <Column name="city" className="no-click" />
    </SortableTable>
  )

  wrapper.find('td.no-click').last().simulate('click')
  expect(onClick).not.toHaveBeenCalled()

  wrapper.find('td.click').first().simulate('click')
  expect(onClick).toHaveBeenCalledWith({ name: 'Kim', test: true })
})

test('`format` updates the cell value', () => {
  const format = jest.fn(lowerCase)
  const wrapper = mount(
    <SortableTable data={tableData} initialColumn="name">
      <Column name="name" format={format} />
    </SortableTable>
  )
  expect(wrapper.find('td').first().text()).toEqual('kim')
  expect(wrapper.find('td').last().text()).toEqual('tommy')
  expect(format).toHaveBeenCalled()
})

test('`placeholder` option is displayed if value is `null` or `undefined`', () => {
  const data = [
    { name: null },
    { name: undefined },
  ]
  const wrapper = mount(
    <SortableTable data={data}>
      <Column name="name" placeholder="placeholder" />
    </SortableTable>
  )
  expect(wrapper.find('td').first().text()).toEqual('placeholder')
  expect(wrapper.find('td').last().text()).toEqual('placeholder')
})

test('can recieve custom class name', () => {
  const data = [
    { name: null },
    { name: undefined },
  ]
  const wrapper = mount(
    <SortableTable data={data} className="foo">
      <Column name="name" placeholder="placeholder" />
    </SortableTable>
  )
  expect(wrapper.find('table.foo').exists()).toBe(true)
})

test('`valueGetter` derives the cell value', () => {
  const data = [
    { name: 'Opportunity 1', accountName: 'Dealer 1' },
    { name: 'Opportunity 2', accountName: 'Dealer 2' },
  ]
  const myValueGetter = jest.fn((data) => `${data.name} - ${data.accountName}`)
  const wrapper = mount(
    <SortableTable data={data} >
      <Column name="opportunityName" valueGetter={myValueGetter} />
    </SortableTable>
  )
  expect(wrapper.find('td').first().text()).toEqual('Opportunity 1 - Dealer 1')
  expect(wrapper.find('td').last().text()).toEqual('Opportunity 2 - Dealer 2')
  expect(myValueGetter).toHaveBeenCalled()
})

test('`valueGetter` can utilize the default sort', () => {
  const data = [
    { name: 'Opportunity 2', accountName: 'Dealer 2' },
    { name: 'Opportunity 1', accountName: 'Dealer 1' },
  ]
  const myValueGetter = jest.fn((data) => `${data.name} - ${data.accountName}`)
  const wrapper = mount(
    <SortableTable data={data} >
      <Column name="opportunityName" valueGetter={myValueGetter} />
    </SortableTable>
  )
  wrapper.find('th').first().simulate('click')
  // Data should now be sorted by derived data values
  expect(wrapper.find('td').first().text()).toEqual('Opportunity 1 - Dealer 1')
  expect(wrapper.find('td').last().text()).toEqual('Opportunity 2 - Dealer 2')

  expect(myValueGetter).toHaveBeenCalled()
})

test('`valueGetter` column can be the initial column and is sorted ascending', () => {
  const data = [
    { name: 'Opportunity 2', accountName: 'Dealer 2' },
    { name: 'Opportunity 1', accountName: 'Dealer 1' },
  ]
  const myValueGetter = jest.fn((data) => `${data.name} - ${data.accountName}`)
  const wrapper = mount(
    <SortableTable data={data} initialColumn="opportunityName">
      <Column name="opportunityName" valueGetter={myValueGetter} />
      <Column name="accountName" />
      <Column name="name" />
    </SortableTable>
  )
  expect(wrapper.find('td').first().text()).toEqual('Opportunity 1 - Dealer 1')
  expect(myValueGetter).toHaveBeenCalled()
})

test('table data is updated when data prop changes', () => {
  const newTableData = [{ name: 'Kortney' }]
  const wrapper = mount(
    <SortableTable data={tableData}>
      <Column name="name" />
    </SortableTable>
  )
  expect(wrapper.find('td').first().text()).toEqual('Kim')
  wrapper.setProps({ data: newTableData })
  expect(wrapper.find('td').first().text()).toEqual('Kortney')
})

test('arbitrary props passed to table element', () => {
  const wrapper = mount(
    <SortableTable data={tableData} aria-label="Annual Report">
      <Column name="name" />
    </SortableTable>
  )
  expect(wrapper.find('table').first().prop('aria-label')).toEqual('Annual Report')
})

test('invalid arbitrary props filtered out', () => {
  const wrapper = mount(
    <SortableTable data={tableData} aria-label="Annual Report" invalidProp="shouldFail">
      <Column name="name" />
    </SortableTable>
  )
  expect(wrapper.find('table').first().prop('invalidProp')).toBe(undefined)
})
