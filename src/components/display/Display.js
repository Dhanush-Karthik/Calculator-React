import { useContext } from "react";
import "./Display.css";
import { ExpContext } from "../calculator/Calculator";

const Display = () => {
  let {exp, setExp, prevExp, setPrevExp, setLastOperation, setPerformed, calculate} = useContext(ExpContext);

  function peek(val) {
    return val.charAt(val.length - 1);
  }

  function trim(val, lim) {
    return val.substring(0, val.length - lim);
  }

  function mpeek(exp) {
    return exp.substring(0, exp.length - 1).charAt(exp.length - 2);
  }

  const isOperator = (value) => {
    return value==="+" || value==='-' || value==='*' || value==='/' || value==='%';
  }

  let handleInput = (e) => {
    let temp = e.target.value;
    var rpattern = /^(-|-?\d+|-?\d+\.|-?\d+\.\d+|-?\d+(\.\d+)?[+\-/%*]|(-?\d+(\.\d+)?[+\-/%*])+-|(-?\d+(\.\d+)?[+\-/%*])+-?\d+|(-?\d+(\.\d+)?[+\-/%*])+-?\d+\.|(-?\d+(\.\d+)?[+\-/%*])+-?\d+\.\d+|(-?\d+(\.\d+)?[+\-/%*])+-?\d+(\.\d+)?[+\-/%*])$/;
    var value = peek(temp);
    
    if(value==='-' && mpeek(temp)==='-' && !isNaN(mpeek(trim(temp,1)))){
      temp = trim(temp,2)+'+';
    }

    if(value==='+'||value==='-'||value==='*'||value==='/'||value==='%'){
      setLastOperation("");
      setPerformed(false);

      if(mpeek(temp)==='.'){
        temp = trim(temp,1)+'0'+value;
      }

      if(value!=='-' && isOperator(mpeek(temp)==='+')){
         temp = trim(temp,2)+value;
      }
    }

    if(value==='.' && isOperator(mpeek(temp))){
        temp = trim(temp,1)+'0'+value;
    }
    if(isNaN(mpeek(temp)) && isNaN(value) && (value==='+' || value==='/' || value==='*' || value=='%') && value!=='-' && value!=='.'){
        temp = trim(temp,2)+value;
        setPrevExp(temp);
        return;
    }
    if(isNaN(value) && isNaN(mpeek(temp)) && (mpeek(temp)==='+' || mpeek(temp)==='-')){
        temp = trim(temp,2)+value;
    }

    var res = rpattern.test(temp);
    if(!res){
        temp = prevExp;
    }
    setExp(temp.toString());
    setPrevExp(temp);
  };

  let handleClick = (e)=>{
    if(exp==="0"){
      setExp("");
    }
  }

  const handleKeyDown=(e)=>{
    if(e.code==="Backspace" && exp.length===1){
        setExp("");
    }
    if(e.code==="Enter"){
      calculate(exp);
    }
    console.log(e.code);
  }

  return <input className="display" value={exp} onKeyDown={handleKeyDown} onInput={handleInput} onClick={handleClick}/>;
};

export default Display;
