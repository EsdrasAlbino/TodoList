import React from 'react'

export  function Checkbox({value,onChange}) {
  return (
    <div>
      <input type="checkbox" checked={value} onChange={onChange}/>
    </div>
  )
}
