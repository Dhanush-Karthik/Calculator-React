import React from "react";
import "./Button.css";
import HandleButtonClick from "../helperFunction/HandleButtonClick";
import { ExpContext } from "../calculator/Calculator";
import { useContext } from "react";


const Button = ({ value, className }) => {
  const data = useContext(ExpContext);
  
  const handleButtonClick = (e) => {
    HandleButtonClick(e, data);
  };
  
  return (
    <div className={className} onClick={handleButtonClick}>
      {value}
    </div>
  );
};

export default Button;
