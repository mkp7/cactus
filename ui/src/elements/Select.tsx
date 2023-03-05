import React from 'react'

const Select = React.forwardRef(({ onChange, onBlur, name, label, children }, ref) => (
  <>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
    {children}
    </select>
  </>
));

export default Select
