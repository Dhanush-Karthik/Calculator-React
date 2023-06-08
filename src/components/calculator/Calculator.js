import Display from "../display/Display";
import NumberPad from "../numberpad/NumberPad";
import "./Calculator.css"
let Calculator = () => {
    return(
        <div className="calculator">
            Casio
            <Display />
            <NumberPad />
        </div>
    );
}

export default Calculator;