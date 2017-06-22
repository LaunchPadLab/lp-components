import { omitLabelProps } from '../../../src/'

test('when props is empty - returns the empty object', () => {
  const props = {}
  expect(omitLabelProps(props)).toEqual({})
})

test('when the props include the omitted keywords - returns props object without keywords', () => {
  const remainingProp = 'i\'m here'
  const props = { hint: 'a hint', tooltip: 'a tooltip', label: 'a label', remainingProp }
  expect(omitLabelProps(props)).toEqual({ remainingProp })
})

test('when the props do not include the omitted keywords - returns props object', () => {
  const props = { foo: 'bar' }
  expect(omitLabelProps(props)).toEqual(props)
})
