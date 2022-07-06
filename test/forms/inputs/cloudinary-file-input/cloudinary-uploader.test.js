import React from 'react'
import { shallow } from 'enzyme'
import cloudinaryUploader from '../../../../src/forms/inputs/cloudinary-file-input/cloudinary-uploader'

class MockResponse {
  #text

  constructor(url, options, body = null) {
    const { headers = {} } = options
    const isSuccess = !url.includes('/failure')
    const isJson = headers?.['Content-Type'] === 'application/json'
    const payload = body ?? { ...options, url }

    this.headers = {
      get: (header) => headers[header],
      ...headers,
    }
    this.body = isJson ? JSON.stringify(payload) : payload
    this.ok = isSuccess
    this.status = isSuccess ? 200 : 400
    this._config = options
    this.#text = typeof body === 'string' ? body : JSON.stringify(this.body)
  }

  json() {
    return Promise.resolve(this.body)
  }

  text() {
    return Promise.resolve(this.#text)
  }
}

const mockApi = {
  post: jest.fn(function (url, body, options = {}) {
    const response = new MockResponse(url, options, body)
    // Simulate server response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!response.ok) return reject(new Error('Failed'))
        return resolve(response)
      }, 10)
    })
  }),
}

const props = {
  bucket: 'test-bucket',
  cloudName: 'test-name',
  apiAdapter: mockApi,
}

const file = {
  name: 'test.jpg',
  type: 'image/jpg',
}

const fileData = 'mockData'

test('cloudinaryUploader has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader(props)(Wrapped)
  expect(Wrapper.displayName).toEqual('cloudinaryUploader(Wrapped)')
})

test('cloudinaryUploader throws an error if `bucket`, `cloudName`, or `apiAdapter` are not provided', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader()(Wrapped)
  expect(() => shallow(<Wrapper />)).toThrow()
})

test('cloudinaryUploader can receive arguments via env vars', () => {
  process.env.CLOUDINARY_CLOUD_NAME = 'foo'
  process.env.CLOUDINARY_BUCKET = 'bar'
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({ apiAdapter: props.apiAdapter })(Wrapped)
  expect(() => shallow(<Wrapper />)).not.toThrow()
})

test('cloudinaryUploader adds upload props to component', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader(props)(Wrapped)
  const component = shallow(<Wrapper />)
  expect(component.props()).toMatchObject({
    upload: expect.any(Function),
    uploadStatus: expect.any(String),
  })
})

test('cloudinaryUploader can receive options as props', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader()(Wrapped)
  const component = shallow(
    <Wrapper cloudName="foo" bucket="bar" apiAdapter={() => {}} />
  )
  expect(component.props()).toMatchObject({
    upload: expect.any(Function),
    uploadStatus: expect.any(String),
  })
})

test('cloudinaryUploader sends the api request with the correct options', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader(props)(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  return upload(fileData, file).then((response) => {
    component.update()
    const { uploadStatus } = component.props()
    expect(uploadStatus).toEqual('upload-success')
    const responseJson = JSON.parse(response.body)
    expect(responseJson.file).toEqual(fileData)
    expect(responseJson.folder).toEqual(props.bucket)
    expect(responseJson.public_id).toEqual('test')
    expect(responseJson.upload_preset).toEqual('default')
  })
})

test('cloudinaryUploader sets `publicId`', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({
    ...props,
    cloudinaryPublicId: 'custom-name',
  })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  return upload(fileData, file).then((response) => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('custom-name')
  })
})

test('cloudinaryUploader allows custom `publicId` creator', () => {
  const Wrapped = () => <h1>Hi</h1>
  const createPublicId = (file) => 'foo-' + file.name
  const Wrapper = cloudinaryUploader({ ...props, createPublicId })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  return upload(fileData, file).then((response) => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('foo-test')
  })
})

test('cloudinaryUploader overrides custom `publicId` creator with `cloudinaryPublicId`', () => {
  const Wrapped = () => <h1>Hi</h1>
  const createPublicId = (file) => 'foo-' + file.name
  const Wrapper = cloudinaryUploader({
    ...props,
    createPublicId,
    cloudinaryPublicId: 'custom-name',
  })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  return upload(fileData, file).then((response) => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('custom-name')
  })
})

test('cloudinaryUploader adds extension to `publicId` of raw files', () => {
  const rawFile = { name: 'test.xls', type: 'application/xls' }
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({
    ...props,
    cloudinaryPublicId: 'custom-name',
  })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()
  return upload(fileData, rawFile).then((response) => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('custom-name.xls')
  })
})

test('cloudinaryUploader removes invalid characters from the default `publicId`', () => {
  const FORBIDDEN_PATTERN = /[\s?&#\\%<>]/gi
  const illegallyNamedFile = {
    name: 'Final \\ Master %20 Schedule? #S1&S2 <100%> & finished.pdf',
    type: 'application/pdf',
  }
  const Wrapped = () => <h1>Howdy</h1>
  const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()

  return upload(fileData, illegallyNamedFile).then((response) => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).not.toMatch(FORBIDDEN_PATTERN)
  })
})

test('cloudinaryUploader removes html escaped characters from the default `publicId`', () => {
  const illegallyNamedFile = {
    name: 'SY%20S1%26S2.pdf',
    type: 'application/pdf',
  }
  const Wrapped = () => <h1>Howdy</h1>
  const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()

  return upload(fileData, illegallyNamedFile).then((response) => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('SY_S1_S2')
  })
})

test('cloudinaryUploader replaces spaces and removes superfluous underscores from the default `publicId`', () => {
  const illegallyNamedFile = {
    name: '     SY     S1___S2.pdf',
    type: 'application/pdf',
  }
  const Wrapped = () => <h1>Howdy</h1>
  const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()

  return upload(fileData, illegallyNamedFile).then((response) => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('SY_S1_S2')
  })
})

test('cloudinaryUploader trims spaces from the start of the default `publicId`', () => {
  const illegallyNamedFile = {
    name: '     Example.pdf',
    type: 'application/pdf',
  }
  const Wrapped = () => <h1>Howdy</h1>
  const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()

  return upload(fileData, illegallyNamedFile).then((response) => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('Example')
  })
})

test('cloudinaryUploader defaults file name if not provided when creating the default `publicId`', () => {
  const fileWithNoName = { name: '', type: 'application/pdf' }
  const Wrapped = () => <h1>Howdy</h1>
  const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
  const component = shallow(<Wrapper />)
  const { upload } = component.props()

  const spy = jest.spyOn(global.Date, 'now')

  return upload(fileData, fileWithNoName).then((response) => {
    component.update()
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toContain('file_upload')
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })
})

test('cloudinaryUploader throws an error if request fails', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({ ...props, endpoint: '/failure' })(
    Wrapped
  )
  const component = shallow(<Wrapper />)
  const { upload } = component.props()

  expect.assertions(1)

  return expect(upload(fileData, file)).rejects.toThrow()
})

test('cloudinaryUploader updates the `uploadStatus` prop if request fails', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = cloudinaryUploader({ ...props, endpoint: '/failure' })(
    Wrapped
  )
  const component = shallow(<Wrapper />)
  const { upload } = component.props()

  expect.assertions(1)
  return upload(fileData, file).catch(() => {
    component.update()
    const { uploadStatus } = component.props()
    expect(uploadStatus).toEqual('upload-failure')
  })
})
