import { useContext } from "react";
import "./Display.css";
import { ExpContext } from "../calculator/Calculator";
import HandleDisplay from "../helperFunction/HandleDisplay";
import HandleKeyDown from "../helperFunction/HandleKeyDown";
import HandleClick from "../helperFunction/HandleClick";

const Display = () => {
  let data = useContext(ExpContext);

  const handleInput = (e) => {
    HandleDisplay(e,data);
  };

  const handleKeyDown=(e)=>{
    HandleKeyDown(e,data);
  };

  let handleClick = (e)=>{
    HandleClick(e,data);
  }
  
  return <input className="display" value={data.exp} onKeyDown={handleKeyDown} onInput={handleInput} onClick={handleClick}/>;
};

export default Display;