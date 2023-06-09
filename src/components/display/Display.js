import { useContext, useState } from "react";
import "./Display.css";
import { ExpContext } from "../calculator/Calculator";

const Display = () => {
  let {
    exp,
    setExp,
    lastOperation,
    setLastOperation,
    isPerformed,
    setPerformed,
    isDecimal,
    setDecimal,
  } = useContext(ExpContext);

    const [correctedValue, setCorrectedValue] = useState("");

  function peek(val) {
    return val.charAt(val.length - 1);
  }

  function trim(val, lim) {
    return val.substring(0, val.length - lim);
  }

  function mpeek(exp) {
    return exp.substring(0, exp.length - 1).charAt(exp.length - 2);
  }

  //sets decimal flag with value
  function setDecimalFlag(exp, value) {
    if (!isDecimal && value === ".") {
      var i = exp.length - 1;
      while (exp.charAt(i) != "." && i >= 0) {
        i--;
      }
      if (i != 0) {
        isDecimal = false;
      }
    }
  }

  //handles keyboard input
  function restrictInput(event) {
    var temp = event.target.value;
    var exp = temp.substring(0, temp.length);
    var value = peek(exp);

    //prevents muliple decimal points for same operand
    if (isDecimal && value === ".") {
      event.target.value = trim(event.target.value, 1);
      return;
    }

    //if operator occurs decimal flag is set to false
    if (isNaN(value) && value != ".") {
      isDecimal = false;
    }

    //concatinates 0 if operator follows dot
    if ((isNaN(mpeek(exp)) || mpeek(exp) === "") && value === ".") {
      event.target.value = trim(event.target.value, 1) + "0.";
    }

    //sets flag
    if (isNaN(value)) {
      lastOperation = "";
      isDecimal = value === "." ? true : false;
      isPerformed = false;
    }

    //prevents repetation of operators by replacing the recent added operator
    // does not replaces decimal point(.)
    if (
      isNaN(value) &&
      value != "." &&
      isNaN(mpeek(exp)) &&
      mpeek(exp) != "."
    ) {
      event.target.value = trim(exp, 2) + value;
    }

    event.target.value = event.target.value.replace(/[^0-9+\-*./%]/g, "");
  }

  let handleInput = (e) => {
    let temp = e.target.value;
    var exp = temp.substring(0, temp.length);
    var value = peek(exp);

    console.log("Expression: "+exp);


    //prevents muliple decimal points for same operand
    if (isDecimal && value === ".") {
        console.log("workin")
      setExp(trim(exp, 1));
      console.log(exp);
      return;
    }

    //if operator occurs decimal flag is set to false
    if (isNaN(value) && value != ".") {
      isDecimal = false;
    }

    //concatinates 0 if operator follows dot(pending)
    if ((isNaN(mpeek(exp)) || mpeek(exp) === "") && value === ".") {
        setExp(trim(temp,1)+"0.");
        return;
    }

    //sets flag
    if (isNaN(value)) {
      lastOperation = "";
      isDecimal = value === "." ? true : false;
      isPerformed = false;
    }

    //prevents repetation of operators by replacing the recent added operator
    // does not replaces decimal point(.)
    if (
      isNaN(value) &&
      value != "." &&
      isNaN(mpeek(exp)) &&
      mpeek(exp) != "."
    ) {
        if(value.match(/[^0-9+\-*./%]/g)){
            setExp(trim(exp,1));
        }else{
            setExp(trim(exp, 2) + value);
        }
      return;
    }

    
    if (temp.charAt(temp.length - 1).match(/[0-9+\-*./%]/g) || temp === "") {
        setExp(temp);
        return;
    }
    setExp(exp.replace(/[^0-9+\-*./%]/g, ""));
  };

  return <input className="display" value={exp} onChange={handleInput} onClick={()=>{setExp("")}}/>;
};

export default Display;
