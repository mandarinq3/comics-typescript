// import React from "react";
// import './card.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookmark } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch, useSelector } from "react-redux";
// import {RootState} from '../../../store/store';
// import { setLibraryToRender } from "../../../features/filterAndSortSlice";
// import { Link } from "react-router-dom";

import { Card } from "../card/Card"


interface IProps{
    isPicked:boolean;
    id:number;
    publisher:string;
    name:string; 
    year:number; 
    img:string;
    alt:string; 
}

export const Page=(props:IProps)=>{
    
    return(
            <div 
                data-id={props.id}
                className="page"
            >    
            <Card 
                isPicked={props.isPicked} 
                id={props.id} 
                key={props.id} 
                publisher={props.publisher} 
                name={props.name} 
                year={props.year} 
                img={props.img} 
                alt={props.alt} 
            />

            </div>
    )
}