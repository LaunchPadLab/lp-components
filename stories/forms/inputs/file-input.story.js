import React from 'react'
import { action } from '@storybook/addon-actions'
import { FileInput as StaticFileInput } from 'src'
import dynamicInput from '../../dynamic-input'

const FileInput = dynamicInput({
  valuePath: 'input.value',
  initialValue: [],
  onChangePath: 'input.onChange',
})(StaticFileInput)

const inputProps = {
  name: 'person.firstName',
  onChange: action('field changed'),
}

// eslint-disable-next-line react/prop-types
function FilenamePreview({ file }) {
  if (!file) return null
  const lastModified = new Date(file.lastModified)
  const formattedDate = `${
    lastModified.getMonth() + 1
  }/${lastModified.getDate()}/${lastModified.getFullYear()}`
  return (
    <p>
      {file.name} <i>(Modified: {formattedDate})</i>
    </p>
  )
}

export default {
  title: 'FileInput',
}

export const WithDefaults = () => <FileInput input={inputProps} meta={{}} />

WithDefaults.story = {
  name: 'with defaults',
}

export const WithHiddenPreview = () => (
  <FileInput input={inputProps} meta={{}} hidePreview />
)

WithHiddenPreview.story = {
  name: 'with hidden preview',
}

export const WithCustomPreview = () => (
  <FileInput input={inputProps} meta={{}} previewComponent={FilenamePreview} />
)

WithCustomPreview.story = {
  name: 'with custom preview',
}

export const WithThumbnail = () => (
  <FileInput
    input={inputProps}
    meta={{}}
    thumbnail={'https://via.placeholder.com/150'}
  />
)

WithThumbnail.story = {
  name: 'with thumbnail',
}

export const WithAcceptingOnlyImages = () => (
  <FileInput input={inputProps} meta={{}} accept="image/*" />
)

WithAcceptingOnlyImages.story = {
  name: 'with accepting only images',
}

export const WithMultipleFiles = () => (
  <FileInput input={inputProps} meta={{}} multiple={true} />
)

WithMultipleFiles.story = {
  name: 'with multiple files',
}
