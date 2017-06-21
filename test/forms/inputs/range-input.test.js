import React from 'react'
import { render } from 'enzyme'
import { RangeInput } from '../../../src/'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const input = { name, value, onChange }
const error = 'input error'

/* 
  Note: when using render(), we have to use length instead of exists() 
  because it's implemented using the Cheerio API.
  https://github.com/cheeriojs/cheerio/issues/798
*/

