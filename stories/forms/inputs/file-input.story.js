import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { FileInput as StaticFileInput } from 'src'
import dynamicInput from '../../dynamic-input'

const FileInput = dynamicInput({
  valuePath: 'input.value',
  initialValue: [],
  onChangePath: 'input.onChange'
})(StaticFileInput)

const inputProps = {
  name: 'person.firstName',
  onChange: action('field changed')
}

// eslint-disable-next-line react/prop-types
function FilenamePreview ({ file }) {
  if (!file) return null
  const lastModified = new Date(file.lastModified)
  const formattedDate = `${lastModified.getMonth() + 1}/${lastModified.getDate()}/${lastModified.getFullYear()}`
  return <p>{ file.name } <i>(Modified: { formattedDate })</i></p>
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
    <FileInput
      input={inputProps}
      meta={{}}
      previewComponent={FilenamePreview}
    />
  ))
  .add('with thumbnail', () => (
    <FileInput
      input={inputProps}
      meta={{}}
      thumbnail={"https://via.placeholder.com/150"}
    />
  ))
  .add('with accepting only images', () => (
    <FileInput
      input={inputProps}
      meta={{}}
      accept="image/*"
    />
  ))
  .add('with multiple files', () => (
    <FileInput
      input={inputProps}
      meta={{}}
      multiple={true}
    />
  ))
