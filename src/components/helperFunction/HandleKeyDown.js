import Calculate from "./Calculate";
function HandleKeyDown(e,data){

    const { exp, setExp } =data;

    if(e.code==="Backspace" && exp.length===1){
        setExp("");
    }
    if(e.code==="Enter"){
        Calculate(data);
    }
}

export default HandleKeyDown;