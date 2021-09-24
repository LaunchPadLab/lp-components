import React from 'react'
import { mount } from 'enzyme'
import { FileInput } from '../../../src/'

const name = 'my.file.input'

describe('FileInput', () => {
  test('renders thumbnail with value as src when file is an image', () => {
    const file = { name: 'fileName', type: 'image/png', url: 'foo' }
    const props = { input: { name, value: file }, meta: {} }
    const wrapper = mount(<FileInput { ...props }/>)
    expect(wrapper.find('img').props().src).toEqual(file.url)
  })

  test('renders file name when file is non-image type or value is empty', () => {
    const file = { name: 'fileName', type: 'application/pdf' }
    const props = { input: { name, value: file }, meta: {} }
    const wrapper = mount(<FileInput { ...props } />)
    expect(wrapper.find('p').text()).toEqual('fileName')
  })

  test('sets thumbnail placeholder', () => {
    const thumbnail = 'thumb'
    const props = { input: { name, value: '' }, meta: {}, thumbnail }
    const wrapper = mount(<FileInput { ...props }/>)
    expect(wrapper.find('img').props().src).toEqual(thumbnail)
  })

  test('hides preview correctly', () => {
    const props = { input: { name, value: '' }, meta: {}, hidePreview: true }
    const wrapper = mount(<FileInput { ...props }/>)
    expect(wrapper.find('img').exists()).toEqual(false)
  })

  test('sets custom preview from children', () => {
    const Preview = () => <p> My preview </p>
    const props = { input: { name, value: '' }, meta: {} }
    const wrapper = mount(<FileInput { ...props }><Preview/></FileInput>)
    expect(wrapper.find('p').exists()).toEqual(true)
  })

  test('sets custom preview from props', () => {
    const Preview = ({ value }) => <p>{ value && value.name }</p> // eslint-disable-line react/prop-types
    const props = { input: { name, value: { name: 'fileName', type: 'image/png' } }, meta: {} }
    const wrapper = mount(<FileInput previewComponent={ Preview } { ...props }/>)
    expect(wrapper.find('p').exists()).toEqual(true)
    expect(wrapper.find('p').text()).toEqual('fileName')
  })

  test('passes extra props to custom preview', () => {
    const Preview = ({ message }) => <p>{ message }</p> // eslint-disable-line react/prop-types
    const props = { input: { name, value: '' }, meta: {}, message: 'FOO' }
    const wrapper = mount(<FileInput previewComponent={ Preview } { ...props }/>)
    expect(wrapper.find('p').text()).toEqual('FOO')
  })

  test('passes value to custom preview', () => {
    const Preview = ({ value }) => <p>{ value.url }</p> // eslint-disable-line react/prop-types
    const file = { name: 'fileName', url: 'foo' }
    const props = { input: { name, value: file }, meta: {} }
    const wrapper = mount(<FileInput previewComponent={ Preview } { ...props }/>)
    expect(wrapper.find('p').exists()).toEqual(true)
    expect(wrapper.find('p').text()).toEqual(file.url)
  })

  test('reads files and calls change handler correctly', async () => {
    const FILE = { name: 'my file' }
    const FILEDATA = 'my file data'
    // eslint-disable-next-line no-undef
    window.FileReader = createMockFileReader(FILEDATA)
    const onChange = jest.fn()
    const props = { input: { name, value: '', onChange }, meta: {} }
    const wrapper = mount(<FileInput { ...props }/>)
    wrapper.find('input').simulate('change', { target: { files: [FILE] }})
    // Needed since FileReader works asynchronously
    await flushPromises()
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0].url).toBe(FILEDATA)
  })

  test("FileInput does not re-read existing files", async () => {
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
    const props = { input: { name, value: '' }, meta: {}, accept: 'image/*' }
    const wrapper = mount(<FileInput { ...props }/>)
    expect(wrapper.find('input').prop('accept')).toEqual('image/*')
  })

  test('is given an aria-describedby attribute when there is an input error', () => {
    const props = { input: { name, value: '' }, meta: { touched: true, invalid: true } }
    const wrapper = mount(<FileInput { ...props }/>)
    expect(wrapper.find('input').prop('aria-describedby')).toContain(name)
  })

  describe('with "multiple" enabled', () => {
    test('allows multiple files to be added incrementally', async () => {
      const lastModified = Date.now()
      const firstFile = { name: 'first', lastModified }
      const secondFile = { name: 'second', lastModified }
      const FILEDATA = 'my file data'
      // eslint-disable-next-line no-undef
      window.FileReader = createMockFileReader(FILEDATA)
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
  })
})

// HELPERS

// Creates a mock FileReader that passes the given file data to its onload() handler
export function createMockFileReader (fileData) {
  return class MockFileReader {
    readAsDataURL () {
      this.onload({ target: { result: fileData } })
    }
  }
}

// Resolves when other ongoing promises have resolved
// https://stackoverflow.com/a/51045733
export function flushPromises () {
  return new Promise(window.setImmediate) // eslint-disable-line no-undef
}
