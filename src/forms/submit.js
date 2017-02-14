import React from 'react'
import Button from './button'

function Submit (props) {
  return (
    <Button { ...props } type="submit"/>  
  )
}

export default Submit
