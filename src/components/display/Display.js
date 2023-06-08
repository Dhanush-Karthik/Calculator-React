import { useContext } from "react";
import "./Display.css";
import { ExpContext } from "../calculator/Calculator";


const Display = () => {
    let exp = useContext(ExpContext);
    console.log(exp);
    return(
        <input className="display"/>
    );
}

export default Display;