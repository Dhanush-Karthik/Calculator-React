import React, { useContext } from 'react';
import './Button.css';
import { ExpContext } from '../calculator/Calculator';


const Button = ({value,className}) => {
  const exp = useContext(ExpContext);
  console.log(exp);
  return (
    <div className={className}>
        {value}
    </div>
  )
}

export default Button
