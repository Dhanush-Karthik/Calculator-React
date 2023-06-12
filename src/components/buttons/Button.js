import React, { useContext } from "react";
import "./Button.css";
import { ExpContext } from "../calculator/Calculator";

const Button = ({ value, className }) => {
  const {exp, setExp, lastOperation, setLastOperation, isPerformed, setPerformed, setPrevExp,} = useContext(ExpContext);

  const peek = (value) => {
    value = value.toString();
    return value.charAt(value.length - 1);
  };

  const trim = (value, lim) => {
    return value.substring(0, value.length - lim);
  };

  //Evaluates the expression
  //checks precedence of the operator
  const hasPrecedence = (op1, op2) => {
    if (op2 === "%") {
      return "true";
    }
    if ((op1 === "*" || op1 === "/") && (op2 === "+" || op2 === "-")) return false;
    else return true;
  };

  //performs actual operation
  const perform = (op, val1, val2) => {
    val1 = parseFloat(val1);
    val2 = parseFloat(val2);
    switch (op) {
      case "+":
        return val2 + val1;
      case "*":
        return val2 * val1;
      case "/":
        return val2 / val1;
      case "-":
        return val2 - val1;
      case "%":
        return val2 % val1;
      default:
        break;
    }
  };

  //performs operation
  const calculate = (exp) => {
    exp = exp.toString();

    if (exp === "") {
      setExp("");
    }

    while (isNaN(peek(exp))) {
      exp = exp.substring(0, exp.length - 1);
    }

    //last operation not working!!!
    var temp = lastOperation;

    if (!isPerformed) {
      var i = exp.length - 1;

      while ((!isNaN(exp.charAt(i)) || exp.charAt(i) === "." || exp.charAt(i)==='-') && i >= 0) {
        if(exp.charAt(i)==='-' && !isNaN(exp.charAt(i-1))){
          break;
        }
        temp = exp.charAt(i--) + temp;
      }

      temp = exp.charAt(i) + temp;
      setLastOperation(temp);
    }

    if (!isNaN(temp.charAt(0)) || temp.charAt(0) === ".") {
      setLastOperation("");
    }

    if (isPerformed) {
      exp += lastOperation;
    }
    setPerformed(true);


    var op = [];
    var values = [];

    for (i = 0; i < exp.length; i++) {

      if (exp.charAt(i) === "-" && ((i === 0 && exp.charAt(0) === "-") || isNaN(exp.charAt(i - 1)))) {
        temp = "-";
        i++;

        while (i <= exp.length && (!isNaN(exp.charAt(i)) || exp.charAt(i) === ".")) {
          temp += exp.charAt(i++);
        }

        values.push(temp);
        i--;
      } 
      else if (!isNaN(exp.charAt(i))) {
        temp = "";

        while (i <= exp.length && (!isNaN(exp.charAt(i)) || exp.charAt(i) === ".")) {
          temp += exp.charAt(i++);
        }

        values.push(temp);
        i--;
      } 
      else if (isNaN(exp.charAt(i))) {
        while (op.length !== 0 && hasPrecedence(exp.charAt(i), op[op.length - 1])) {
          values.push(perform(op.pop(), values.pop(), values.pop()));
        }
        op.push(exp.charAt(i));
      }
    }

    while (op.length !== 0) {
      values.push(perform(op.pop(), values.pop(), values.pop()));
    }
    setExp(values.pop());
    setPrevExp(exp.toString());
  };

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

    if(value==='.'){
      if(peek(temp)==="+" || peek(temp)==='-' || peek(temp)==='*' || peek(temp)==='/' || peek(temp)==='%'){
        setExp(temp+"0"+value)
      }
    }

    if(value==='-' && peek(temp)==='-' && !isNaN(peek(trim(temp,1)))){
      setExp(trim(temp,1)+'+');
      return;
    }

    if(value==="+" || value==='-' || value==='*' || value==='/' || value==='%'){
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