import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Input } from 'src'

storiesOf('Input', module)
  .add('with default label', () => {
    const [value, onChange] = useState('')
    return <Input name="person.firstName" value={value} onChange={onChange} />
  })
  .add('with custom label', () => {
    const [value, onChange] = useState('')
    return (
      <Input
        name="person.firstName"
        value={value}
        onChange={onChange}
        label="Custom Label"
      />
    )
  })
  .add('with no label', () => {
    const [value, onChange] = useState('')
    return (
      <Input
        name="person.firstName"
        value={value}
        onChange={onChange}
        label={false}
      />
    )
  })
  .add('with custom required indicator', () => {
    const [value, onChange] = useState('')
    return (
      <Input
        name="person.firstName"
        value={value}
        onChange={onChange}
        required
        requiredIndicator={'*'}
      />
    )
  })
  .add('with error', () => {
    return (
      <Input
        name="person.firstName"
        value="0000"
        invalid
        touched
        error="Invalid input"
      />
    )
  })
