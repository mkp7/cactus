import React from 'react'

const Button = ({children, primary, className, onClick} : {}) => {
  const primaryClasses = primary ? "bg-blue-500 text-white" : "bg-blue-50"
  const classes = `rounded-lg px-6 py-4 border-4 border-blue-500 font-medium ${primaryClasses} ${className}`
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  primary: false
}

export default Button
