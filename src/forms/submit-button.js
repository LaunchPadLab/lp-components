import React from 'react'
import Button from './button'

function SubmitButton (props) {
  return (
    <Button { ...props } type="submit"/>  
  )
}

export default SubmitButton
