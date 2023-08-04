import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Table, TableColumn as Column } from '../../src/'

const tableData = [{ name: 'Lorax' }, { name: 'Tommy' }, { name: 'Kim' }]

test('Table does not sort data', async () => {
  const user = userEvent.setup()
  render(
    <Table data={tableData}>
      <Column name="name" />
    </Table>
  )
  await user.click(screen.getByText('Name'))
  // Data remains unsorted
  const cells = screen.getAllByRole('cell')
  expect(cells.at(0).textContent).toBe('Lorax')
  expect(cells.at(-1).textContent).toBe('Kim')
})
