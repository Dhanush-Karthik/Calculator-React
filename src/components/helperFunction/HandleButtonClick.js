import Calculate from "./Calculate";

function peek(value) {
  return value.charAt(value.length - 1);
}

function trim(value, lim) {
  return value.substring(0, value.length - lim);
}

function isOperator(value) {
  return (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    value === "/" ||
    value === "%"
  );
}

function HandleButtonClick(e, data) {
  const { exp, setExp, setLastOperation, setPerformed, setPrevExp } =
    data;

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

  if (value === "." && isOperator(peek(temp))) {
    temp = temp + "0" + value;
  }

  if (value === "-" && peek(temp) === "-" && !isNaN(peek(trim(temp, 1)))) {
    temp = trim(temp, 1) + "+";
  }

  if (isOperator(value)) {
    setLastOperation("");
    setPerformed(false);

    if (peek(temp) === ".") {
      temp = temp + "0" + value;
    }
  }
  setExp(temp.toString());

  if (value === "=") {
    Calculate(data);
    return;
  }

  var rpattern =
    /^(-|-?\d+|-?\d+\.|-?\d+\.\d+|-?\d+(\.\d+)?[+\-/%*]|(-?\d+(\.\d+)?[+\-/%*])+-|(-?\d+(\.\d+)?[+\-/%*])+-?\d+|(-?\d+(\.\d+)?[+\-/%*])+-?\d+\.|(-?\d+(\.\d+)?[+\-/%*])+-?\d+\.\d+|(-?\d+(\.\d+)?[+\-/%*])+-?\d+(\.\d+)?[+\-/%*])$/;
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
    setPrevExp(temp + value);
  }
  if (rpattern.test(temp + value)) {
    setExp(temp + value);
  }

  return;
}

export default HandleButtonClick;
