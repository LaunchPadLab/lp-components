import { blurDirty } from '../../../src/'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const InputToWrap = ({ input: { value, onBlur }}) => (
  <input value={value} onBlur={onBlur} />
)

test('has correct displayName', () => {
  const WrappedInput = blurDirty()(InputToWrap)
  expect(WrappedInput.displayName).toEqual('blurDirty(InputToWrap)')
})

test('when input is pristine, blurDirty replaces onBlur with empty function', async () => {
  const user = userEvent.setup()
  const WrappedInput = blurDirty()(InputToWrap)
  const onBlur = jest.fn()
  const { container, rerender } = render(
    <WrappedInput {...{ input: { onBlur }, meta: { pristine: true } }} />
  )

  await user.click(screen.getByRole('textbox'))
  await user.click(container)

  expect(onBlur).not.toHaveBeenCalled()

  rerender(
    <WrappedInput {...{ input: { onBlur }, meta: { pristine: false } }} />
  )

  await user.click(screen.getByRole('textbox'))
  await user.click(container)

  expect(onBlur).toHaveBeenCalledTimes(1)
})

test('when alwaysBlur is set to true, blurDirty does not replace onBlur', async () => {
  const user = userEvent.setup()
  const WrappedInput = blurDirty()(InputToWrap)
  const onBlur = jest.fn()
  const { container } = render(
    <WrappedInput
      {...{ input: { onBlur }, meta: { pristine: true }, alwaysBlur: true }}
    />
  )

  await user.click(screen.getByRole('textbox'))
  await user.click(container)

  expect(onBlur).toHaveBeenCalled()
})
