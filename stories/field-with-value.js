import React, { Component } from 'react'
import fieldPropTypes from '../src/forms/field-proptypes'

// From redux-forms 
const isEvent = obj => !!(obj && obj.stopPropagation && obj.preventDefault)

export default function (givenValue) {
  return function (WrappedComponent) {
    class Wrapper extends Component {
      constructor () {
        super()
        this.state = {
          value: givenValue
        }
      }
      onChange (e) {
        const value = isEvent(e) ? e.target.value : e
        this.setState({ value })
      }
      render () {
        const { input, ...rest } = this.props
        const { value } = this.state
        return (
          <WrappedComponent { ...{
            input: {
              ...input,
              value,
              onChange: this.onChange.bind(this)
            },  
            ...rest 
            }
          }/>
        )
      }
    }
    Wrapper.propTypes = {
      ...fieldPropTypes
    }
    return Wrapper
  }
}