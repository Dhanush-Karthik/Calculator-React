import React, { useContext } from 'react';
import './Button.css';
import { ExpContext } from '../calculator/Calculator';


const Button = ({value,className}) => {
  const {exp,setExp} = useContext(ExpContext);

  const handleClick = (e)=>{
    let val = e.target.textContent;

    if(val==='C'){
      setExp("");
      return;
    }

    if(val==='BS'){
      setExp(exp.substring(0,exp.length-1));
      return;
    }
    
    setExp(exp+val);
  }
  
  return (
    <div className={className} onClick={handleClick}>
        {value}
    </div>
  )
}

export default Button
