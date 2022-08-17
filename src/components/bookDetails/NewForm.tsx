import React, { ReactElement } from "react";

interface IFormProps {
    btnValue:string,
    handler:Function,
    content:ReactElement,
}


export const NewForm = (props:IFormProps)=>{
    return(
        <>
            <form 
                onSubmit={(e)=>{
                    e.preventDefault();
                    props.handler(e)
                }}>    
                {props.content}
                <button 
                    type="submit"
                    className="btn"
                >
                    {props.btnValue}
                </button>
            </form>
        </>
        
    )
}