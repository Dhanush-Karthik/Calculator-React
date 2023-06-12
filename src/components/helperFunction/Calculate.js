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

    if (isPerformed) {
      temp = exp + lastOperation;
    }

    setPerformed(true);

    var op = [];
    var values = [];
    for (i = 0; i < exp.length; i++) {

      if (exp.charAt(i) === "-" && (i === 0  || isNaN(exp.charAt(i - 1)))) {
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

  export default Calculate;