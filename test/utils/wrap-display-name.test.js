import React from 'react'
import { wrapDisplayName } from '../../src/utils'

describe('Wrap Display Name', () => {
  test('wraps the name of a React component with the name of an HoC', () => {
    class SomeComponent extends React.Component {
      render() {
        return <div />
      }
    }

    expect(wrapDisplayName(SomeComponent, 'someHoC')).toBe(
      'someHoC(SomeComponent)'
    )
  })

  test('wraps the modified display name of a React component with the name of an HoC', () => {
    class SomeComponent extends React.Component {
      render() {
        return <div />
      }
    }

    SomeComponent.displayName = 'SomeOtherComponent'

    expect(wrapDisplayName(SomeComponent, 'someHoC')).toBe(
      'someHoC(SomeOtherComponent)'
    )
  })

  test('wraps the name of a React component with no display name with the name of an HoC', () => {
    class SomeComponent extends React.Component {
      render() {
        return <div />
      }
    }

    SomeComponent.displayName = null

    expect(wrapDisplayName(SomeComponent, 'someHoC')).toBe(
      'someHoC(SomeComponent)'
    )
  })

  test('wraps the string name of a component with the name of an HoC', () => {
    expect(wrapDisplayName('SomeComponent', 'someHoC')).toBe(
      'someHoC(SomeComponent)'
    )
  })

  test("wraps 'undefined' with the name of an HoC if the Component is falsey", () => {
    const SomeComponent = null

    expect(wrapDisplayName(SomeComponent, 'someHoC')).toBe('someHoC(undefined)')
  })

  test("wraps 'Component' with the name of an HoC if the Component has no displayName or name values", () => {
    expect(wrapDisplayName({}, 'someHoC')).toBe(
      'someHoC(Component)'
    )
  })
})
