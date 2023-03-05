import React from 'react'

export const Input = (props : {}) => {
  return (
    <input {...props} className={ `px-3 py-2 rounded-sm bg-gray-200 ${props.className}`  }/>
  )
}

export default Input
