import React, { useContext } from "react";
import "./Button.css";
import { ExpContext } from "../calculator/Calculator";

const Button = ({ value, className }) => {
  const {exp, setExp, lastOperation, setLastOperation, isPerformed, setPerformed, setPrevExp,calculate,} = useContext(ExpContext);

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
    temp = exp.toString();

    if (value === "C") {
      setExp("0");
      return;
    }
    
    if (value === "BS") {
      if (temp === "0") {
        setExp("0");
        return;
      }
      setExp(temp.substring(0, temp.length - 1));
      return;
    }

    if(value==='.' && isOperator(peek(temp))){
      setExp(temp+"0"+value)
    }

    if(value==='-' && peek(temp)==='-' && !isNaN(peek(trim(temp,1)))){
      setExp(trim(temp,1)+'+');
      return;
    }

    if(isOperator(value)){
      setLastOperation("");
      setPerformed(false);

      if(peek(temp)==='.'){
        setExp(temp+"0"+value);
        return;
      }
    }
    
    if (value === "=") {
      calculate(exp);
      return;
    }
    
    var temp = exp;
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