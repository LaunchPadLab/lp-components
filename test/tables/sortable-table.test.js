import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mount } from 'enzyme'
import { lowerCase } from 'lodash'
import { SortableTable, TableColumn as Column, compareAtPath } from '../../src/'

const tableData = [
  { name: 'Kim', test: true },
  { name: 'Tommy' },
  { name: 'Lorax' },
]

const sortAscending = (a, b) => (a > b ? 1 : -1)

describe('SortableTable', () => {
  test('Column data is pulled out via name', () => {
    render(
      <SortableTable data={tableData}>
        <Column name="name" />
      </SortableTable>
    )
    expect(screen.getByText('Kim')).toBeInTheDocument()
    expect(screen.getByText('Tommy')).toBeInTheDocument()
    expect(screen.getByText('Lorax')).toBeInTheDocument()
  })

  test('Columns without props are ignored', () => {
    render(
      <SortableTable data={tableData}>
        <Column name="name" />
        {false}
      </SortableTable>
    )
    const cells = screen.getAllByRole('cell')
    expect(cells.at(0).textContent).toEqual('Kim')
    expect(cells.at(-1).textContent).toEqual('Lorax')
  })

  test('Clicking on column header changes sortPath', async () => {
    const user = userEvent.setup()
    render(
      <SortableTable data={tableData}>
        <Column name="name" />
      </SortableTable>
    )
    await user.click(screen.getByRole('columnheader'))
    const cells = screen.getAllByRole('cell')
    // Data should now be sorted by name
    expect(cells.at(0).textContent).toEqual('Kim')
    expect(cells.at(-1).textContent).toEqual('Tommy')
  })

  test('onChange is fired when sorting state changes', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()

    render(
      <SortableTable data={tableData} onChange={onChange}>
        <Column name="name" />
      </SortableTable>
    )

    await user.click(screen.getByRole('columnheader'))
    expect(onChange).toHaveBeenCalledWith({
      ascending: true,
      sortPath: 'name',
      sortFunc: null,
    })
  })

  test('Clicking on column header twice toggles ascending', async () => {
    const user = userEvent.setup()
    render(
      <SortableTable data={tableData}>
        <Column name="name" />
      </SortableTable>
    )
    const header = screen.getByRole('columnheader')
    await user.click(header)
    await user.click(header)

    const cells = screen.getAllByRole('cell')
    // Data should now be sorted descending by name
    expect(cells.at(0).textContent).toEqual('Tommy')
    expect(cells.at(-1).textContent).toEqual('Kim')
  })

  test('Clicking on disabled column header does nothing', async () => {
    const user = userEvent.setup()
    render(
      <SortableTable data={tableData}>
        <Column name="name" disabled />
      </SortableTable>
    )
    await user.click(screen.getByRole('columnheader'))
    const cells = screen.getAllByRole('cell')
    // Data remains unsorted
    expect(cells.at(0).textContent).toEqual('Kim')
    expect(cells.at(-1).textContent).toEqual('Lorax')
  })

  test('`disableSort` disables all columns', async () => {
    const user = userEvent.setup()
    render(
      <SortableTable data={tableData} disableSort>
        <Column name="name" />
      </SortableTable>
    )
    await user.click(screen.getByRole('columnheader'))
    const cells = screen.getAllByRole('cell')
    // Data remains unsorted
    expect(cells.at(0).textContent).toEqual('Kim')
    expect(cells.at(-1).textContent).toEqual('Lorax')
  })

  test('`controlled` disables all columns', async () => {
    const user = userEvent.setup()
    render(
      <SortableTable data={tableData} controlled>
        <Column name="name" />
      </SortableTable>
    )
    await user.click(screen.getByRole('columnheader'))
    const cells = screen.getAllByRole('cell')
    // Data remains unsorted
    expect(cells.at(0).textContent).toEqual('Kim')
    expect(cells.at(-1).textContent).toEqual('Lorax')
  })

  test('Column can have custom label', () => {
    render(
      <SortableTable data={tableData}>
        <Column name="name" label="FOO" />
      </SortableTable>
    )
    expect(screen.getByRole('columnheader', { name: 'FOO' })).toBeInTheDocument()
  })

  test('Column can have custom sort function', async () => {
    const mySort = jest.fn(compareAtPath('name', sortAscending))
    const user = userEvent.setup()
    render(
      <SortableTable data={tableData}>
        <Column name="name" sortFunc={mySort} />
      </SortableTable>
    )
    await user.click(screen.getByRole('columnheader'))
    expect(mySort).toHaveBeenCalled()
  })

  test('Column can have custom className', () => {
    render(
      <SortableTable data={tableData}>
        <Column name="name" className="foo" />
      </SortableTable>
    )
    expect(screen.getAllByRole('cell').at(0)).toHaveClass('foo')
  })

  test('Column can have custom cell component', () => {
    const MyCell = ({ value }) => <td>Person: {value}</td>
    render(
      <SortableTable data={tableData}>
        <Column name="name" component={MyCell} />
      </SortableTable>
    )
    expect(screen.getByText('Person: Kim')).toBeInTheDocument()
    expect(screen.queryByText(/^Kim$/)).not.toBeInTheDocument()
  })

  test.skip('Table can have custom row component initialized with table state props', () => {
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
      data: { name: 'Tommy' },
      ascending: false,
      sortPath: 'name',
      sortFunc: mySort,
      valueGetter: myValueGetter,
    }
    expect(wrapper.find(MyRow).first().props()).toMatchObject(expectedProps)
  })

  test('Column can have custom header component', () => {
    const MyHeader = ({ column: { name } }) => <th data-testid={`h-${name}`}>{name}</th> // eslint-disable-line
    render(
      <SortableTable data={tableData} headerComponent={MyHeader}>
        <Column name="name" />
        <Column name="date" />
      </SortableTable>
    )
    expect(screen.getByTestId('h-name')).toBeInTheDocument()
    expect(screen.getByTestId('h-date')).toBeInTheDocument()
  })

  test('Column can have a column-specific custom header component', () => {
    const MyHeader = ({ column: { name } }) => <th data-testid={`h-${name}`}>{name}</th> // eslint-disable-line
    render(
      <SortableTable data={tableData}>
        <Column name="name" headerComponent={MyHeader} />
        <Column name="date" />
      </SortableTable>
    )
    expect(screen.getByTestId('h-name')).toBeInTheDocument()
    expect(screen.queryByTestId('h-date')).not.toBeInTheDocument()
  })

  test('`initialColumn` determines initial sortPath and sortFunc', () => {
    const mySort = jest.fn(compareAtPath('name', sortAscending))
    render(
      <SortableTable data={tableData} initialColumn="name">
        <Column name="name" sortFunc={mySort} />
      </SortableTable>
    )
    const cells = screen.getAllByRole('cell')
    // Data should now be sorted by name
    expect(cells.at(0).textContent).toEqual('Kim')
    expect(cells.at(-1).textContent).toEqual('Tommy')
    expect(mySort).toHaveBeenCalled()
  })

  test('`initialColumn` can be default sorted descending', () => {
    render(
      <SortableTable
        data={tableData}
        initialColumn="name"
        initialAscending={false}
      >
        <Column name="name" />
      </SortableTable>
    )
    const cells = screen.getAllByRole('cell')
    // Data should now be sorted, descending, by name
    expect(cells.at(0).textContent).toEqual('Tommy')
    expect(cells.at(-1).textContent).toEqual('Kim')
  })

  test('`onClick` function is called on correct column cells', async () => {
    const onClick = jest.fn()
    const user = userEvent.setup()
    render(
      <SortableTable data={tableData} initialColumn="name">
        <Column name="name" onClick={onClick} />
        <Column name="city" />
      </SortableTable>
    )
    const cells = screen.getAllByRole('cell')
    await user.click(cells.at(1))
    expect(onClick).not.toHaveBeenCalled()

    await user.click(cells.at(0))
    expect(onClick).toHaveBeenCalledWith({ name: 'Kim', test: true })
  })

  test('`format` updates the cell value', () => {
    const format = jest.fn(lowerCase)
    render(
      <SortableTable data={tableData} initialColumn="name">
        <Column name="name" format={format} />
      </SortableTable>
    )
    const cells = screen.getAllByRole('cell')
    expect(cells.at(0).textContent).toEqual('kim')
    expect(cells.at(-1).textContent).toEqual('tommy')
    expect(format).toHaveBeenCalled()
  })

  test('`placeholder` option is displayed if value is `null` or `undefined`', () => {
    const data = [{ name: null }, { name: undefined }]
    render(
      <SortableTable data={data}>
        <Column name="name" placeholder="placeholder" />
      </SortableTable>
    )
    expect(screen.getAllByRole('cell', { name: 'placeholder' }).length).toEqual(data.length)
  })

  test('Can receive custom class name', () => {
    const data = [{ name: null }, { name: undefined }]
    render(
      <SortableTable data={data} className="foo">
        <Column name="name" placeholder="placeholder" />
      </SortableTable>
    )
    expect(screen.getByRole('table')).toHaveClass('sortable-table', 'foo')
  })

  test('`valueGetter` derives the cell value', () => {
    const data = [
      { name: 'Opportunity 1', accountName: 'Dealer 1' },
      { name: 'Opportunity 2', accountName: 'Dealer 2' },
    ]
    const myValueGetter = jest.fn((data) => `${data.name} - ${data.accountName}`)
    const wrapper = mount(
      <SortableTable data={data}>
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
      <SortableTable data={data}>
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

  test('Table data is updated when data prop changes', () => {
    const { rerender } = render(
      <SortableTable data={tableData}>
        <Column name="name" />
      </SortableTable>
    )
    expect(screen.getAllByRole('cell').at(0).textContent).toEqual('Kim')
    rerender(
      <SortableTable data={[{ name: 'Kortney' }]}>
        <Column name="name" />
      </SortableTable>
    )
    expect(screen.getAllByRole('cell').at(0).textContent).toEqual('Kortney')
  })

  test('Valid arbitrary props are passed to table element', () => {
    render(
      <SortableTable data={tableData} aria-label="Annual Report">
        <Column name="name" />
      </SortableTable>
    )
    expect(screen.getByRole('table')).toHaveAttribute('aria-label', 'Annual Report')
  })

  test('Invalid arbitrary props are filtered out', () => {
    render(
      <SortableTable
        data={tableData}
        aria-label="Annual Report"
        invalidProp="shouldFail"
      >
        <Column name="name" />
      </SortableTable>
    )
    expect(screen.getByRole('table')).not.toHaveAttribute('invalidProp')
  })

  test('Passes valid DOM props to cells', () => {
    render(
      <SortableTable data={tableData}>
        <Column name="name" data-cy="name" />
      </SortableTable>
    )
    expect(screen.getAllByRole('cell').at(0)).toHaveAttribute('data-cy', 'name')
  })

  test('Does not pass invalid DOM props to cells', () => {
    render(
      <SortableTable data={tableData}>
        <Column name="name" customAttribute="custom" />
      </SortableTable>
    )
    expect(screen.getAllByRole('cell').at(0)).not.toHaveAttribute('customAttribute')
  })

  test('Does not render a caption element by default', () => {
    render(
      <SortableTable data={tableData}>
        <Column name="name" />
      </SortableTable>
    )
    const table = screen.getByRole('table')
    expect(table.firstChild.tagName).not.toEqual('CAPTION')
  })

  test('Renders a caption element when provided as the first descendant', () => {
    render(
      <SortableTable data={tableData} caption="My Table">
        <Column name="name" />
      </SortableTable>
    )
    const table = screen.getByRole('table', { name: 'My Table' })
    expect(table.firstChild.tagName).toEqual('CAPTION')
  })

  test('Renders a caption element with whatever is provided', () => {
    render(
      <SortableTable
        data={tableData}
        caption={<span className="custom-caption">My Table</span>}
      >
        <Column name="name" />
      </SortableTable>
    )
    expect(screen.getByText('My Table')).toHaveClass('custom-caption')
  })
})
