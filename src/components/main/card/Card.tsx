import React from "react";
import './card.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import picholder from '../../../assets/picholder.jpg';


interface ICardProps {
    publisher:string;
    name:string;
    year:number;
    img:string;
    alt:string;

} 

export const Card=(props:ICardProps)=>{   
    return(
                <div className="card" style={{backgroundImage:`url(${picholder})`}}>   
                    <div className="card-row ">
                        <h4 className="car-name">{props.name}</h4>
                        <div className="card-about">
                        <span>{props.publisher}</span>
                                <span>{props.year}</span>
                        </div>     
                        <div className="card-buttons">
                            <button>details</button>
                            <button><FontAwesomeIcon icon={faBookmark} /></button>
                        </div>
                    </div>
                </div>
    )
}