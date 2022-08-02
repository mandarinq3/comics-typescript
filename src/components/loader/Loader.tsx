import React from "react";
import './loader.scss';

export const Loader:React.FC=(props:any)=>{
    return(
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

