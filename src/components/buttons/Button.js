import React from 'react'
import './Button.css';
const Button = ({value,className}) => {
  return (
    <div className={className}>
        {value}
    </div>
  )
}

export default Button
