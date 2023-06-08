import { useContext } from "react";
import "./Display.css";
import { ExpContext } from "../calculator/Calculator";


const Display = () => {
    let {exp,setExp} = useContext(ExpContext);
    
    return(
        <input className="display" value={exp}/>
    );
}

export default Display;