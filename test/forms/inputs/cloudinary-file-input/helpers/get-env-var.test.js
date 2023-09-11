/**
 * @jest-environment node
 *
 * Jest only allows one testEnvironment per file, so the browser-based tests
 * for this util are covered in cloudinary-uploader.test.js
 */

import { getEnvVar } from '../../../../../src/forms/inputs/cloudinary-file-input/helpers'

describe('getEnvVar', () => {
  test('retrieves variables from `process.env` when server rendered', () => {
    // eslint-disable-next-line no-undef
    global.process.env.TEST_KEY = 'value'

    expect(getEnvVar('TEST_KEY')).toEqual('value')
  })
})
