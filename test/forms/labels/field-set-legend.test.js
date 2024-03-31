import React from 'react'
import { render, screen } from '@testing-library/react'
import { FieldSetLegend } from '../../../src/'

const name = 'contactDetails'
const formattedName = 'Contact Details'

describe('FieldSetLegend', () => {
  test('renders label correctly when label prop is a string', () => {
    render(<FieldSetLegend name={name} label="Your Information" />)
    expect(screen.getByText('Your Information')).toBeInTheDocument()
  })

  test('renders label correctly using name prop when label prop is not provided', () => {
    render(<FieldSetLegend name={name} />)
    expect(screen.getByText(formattedName)).toBeInTheDocument()
  })

  test('renders label with class "visually-hidden" when label prop is false', () => {
    render(<FieldSetLegend name={name} label={false} />)
    expect(screen.getByText(formattedName)).toHaveClass('visually-hidden')
  })

  test('does not show required indicator when no custom required indicator is provided', () => {
    render(<FieldSetLegend name={name} required />)
    expect(screen.getByText(formattedName).textContent).toEqual(formattedName)
  })

  test('shows custom indicator when required is true and custom requiredIndicator is provided', () => {
    render(<FieldSetLegend name={name} required requiredIndicator={'*'} />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  test('hides custom indicator when required is false and custom requiredIndicator is provided', () => {
    render(
      <FieldSetLegend name={name} required={false} requiredIndicator={'*'} />
    )
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  test('shows hint when hint is provided', () => {
    render(<FieldSetLegend name={name} hint="hint" />)
    expect(screen.getByText(formattedName)).toHaveTextContent('hint')
  })
})
