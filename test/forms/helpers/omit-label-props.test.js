import React from 'react'
import { omitLabelProps } from '../../../src/'

test('when props is empty - returns the empty object', () => {
  const props = {}
  expect(omitLabelProps(props)).toEqual({})
})

test('when the props include the omitted keywords - returns props object without keywords', () => {
  const remainingProp = "i'm here"
  const LabelComponent = () => <label>label</label>
  const ErrorComponent = () => <span>error message</span>

  const props = {
    hint: 'a hint',
    tooltip: 'a tooltip',
    label: 'a label',
    requiredIndicator: '*',
    labelComponent: LabelComponent,
    errorComponent: ErrorComponent,
    remainingProp,
  }
  expect(omitLabelProps(props)).toEqual({ remainingProp })
})

test('when the props do not include the omitted keywords - returns props object', () => {
  const props = { foo: 'bar' }
  expect(omitLabelProps(props)).toEqual(props)
})
