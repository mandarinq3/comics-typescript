import React from "react";
import './loader.scss';
import { nanoid } from "nanoid";

export const Loader:React.FC=(props:any)=>{
    return(
        <div key={nanoid()} className="lds-roller">
            <div key={nanoid()}></div>
            <div key={nanoid()}></div>
            <div key={nanoid()}></div>
            <div key={nanoid()}></div>
            <div key={nanoid()}></div>
            <div key={nanoid()}></div>
            <div key={nanoid()}></div>
            <div key={nanoid()}></div>
        </div>
    )
}

