import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import Button from '../../src/forms/button'
import Submit from '../../src/forms/submit'

test('renders a <Button type="submit" ... />', t => {
  const wrapper = shallow(<Submit />)
  t.is(wrapper.contains(<Button type="submit"/>), true)
})
