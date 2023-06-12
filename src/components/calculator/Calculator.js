import { createContext, useState } from "react";
import Display from "../display/Display";
import NumberPad from "../numberpad/NumberPad";
import "./Calculator.css";

export const ExpContext = createContext();

const Calculator = () => {
  const [exp, setExp] = useState("0");
  const [isPerformed, setPerformed] = useState(false);
  const [lastOperation, setLastOperation] = useState("");
  const [prevExp, setPrevExp] = useState("");

  const dependencies = {exp, setExp, lastOperation, setLastOperation, isPerformed, setPerformed, prevExp, setPrevExp};

  return (
    <ExpContext.Provider
      value={dependencies}
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