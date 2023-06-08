import { createContext, useState } from "react";
import Display from "../display/Display";
import NumberPad from "../numberpad/NumberPad";
import "./Calculator.css"
export const ExpContext = createContext();
const Calculator = () => {
    const [exp,setExp] = useState("working");
      
    return(
        <ExpContext.Provider value={exp}>
            <div className="calculator">
                Casio
                <Display />
                <NumberPad />
            </div>
        </ExpContext.Provider>
    );
}

export default Calculator;
