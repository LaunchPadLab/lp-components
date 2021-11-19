import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { FileInput as StaticFileInput } from 'src'
import dynamicInput from '../../dynamic-input'

const FileInput = dynamicInput({
  valuePath: 'input.value',
  onChangePath: 'input.onChange',
})(StaticFileInput)

const inputProps = {
  name: 'person.firstName',
  onChange: action('field changed'),
}

// eslint-disable-next-line react/prop-types
function FilenamePreview({ file }) {
  if (!file) return null
  return <p>{file.name}</p>
}

storiesOf('FileInput', module)
  .add('with defaults', () => <FileInput input={inputProps} meta={{}} />)
  .add('with hidden preview', () => (
    <FileInput input={inputProps} meta={{}} hidePreview />
  ))
  .add('with custom preview', () => (
    <FileInput
      input={inputProps}
      meta={{}}
      previewComponent={FilenamePreview}
    />
  ))
