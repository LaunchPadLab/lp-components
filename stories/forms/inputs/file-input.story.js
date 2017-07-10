import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { FileInput as StaticFileInput } from 'src'
import dynamicInput from '../../dynamic-input'

const FileInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange'
})(StaticFileInput)

const inputProps = {
  name: 'person.firstName',
  onChange: action('field changed')
}

// Component with filename preview
class CustomInput extends Component {
  onLoad (fileData, file) {
    this.setState({ filename: file.name })
  }
  render () {
    const filename = (this.state || {}).filename
    return (
      <FileInput {...{ 
        onLoad: this.onLoad.bind(this), 
        ...this.props,
      }}>
        <p>{ filename || 'Filename will appear here' }</p>
      </FileInput>
    )
  } 
}

storiesOf('FileInput', module)
  .add('with defaults', () => (
    <FileInput
      input={inputProps} 
      meta={{}}
    />
  ))
  .add('with hidden preview', () => (
    <FileInput
      input={inputProps}
      meta={{}}
      hidePreview
    />
  ))
  .add('with custom preview', () => (
    <CustomInput
      input={inputProps}
      meta={{}}
    />
  ))