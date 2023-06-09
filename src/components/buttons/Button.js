import React, { useContext, useEffect } from "react";
import "./Button.css";
import { ExpContext } from "../calculator/Calculator";

const Button = ({ value, className }) => {
  const { exp, setExp } = useContext(ExpContext);

  useEffect(() => {
    setDeciFlag(exp);
    console.log(isDecimal);
  }, [exp]);

  let isPerformed = false;
  let lastOperation = "";
  let isDecimal = false;
  
  const peek = (val) => {
    val = val.toString();
    return val.charAt(val.length - 1);
  }

  const trim = (val, lim) => {
    return val.substring(0, val.length - lim);
  }

  //sets decimal flag while deleting or evaluating
  const setDeciFlag = (val) => {
    val = val.toString();

    var i = val.length - 1;
    while (i >= 0 && val.charAt(i) != ".") {
      if(isNaN(val.charAt(i))){
        isDecimal = false;
        return;
      }
      i--;
    }
    if (i === -1) {
      isDecimal = false;
    } else {
      isDecimal = true;
    }
  }


  //Evaluates the expression
  //checks precedence of the operator
  const hasPrecedence = (op1, op2) => {
    if (op2 == "%") {
      return "true";
    }
    if ((op1 == "*" || op1 == "/") && (op2 == "+" || op2 == "-")) return false;
    else return true;
  }

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
    }
  }

  //performs operation
  const calculate = (exp) => {

    if (exp === "") {
      setExp("");
    }

    while (isNaN(exp.charAt(exp.length - 1))) {
      exp = exp.substring(0, exp.length - 1);
    }

    if (!isPerformed) {
      var i = exp.length - 1;
      while ((!isNaN(exp.charAt(i)) || exp.charAt(i) === ".") && i >= 0) {
        lastOperation = exp.charAt(i--) + lastOperation;
      }
      lastOperation = exp.charAt(i) + lastOperation;
    }

    if (!isNaN(lastOperation.charAt(0)) || lastOperation.charAt(0) === ".") {
      lastOperation = "";
    }

    if (isPerformed) {
      exp += lastOperation;
    }

    isPerformed = true;
    var op = [];
    var values = [];

    for (i = 0; i < exp.length; i++) {
      if (!isNaN(exp.charAt(i))) {
        var temp = "";
        while (
          i <= exp.length &&
          (!isNaN(exp.charAt(i)) || exp.charAt(i) === ".")
        ) {
          temp += exp.charAt(i++);
        }
        values.push(temp);
        i--;
      } else if (isNaN(exp.charAt(i))) {
        while (
          op.length != 0 &&
          hasPrecedence(exp.charAt(i), op[op.length - 1])
        ) {
          values.push(perform(op.pop(), values.pop(), values.pop()));
        }
        op.push(exp.charAt(i));
      }
    }
    while (op.length != 0) {
      values.push(perform(op.pop(), values.pop(), values.pop()));
    }

    setExp(values.pop());
  }

  const handleClick = (e) => {
    let val = e.target.textContent;

    console.log(lastOperation);

    if (val === "C") {
      setExp("0");
      return;
    }
  
    if (val === "BS") {
      if(exp==="0"){
        setExp("0");
        return;
      }
      setExp(exp.substring(0, exp.length - 1));
      setDeciFlag(exp);
      return;
    }
  
    if (val === "=") {
      calculate(exp);
      return;
    }

    //replaces initial 0 with number
    if ((exp === "0" ) && !isNaN(value)) {
      setExp(""+value);
      return;
    }
    
    //prevents muliple decimal points for same operand
    if (isDecimal && val === ".") {
      return;
    }
    
    //concatinates 0 if operator follows dot
    if (isNaN(peek(exp)) && val === ".") {
      setExp(exp+"0.");
      return;
    }
    
    //sets flag
    if (isNaN(val)) {
      lastOperation = "";
      isDecimal = value === "." ? true : false;
      isPerformed = false;
    }
    
    //prevents repetation of operators by replacing the recent added operator
    // does not replaces decimal point(.)
    if (isNaN(val) && value != "." && isNaN(peek(exp)) && peek(exp) != ".") {
      setExp(trim(exp, 0));
      return;
    }

    setExp(exp + val);
  };

  return (
    <div className={className} onClick={handleClick}>
      {value}
    </div>
  );
};

export default Button;
