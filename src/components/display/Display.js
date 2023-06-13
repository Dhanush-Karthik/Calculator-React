import { useContext } from "react";
import "./Display.css";
import { ExpContext } from "../calculator/Calculator";
import HandleDisplay from "../helperFunction/HandleDisplay";
import HandleKeyDown from "../helperFunction/HandleKeyDown";
import HandleClick from "../helperFunction/HandleClick";

const Display = () => {
  let data = useContext(ExpContext);
  
  return <input className="display" value={data.exp} 
    onKeyDown={(e)=>HandleKeyDown(e,data)} 
    onInput={(e)=>HandleDisplay(e,data)} 
    onClick={(e)=>HandleClick(e,data)}/>;
};

export default Display;