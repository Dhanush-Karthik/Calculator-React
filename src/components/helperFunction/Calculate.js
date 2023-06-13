const peek = (value) => {
    value = value.toString();
    return value.charAt(value.length - 1);
  };

  const hasPrecedence = (op1, op2) => {
    if (op2 === "%") {
      return "true";
    }
    if ((op1 === "*" || op1 === "/") && (op2 === "+" || op2 === "-")) return false;
    else return true;
  };

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
  const Calculate = (data) => {
    const { exp, setExp, lastOperation, setLastOperation, isPerformed, setPerformed, setPrevExp } =data;
    var temp = exp.toString();

    if (temp === "") {
      setExp("");
    }

    while (isNaN(peek(exp))) {
      temp = temp.substring(0, exp.length - 1);
    }

    //last operation not working!!!
    temp = lastOperation;

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
    temp = exp.toString();
    if (isPerformed) {
      temp = exp + lastOperation;
    }
    console.log("Updated: "+temp +"Actual: "+ exp);

    setPerformed(true);

    var op = [];
    var values = [];
    for (i = 0; i < temp.length; i++) {

      if (temp.charAt(i) === "-" && (i === 0  || isNaN(temp.charAt(i - 1)))) {
        var temp1 = "-";
        i++;

        while (i <= temp.length && (!isNaN(temp.charAt(i)) || temp.charAt(i) === ".")) {
          temp1 += temp.charAt(i++);
        }
        console.log(temp1);
        values.push(temp1);
        i--;
      } 
      else if (!isNaN(temp.charAt(i))) {
        temp1 = "";
        
        while (i <= temp.length && (!isNaN(temp.charAt(i)) || temp.charAt(i) === ".")) {
          temp1 += temp.charAt(i++);
        }
        
        console.log(temp1);
        values.push(temp1);
        i--;
      } 
      else if (isNaN(temp.charAt(i))) {
        while (op.length !== 0 && hasPrecedence(temp.charAt(i), op[op.length - 1])) {
          values.push(perform(op.pop(), values.pop(), values.pop()));
        }
        console.log(temp.charAt(i));
        op.push(temp.charAt(i));
      }
    }

    while (op.length !== 0) {
      values.push(perform(op.pop(), values.pop(), values.pop()));
    }
    setExp(values.pop().toString());
    setPrevExp(temp.toString());
  };

  export default Calculate;