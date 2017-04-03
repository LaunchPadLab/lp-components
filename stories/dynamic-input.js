import React, { Component } from 'react'
import fieldPropTypes from '../src/forms/field-proptypes'
import set from 'lodash/fp/set'
import get from 'lodash/fp/get'
import noop from 'lodash/noop'
import compose from 'lodash/fp/compose'

// From redux-forms 
const isEvent = obj => !!(obj && obj.stopPropagation && obj.preventDefault)

export default function dynamicInput (options={}) {
  const { initialValue, valuePath='value', onChangePath='onChange' } = options
  return function (WrappedComponent) {
    class Wrapper extends Component {
      constructor (props) {
        super()
        this.state = {
          value: initialValue || get(valuePath, props) || ''
        }
        this.onChange = this.onChange.bind(this)
      }
      onChange (e) {
        const value = isEvent(e) ? e.target.value : e
        this.setState({ value })
        return e
      }
      render () {
        const { value } = this.state
        const givenOnChange = get(onChangePath, this.props) || noop
        const props = compose(
          set(valuePath, value),
          set(onChangePath, compose(givenOnChange, this.onChange))
        )(this.props)
        return (
          <WrappedComponent { ...props }/>
        )
      }
    }
    Wrapper.propTypes = {
      ...fieldPropTypes
    }
    return Wrapper
  }
}