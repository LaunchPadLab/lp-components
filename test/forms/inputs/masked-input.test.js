import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MaskedInput } from '../../../src'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const input = { name, value, onChange }

describe('MaskedInput', () => {
  test('applies comma-separated number mask', async () => {
    const user = userEvent.setup()
    render(
      <MaskedInput input={input} meta={{}} maskOptions={{ numeral: true }} />
    )
    const maskedInput = screen.getByRole('textbox')
    maskedInput.focus()
    await user.keyboard('1234')
    expect(maskedInput.value).toEqual('1,234')
  })

  test('accepts forwarded ref attribute', () => {
    const ref = React.createRef()
    render(<MaskedInput input={input} meta={{}} htmlRef={ref} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('id', ref.current.id)
  })

  test('accepts forwarded callback ref', () => {
    const ref = React.createRef()
    const callbackRef = (el) => (ref.current = el)
    render(
      <MaskedInput input={input} meta={{}} htmlRef={callbackRef} />
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('id', ref.current.id)
  })

  test('triggers onInit handler', () => {
    const onInit = jest.fn()
    render(<MaskedInput input={input} meta={{}} onInit={onInit} />)
    expect(onInit).toHaveBeenCalledTimes(1)
  })

  test('triggers onInit handler', () => {
    const onInit = jest.fn()
    render(<MaskedInput input={input} meta={{}} onInit={onInit} />)
    expect(onInit).toHaveBeenCalledTimes(1)
  })

  test('is given an aria-describedby attribute when there is an input error', () => {
    const props = { input, meta: { touched: true, invalid: true } }
    render(<MaskedInput {...props} />)
    expect(screen.getByLabelText('Field').getAttribute('aria-describedby')).toContain(name)
  })
})