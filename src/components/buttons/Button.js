import React, { useContext } from "react";
import "./Button.css";
import { ExpContext } from "../calculator/Calculator";

const Button = ({ value, className }) => {
  const {exp, setExp, setLastOperation, setPerformed, setPrevExp,calculate,} = useContext(ExpContext);

  const peek = (value) => {
    value = value.toString();
    return value.charAt(value.length - 1);
  };

  const trim = (value, lim) => {
    return value.substring(0, value.length - lim);
  };

  const isOperator = (value) => {
    return value==="+" || value==='-' || value==='*' || value==='/' || value==='%';
  }

  const handleClick = (e) => {
    let value = e.target.textContent;
    var temp = exp.toString();

    if (value === "C") {
      temp = "0";
    }
    
    if (value === "BS") {
      if (temp === "0") {
        temp = "0";
      }
      temp = temp.substring(0, temp.length - 1);
      setPrevExp(temp);
    }

    if(value==='.' && isOperator(peek(temp))){
      temp = temp+"0"+value;
    }

    if(value==='-' && peek(temp)==='-' && !isNaN(peek(trim(temp,1)))){
      temp = trim(temp,1)+'+';
    }

    if(isOperator(value)){
      setLastOperation("");
      setPerformed(false);

      if(peek(temp)==='.'){
        temp = temp+"0"+value;
      }
    }
    setExp(temp.toString());

    if (value === "=") {
      calculate(temp);
      return;
    }
    
    
    var rpattern =/^(-|-?\d+|-?\d+\.|-?\d+\.\d+|-?\d+(\.\d+)?[+\-/%*]|(-?\d+(\.\d+)?[+\-/%*])+-|(-?\d+(\.\d+)?[+\-/%*])+-?\d+|(-?\d+(\.\d+)?[+\-/%*])+-?\d+\.|(-?\d+(\.\d+)?[+\-/%*])+-?\d+\.\d+|(-?\d+(\.\d+)?[+\-/%*])+-?\d+(\.\d+)?[+\-/%*])$/;
    if (temp === "0") {
      temp = "";
    }
    if (isNaN(peek(temp)) && isNaN(value) && value !== "-" && value !== ".") {
      temp = trim(temp, 1);
    }
    if (isNaN(value) && (peek(temp) === "+" || peek(temp) === "-")) {
      temp = trim(temp, 1);
    }
    if (exp.length === 1) {
      setPrevExp(temp+value);
    }
    if (rpattern.test(temp+value)) {
      setExp(temp+value);
    }
  };
  
  return (
    <div className={className} onClick={handleClick}>
      {value}
    </div>
  );
};

export default Button;