import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FileInput } from '../../../src/'

const name = 'my.file.input'
const defaultOnChange = () => null

describe('FileInput', () => {
  test('renders thumbnail with value as src when file is an image', async () => {
    const file = { name: 'fileName', type: 'image/png', url: 'foo' }
    const props = {
      input: { name, value: file, onChange: defaultOnChange },
      meta: {},
    }
    render(<FileInput {...props} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', file.url)
  })

  test('renders file name when file is non-image type or value is empty', () => {
    const file = { name: 'fileName', url: 'data:,', type: 'application/pdf' }
    const props = {
      input: { name, value: file, onChange: defaultOnChange },
      meta: {},
    }
    render(<FileInput {...props} />)
    expect(screen.getByText('fileName')).toBeInTheDocument()
  })

  test('sets thumbnail placeholder', () => {
    const thumbnail = 'thumb'
    const props = {
      input: { name, value: '', onChange: defaultOnChange },
      meta: {},
      thumbnail,
    }
    render(<FileInput {...props} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', thumbnail)
  })

  test('hides preview correctly', () => {
    const props = {
      input: { name, value: '', onChange: defaultOnChange },
      meta: {},
      hidePreview: true,
    }
    render(<FileInput {...props} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  test('sets custom preview from children', () => {
    const Preview = () => <p>My preview</p>
    const props = {
      input: { name, value: '', onChange: defaultOnChange },
      meta: {},
    }
    render(
      <FileInput {...props}>
        <Preview />
      </FileInput>
    )
    expect(screen.getByText('My preview')).toBeInTheDocument()
  })

  test('sets custom preview from props', () => {
    const Preview = ({ file }) => <p>{file && file.name}</p> // eslint-disable-line react/prop-types
    const props = {
      input: {
        name,
        value: { name: 'fileName', url: 'data:,', type: 'image/png' },
        onChange: defaultOnChange,
      },
      meta: {},
    }
    render(<FileInput previewComponent={Preview} {...props} />)
    expect(screen.getByText('fileName')).toBeInTheDocument()
  })

  test('passes extra props to custom preview', () => {
    const Preview = ({ message }) => <p>{message}</p> // eslint-disable-line react/prop-types
    const props = {
      input: { name, value: '', onChange: defaultOnChange },
      meta: {},
      message: 'FOO',
    }
    render(<FileInput previewComponent={Preview} {...props} />)
    expect(screen.getByText('FOO')).toBeInTheDocument()
  })

  test('passes file to custom preview', () => {
    const Preview = ({ file }) => <p>{file.url}</p> // eslint-disable-line react/prop-types
    const file = { name: 'fileName', url: 'foo' }
    const props = {
      input: { name, value: file, onChange: defaultOnChange },
      meta: {},
    }
    render(<FileInput previewComponent={Preview} {...props} />)
    expect(screen.getByText(file.url)).toBeInTheDocument()
  })

  test('reads files and calls change handler correctly', async () => {
    const user = userEvent.setup()
    const file = new File(['content'], 'fileName.png', { type: 'image/png' })
    const filedata = 'my file data'
    mockFileReader(filedata)

    const onChange = jest.fn()
    const props = { input: { name, value: [], onChange }, meta: {} }
    render(<FileInput {...props} />)

    const input = screen.getByLabelText(/select file/i)
    await user.upload(input, file)

    expect(input.files).toHaveLength(1)
    expect(input.files[0]).toBe(file)
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ url: filedata }),
    ])
  })

  test('does not re-read existing files', async () => {
    const user = userEvent.setup()
    const lastModified = Date.now()
    const firstFile = { name: 'first', url: 'data:,', lastModified }
    const readFiles = jest.fn()
    const onChange = jest.fn()
    const props = {
      input: { name, value: firstFile, onChange },
      meta: {},
      readFiles,
    }
    render(<FileInput {...props} />)

    const input = screen.getByLabelText(/select file/i)
    await user.upload(input, firstFile)

    expect(input.files).toHaveLength(1)
    expect(input.files[0]).toBe(firstFile)
    expect(readFiles).toHaveBeenCalled()
    expect(readFiles).toHaveBeenCalledWith([])
  })

  test('only allows one file by default', async () => {
    const user = userEvent.setup()
    const firstFile = new File(['content'], 'first', { type: 'image/png' })
    const secondFile = new File(['content'], 'second', { type: 'image/png' })
    const readFiles = jest.fn((arr) =>
      arr.map((file) => ({ ...file, url: 'my-data-url' }))
    )
    const onChange = jest.fn()
    const props = {
      input: { name, value: '', onChange },
      meta: {},
      readFiles,
    }
    render(<FileInput {...props} />)

    const input = screen.getByLabelText(/select file/i)

    await user.upload(input, firstFile)
    await user.upload(input, secondFile)

    expect(input.files).toHaveLength(1)
    expect(input.files[0]).toBe(secondFile)
  })

  test('passes accept attribute to input component', () => {
    const props = {
      input: { name, value: '', onChange: defaultOnChange },
      meta: {},
      accept: 'image/*',
    }
    render(<FileInput {...props} />)

    const input = screen.getByLabelText(/select file/i)
    expect(input).toHaveAttribute('accept', 'image/*')
  })

  test('is given an aria-describedby attribute when there is an input error', () => {
    const props = {
      input: { name, value: '', onChange: defaultOnChange },
      meta: { touched: true, invalid: true },
    }
    render(<FileInput {...props} />)

    const input = screen.getByLabelText(/select file/i)
    expect(input).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining(name)
    )
  })

  test('shows error messages that occur from reading', async () => {
    const user = userEvent.setup()
    const ERROR_MESSAGE = 'cannot read'
    const file = new File(['content'], 'fileName.png', { type: 'image/png' })
    const readFiles = jest.fn(() => Promise.reject(ERROR_MESSAGE))
    const props = {
      input: { name, value: '', onChange: defaultOnChange },
      meta: {},
      readFiles,
    }
    render(<FileInput {...props} />)

    const input = screen.getByLabelText(/select file/i)
    user.upload(input, file)
    await waitFor(() => {
      expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument()
    })
  })

  test('shows error that occurs from reading', async () => {
    const user = userEvent.setup()
    const ERROR_MESSAGE = 'cannot read'
    const file = new File(['content'], 'fileName.png', { type: 'image/png' })
    const readFiles = jest.fn(() => {
      throw new Error(ERROR_MESSAGE)
    })
    const props = {
      input: { name, value: '', onChange: defaultOnChange },
      meta: {},
      readFiles,
    }
    render(<FileInput {...props} />)

    const input = screen.getByLabelText(/select file/i)
    user.upload(input, file)
    await waitFor(() => {
      expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument()
    })
  })

  describe('with "multiple" enabled', () => {
    test('allows multiple files to be added incrementally', async () => {
      const user = userEvent.setup()
      const lastModified = Date.now()
      const firstFile = { name: 'first', url: 'data:,', lastModified }
      const secondFile = { name: 'second', url: 'data:,', lastModified }

      const onChange = jest.fn()
      const props = {
        input: { name, value: [firstFile], onChange },
        meta: {},
        multiple: true,
      }
      render(<FileInput {...props} />)

      const input = screen.getByLabelText(/select file/i)
      await user.upload(input, secondFile)

      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][0]).toHaveLength(2)
    })

    test('selects first file when prop changes from true to false', () => {
      const lastModified = Date.now()
      const firstFile = { name: 'first', url: 'data:,', lastModified }
      const secondFile = { name: 'second', url: 'data:,', lastModified }
      const onChange = jest.fn()
      const props = {
        input: { name, value: [firstFile, secondFile], onChange },
        meta: {},
        multiple: true,
      }
      const { rerender } = render(<FileInput {...props} />)

      rerender(<FileInput {...props} multiple={false} />)

      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][0][0]).toMatchObject(firstFile)
    })

    test('shows remove button component by default', () => {
      const props = {
        input: {
          name,
          value: [{ name: 'fileName', url: 'data:,', type: 'image/png' }],
          onChange: defaultOnChange,
        },
        meta: {},
        multiple: true,
      }
      render(<FileInput {...props} />)
      expect(
        screen.getByRole('button', { name: /remove filename/i })
      ).toBeInTheDocument()
    })

    test('shows a clear input button component when multiple prop is false and a file is selected', () => {
      const props = {
        input: {
          name,
          value: [{ name: 'fileName', url: 'data:,', type: 'image/png' }],
          onChange: defaultOnChange,
        },
        meta: {},
        multiple: false,
      }
      render(<FileInput {...props} />)
      expect(
        screen.getByRole('button', { name: /remove filename/i })
      ).toBeInTheDocument()
    })

    test('does not show a clear input button component when multiple prop is false and a file is not selected', () => {
      const props = {
        input: { name, value: [], onChange: defaultOnChange },
        meta: {},
        multiple: false,
      }
      render(<FileInput {...props} />)
      expect(
        screen.queryByRole('button', { name: /remove/i })
      ).not.toBeInTheDocument()
    })

    test('adds custom aria-label to default remove button', () => {
      const file = { name: 'fileName.png', url: 'data:,', type: 'image/png' }
      const props = {
        input: { name, value: [file], onChange: defaultOnChange },
        meta: {},
        multiple: true,
      }
      render(<FileInput {...props} />)
      expect(screen.getByLabelText('Remove fileName.png')).toBeInTheDocument()
    })

    test('sets custom remove component from props', () => {
      const RemoveComponent = () => (
        <button className="remove-custom">Remove me!!!</button>
      )
      const props = {
        input: {
          name,
          value: { name: 'fileName', url: 'data:,', type: 'image/png' },
          onChange: defaultOnChange,
        },
        meta: {},
        multiple: true,
      }
      render(<FileInput removeComponent={RemoveComponent} {...props} />)

      expect(
        screen.getByRole('button', { name: 'Remove me!!!' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: /remove filename/i })
      ).not.toBeInTheDocument()
    })

    test('calls custom onRemove prop', async () => {
      const onRemove = jest.fn()
      const file = { name: 'fileName', url: 'data:,', type: 'image/png' }
      const props = {
        input: { name, value: [file], onChange: defaultOnChange },
        meta: {},
        multiple: true,
      }
      render(<FileInput onRemove={onRemove} {...props} />)

      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: /remove filename/i }))

      expect(onRemove).toHaveBeenCalledWith(file)
    })

    test('removes correct file', async () => {
      const user = userEvent.setup()
      const firstFile = { name: 'firstFile', url: 'data:,', type: 'image/png' }
      const secondFile = {
        name: 'secondFile',
        url: 'data:,',
        type: 'image/png',
      }
      const thirdFile = { name: 'thirdFile', url: 'data:,', type: 'image/png' }
      const onChange = jest.fn()
      const props = {
        input: { name, value: [firstFile, secondFile, thirdFile], onChange },
        meta: {},
        multiple: true,
      }
      render(<FileInput {...props} />)

      const removeButton = screen.getByRole('button', {
        name: /remove secondFile/i,
      })
      await user.click(removeButton)

      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][0]).toHaveLength(2)
      expect(
        onChange.mock.calls[0][0].find((f) => f.name === secondFile.name)
      ).toBeUndefined()
    })

    test('shows error when remove fails', async () => {
      const user = userEvent.setup()
      const ERROR_MESSAGE = 'cannot read'
      const file = { name: 'fileName', url: 'data:,' }
      const readFiles = jest.fn()
      const onRemove = jest.fn(() => Promise.reject(ERROR_MESSAGE))

      const props = {
        input: { name, value: [file], onChange: defaultOnChange },
        meta: {},
        multiple: true,
        readFiles,
        onRemove,
      }
      render(<FileInput {...props} />)

      expect(screen.queryByText(ERROR_MESSAGE)).not.toBeInTheDocument()

      user.click(screen.getByRole('button', { name: /remove filename/i }))
      await waitFor(() => {
        expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument()
      })
    })
  })
})

// HELPERS

// Creates a mock FileReader that passes the given file data to its onload() handler
function createMockFileReader(fileData) {
  return class MockFileReader {
    readAsDataURL() {
      this.onload({ target: { result: fileData } })
    }
  }
}

export function mockFileReader(fileData) {
  const mockReader = createMockFileReader(fileData)
  // eslint-disable-next-line no-undef
  jest.spyOn(global, 'FileReader').mockImplementation(() => new mockReader())
}
