import React from 'react'
import getDisplayName from './get-display-name'

export default function (...toggles) {

  return DecoratedComponent =>

    class Toggle extends React.Component {

      static displayName = `Toggle(${getDisplayName(DecoratedComponent)})`

      static DecoratedComponent = DecoratedComponent

      constructor () {
        super()
        this.state = toggles.reduce((state, toggle) =>
          ({ ...state, [toggleStateName(toggle)]: false }),
          {}
        )
        this.toggles = toggles.reduce((togglers, toggle) =>
          ({ ...togglers, [toggleFuncName(toggle)]: this.toggle.bind(this, toggleStateName(toggle)) }),
          {}
        )
      }

      toggle (toggleName) {
        this.setState(prevState => ({ ...prevState, [toggleName]: !prevState[toggleName] }))
      }

      render () {
        return (
          <DecoratedComponent
            { ...this.props }
            { ...this.state }
            { ...this.toggles }
          />
        )
      }
    }
}

function toggleStateName (toggle) {
  return `${toggle}Active`
}

function toggleFuncName (toggle) {
  return `toggle${toggle}`
}
