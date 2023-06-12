const HandleClick = (e,data)=>{
    const {exp, setExp} = data;

    if(exp==="0"){
      setExp("");
    }
}

export default HandleClick;