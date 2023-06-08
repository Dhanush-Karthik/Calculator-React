import { useContext } from "react";
import "./Display.css";
import { ExpContext } from "../calculator/Calculator";


const Display = () => {
    let {exp,setExp} = useContext(ExpContext);

    let handleInput = (e) => {        
        let temp = e.target.value;

        if(temp.charAt(temp.length-1).match(/[0-9+\-*./%]/g) || temp===""){
            setExp(temp);
        }
    };

    return(
        <input className="display" value={exp} onInput={handleInput}/>
    );
}

export default Display;