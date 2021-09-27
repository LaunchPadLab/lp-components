import React from 'react'
import { mount } from 'enzyme'
import { FileInput } from '../../../src/'
import { act } from 'react-dom/test-utils'

const name = 'my.file.input'
const defaultOnChange = () => null

describe('FileInput', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders thumbnail with value as src when file is an image', () => {
    const file = { name: 'fileName', type: 'image/png', url: 'foo' }
    const props = { input: { name, value: file, onChange: defaultOnChange }, meta: {} }
    const wrapper = mount(<FileInput { ...props }/>)
    expect(wrapper.find('img').props().src).toEqual(file.url)
  })

  test('renders file name when file is non-image type or value is empty', () => {
    const file = { name: 'fileName', type: 'application/pdf' }
    const props = { input: { name, value: file, onChange: defaultOnChange }, meta: {} }
    const wrapper = mount(<FileInput { ...props } />)
    expect(wrapper.find('p').text()).toEqual('fileName')
  })

  test('sets thumbnail placeholder', () => {
    const thumbnail = 'thumb'
    const props = { input: { name, value: '', onChange: defaultOnChange }, meta: {}, thumbnail }
    const wrapper = mount(<FileInput { ...props }/>)
    expect(wrapper.find('img').props().src).toEqual(thumbnail)
  })

  test('hides preview correctly', () => {
    const props = { input: { name, value: '', onChange: defaultOnChange }, meta: {}, hidePreview: true }
    const wrapper = mount(<FileInput { ...props }/>)
    expect(wrapper.find('img').exists()).toEqual(false)
  })

  test('sets custom preview from children', () => {
    const Preview = () => <p> My preview </p>
    const props = { input: { name, value: '', onChange: defaultOnChange }, meta: {} }
    const wrapper = mount(<FileInput { ...props }><Preview/></FileInput>)
    expect(wrapper.find('p').exists()).toEqual(true)
  })

  test('sets custom preview from props', () => {
    const Preview = ({ value }) => <p>{ value && value.name }</p> // eslint-disable-line react/prop-types
    const props = { input: { name, value: { name: 'fileName', type: 'image/png' }, onChange: defaultOnChange }, meta: {} }
    const wrapper = mount(<FileInput previewComponent={ Preview } { ...props }/>)
    expect(wrapper.find('p').exists()).toEqual(true)
    expect(wrapper.find('p').text()).toEqual('fileName')
  })

  test('passes extra props to custom preview', () => {
    const Preview = ({ message }) => <p>{ message }</p> // eslint-disable-line react/prop-types
    const props = { input: { name, value: '', onChange: defaultOnChange }, meta: {}, message: 'FOO' }
    const wrapper = mount(<FileInput previewComponent={ Preview } { ...props }/>)
    expect(wrapper.find('p').text()).toEqual('FOO')
  })

  test('passes value to custom preview', () => {
    const Preview = ({ value }) => <p>{ value.url }</p> // eslint-disable-line react/prop-types
    const file = { name: 'fileName', url: 'foo' }
    const props = { input: { name, value: file, onChange: defaultOnChange }, meta: {} }
    const wrapper = mount(<FileInput previewComponent={ Preview } { ...props }/>)
    expect(wrapper.find('p').exists()).toEqual(true)
    expect(wrapper.find('p').text()).toEqual(file.url)
  })

  test('reads files and calls change handler correctly', async () => {
    const FILE = { name: 'my file' }
    const FILEDATA = 'my file data'
    mockFileReader(FILEDATA)
    const onChange = jest.fn()
    const props = { input: { name, value: '', onChange }, meta: {} }
    const wrapper = mount(<FileInput { ...props }/>)
    wrapper.find('input').simulate('change', { target: { files: [FILE] }})
    // Needed since FileReader works asynchronously
    await flushPromises()
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0].url).toBe(FILEDATA)
  })

  test("does not re-read existing files", async () => {
    const lastModified = Date.now()
    const firstFile = { name: 'first', lastModified }
    const readFiles = jest.fn()
    const onChange = jest.fn()
    const props = { input: { name, value: firstFile, onChange }, meta: {}, readFiles }
    const wrapper = mount(<FileInput {...props} />)

    wrapper.find('input').simulate('change', { target: { files: [firstFile] } })
    await flushPromises()
    expect(readFiles).toHaveBeenCalled()
    expect(readFiles.mock.calls[0][0]).toStrictEqual([])
  })

  test('only allows one file by default', async () => {
    const lastModified = Date.now()
    const firstFile = { name: 'first', lastModified }
    const secondFile = { name: 'second', lastModified }
    const readFiles = jest.fn((arr) => arr.map((file) => ({ ...file, url: 'my-data-url' })))
    const onChange = jest.fn()
    const props = { input: { name, value: firstFile, onChange }, meta: {}, readFiles }
    const wrapper = mount(<FileInput {...props} />)

    wrapper.find('input').simulate('change', { target: { files: [secondFile] } })
    await flushPromises()

    expect(onChange.mock.calls[0][0].name).toBe(secondFile.name)
  })

  test('passes accept attribute to input component', () => {
    const props = { input: { name, value: '', onChange: defaultOnChange }, meta: {}, accept: 'image/*' }
    const wrapper = mount(<FileInput { ...props }/>)
    expect(wrapper.find('input').prop('accept')).toEqual('image/*')
  })

  test('is given an aria-describedby attribute when there is an input error', () => {
    const props = { input: { name, value: '', onChange: defaultOnChange }, meta: { touched: true, invalid: true } }
    const wrapper = mount(<FileInput { ...props }/>)
    expect(wrapper.find('input').prop('aria-describedby')).toContain(name)
  })

  test('shows errors that occur from reading', async () => {
    const ERROR_MESSAGE = 'cannot read'
    const file = { name: 'fileName' }
    const readFiles = jest.fn(() => Promise.reject(ERROR_MESSAGE))
    const props = { input: { name, value: '', onChange: defaultOnChange }, meta: {}, readFiles }
    const wrapper = mount(<FileInput {...props}/>)

    await act(() => {
      wrapper.find('input').simulate('change', { target: { files: [file] } })
      return flushPromises().then(() => wrapper.update())
    })

    expect(wrapper.find('span.error-message').text()).toBe(ERROR_MESSAGE)
  })

  describe('with "multiple" enabled', () => {
    test('allows multiple files to be added incrementally', async () => {
      const lastModified = Date.now()
      const firstFile = { name: 'first', lastModified }
      const secondFile = { name: 'second', lastModified }
      const FILEDATA = 'my file data'
      mockFileReader(FILEDATA)
      const onChange = jest.fn()
      const props = { input: { name, value: firstFile, onChange }, meta: {}, multiple: true }
      const wrapper = mount(<FileInput {...props} />)

      wrapper.find('input').simulate('change', { target: { files: [secondFile] } })
      await flushPromises()
      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][0]).toHaveLength(2)
    })

    test('selects first file if prop changes from true to false', async () => {
      const lastModified = Date.now()
      const firstFile = { name: 'first', lastModified }
      const secondFile = { name: 'second', lastModified }
      const onChange = jest.fn()
      const props = { input: { name, value: [firstFile, secondFile], onChange }, meta: {}, multiple: true }
      const wrapper = mount(<FileInput {...props} />)

      wrapper.setProps({ multiple: false })
      await flushPromises()
      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][0]).toMatchObject(firstFile)
    })

    test('modifies value to an array if prop changes from false to true', async () => {
      const lastModified = Date.now()
      const firstFile = { name: 'first', lastModified }
      const onChange = jest.fn()
      const props = { input: { name, value: firstFile, onChange }, meta: {}, multiple: false }
      const wrapper = mount(<FileInput {...props} />)

      wrapper.setProps({ multiple: true })
      await flushPromises()
      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][0]).toMatchObject([firstFile])
    })

    test('shows remove button component by default', () => {
      const props = { input: { name, value: { name: 'fileName', type: 'image/png' }, onChange: defaultOnChange }, meta: {}, multiple: true }
      const wrapper = mount(<FileInput { ...props }/>)
      expect(wrapper.find('button.remove-file').exists()).toBe(true)
    })

    test('sets custom remove component from props', () => {
      const RemoveComponent = () => <button className="remove-custom">Remove me!!!</button>
      const props = { input: { name, value: { name: 'fileName', type: 'image/png' }, onChange: defaultOnChange }, meta: {}, multiple: true }
      const wrapper = mount(<FileInput removeComponent={RemoveComponent} { ...props }/>)
      expect(wrapper.find('button.remove-custom').exists()).toBe(true)
      expect(wrapper.find('button.remove-file').exists()).toBe(false)
    })

    test('calls custom onRemove prop', async () => {
      const onRemove = jest.fn()
      const file = { name: 'fileName', type: 'image/png' }
      const props = { input: { name, value: [file], onChange: defaultOnChange }, meta: {}, multiple: true }
      const wrapper = mount(<FileInput onRemove={onRemove} { ...props }/>)
      wrapper.find('button.remove-file').simulate('click')
      await flushPromises()

      expect(onRemove).toHaveBeenCalledWith(file)
    })

    test('removes correct file', async () => {
      const firstFile = { name: 'firstFile', type: 'image/png' }
      const secondFile = { name: 'secondFile', type: 'image/png' }
      const thirdFile = { name: 'thirdFile', type: 'image/png' }
      const onChange = jest.fn()
      const props = { input: { name, value: [firstFile, secondFile, thirdFile], onChange }, meta: {}, multiple: true }
      const wrapper = mount(<FileInput { ...props }/>)
      wrapper.find('button.remove-file').at(1).simulate('click') // note: at() is 0 indexed
      await flushPromises()

      expect(onChange).toHaveBeenCalled()
      expect(onChange.mock.calls[0][0]).toHaveLength(2)
      expect(onChange.mock.calls[0][0].find((f) => f.name === secondFile.name)).toBeUndefined()
    })

    test('shows error when remove fails', async () => {
      const ERROR_MESSAGE = 'cannot read'
      const file = { name: 'fileName' }
      const readFiles = jest.fn()
      const onRemove = jest.fn(() => Promise.reject(ERROR_MESSAGE))

      const props = { input: { name, value: [file], onChange: defaultOnChange }, meta: {}, multiple: true, readFiles, onRemove }
      const wrapper = mount(<FileInput {...props}/>)
      expect(wrapper.find('span.error-message').exists()).toBe(false)

      await act(() => {
        wrapper.find('button.remove-file').simulate('click')
        return flushPromises().then(() => wrapper.update())
      })

      expect(wrapper.find('span.error-message').text()).toBe(ERROR_MESSAGE)
    })
  })
})

// HELPERS

// Creates a mock FileReader that passes the given file data to its onload() handler
function createMockFileReader (fileData) {
  return class MockFileReader {
    readAsDataURL () {
      this.onload({ target: { result: fileData } })
    }
  }
}

export function mockFileReader (fileData) {
  const mockReader = createMockFileReader(fileData)
  // eslint-disable-next-line no-undef
  jest.spyOn(global, 'FileReader').mockImplementation(() => new mockReader())
}

// Resolves when other ongoing promises have resolved
// https://stackoverflow.com/a/51045733
export function flushPromises () {
  return new Promise(window.setImmediate) // eslint-disable-line no-undef
}
