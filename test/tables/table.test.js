import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Table, TableColumn as Column } from '../../src/'

const tableData = [{ name: 'Kim' }, { name: 'Tommy' }, { name: 'Kam' }]

test('Table does not sort data', async () => {
  const user = userEvent.setup()
  render(
    <Table data={tableData} >
      <Column name="name" />
    </Table>
  )
  await user.click(screen.getByText('Name'))
  // Data remains unsorted
  const cells = screen.getAllByText(/^K/)
  expect(cells.at(0).textContent).toBe('Kim')
  expect(cells.at(1).textContent).toBe('Kam')
})
