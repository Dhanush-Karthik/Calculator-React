const peek = (val) => {
    return val.charAt(val.length - 1);
  }

  const trim = (val, lim) => {
    return val.substring(0, val.length - lim);
  }

  const mpeek = (exp) => {
    return exp.substring(0, exp.length - 1).charAt(exp.length - 2);
  }

  const isOperator = (value) => {
    return value==="+" || value==='-' || value==='*' || value==='/' || value==='%';
  }

function handleDisplay(e,data) {
    const { setExp, setLastOperation, setPerformed, prevExp, setPrevExp } =data;

    let temp = e.target.value;
    var rpattern = /^(-|-?\d+|-?\d+\.|-?\d+\.\d+|-?\d+(\.\d+)?[+\-/%*]|(-?\d+(\.\d+)?[+\-/%*])+-|(-?\d+(\.\d+)?[+\-/%*])+-?\d+|(-?\d+(\.\d+)?[+\-/%*])+-?\d+\.|(-?\d+(\.\d+)?[+\-/%*])+-?\d+\.\d+|(-?\d+(\.\d+)?[+\-/%*])+-?\d+(\.\d+)?[+\-/%*])$/;
    var value = peek(temp);
    
    if(value==='-' && mpeek(temp)==='-' && !isNaN(mpeek(trim(temp,1)))){
      temp = trim(temp,2)+'+';
    }

    if(isOperator(value)){
      setLastOperation("");
      setPerformed(false);

      if(mpeek(temp)==='.'){
        temp = trim(temp,1)+'0'+value;
      }

      if(value!=='-' && isOperator(mpeek(temp))){
         temp = trim(temp,2)+value;
      }
    }

    if(value==='.' && isOperator(mpeek(temp))){
        temp = trim(temp,1)+'0'+value;
    }
    if(isNaN(mpeek(temp)) && isNaN(value) && (value==='+' || value==='/' || value==='*' || value==='%') && value!=='-' && value!=='.'){
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


  export default handleDisplay;