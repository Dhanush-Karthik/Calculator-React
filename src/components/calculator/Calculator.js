import { createContext, useState } from "react";
import Display from "../display/Display";
import NumberPad from "../numberpad/NumberPad";
import "./Calculator.css";
export const ExpContext = createContext();
const Calculator = () => {
  const [exp, setExp] = useState("0");
  const [lastOperation, setLastOperation] = useState("");
  const [isPerformed, setPerformed] = useState(false);
  const [isDecimal, setDecimal] = useState(false);
  return (
    <ExpContext.Provider
      value={{
        exp,
        setExp,
        lastOperation,
        setLastOperation,
        isPerformed,
        setPerformed,
        isDecimal,
        setDecimal,
      }}
    >
      <div className="calculator">
        Casio
        <Display />
        <NumberPad />
      </div>
    </ExpContext.Provider>
  );
};

export default Calculator;
