import React from 'react'

const button = ({children, primary, className} : {}) => {
  const primaryClasses = primary ? "bg-blue-500" : ""
  const classes = `rounded px-6 py-4 ${primaryClasses} ${className}`
  return (
    <button className={classes}>
      {children}
    </button>
  )
}

export default button
