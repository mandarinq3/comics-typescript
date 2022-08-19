import React from "react";
import './card.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import {RootState} from '../../../store/store';
import { setLibraryToRender } from "../../../features/filterAndSortSlice";
import { Link } from "react-router-dom";


interface ICardProps {
    publisher:string;
    name:string;
    year:number;
    img:string;
    alt:string;
    id:number;
    isPicked:boolean;
} 

const setFavoriteBookIds = () => {
    let booksId:number[] = [];

    return (id:number)=>{
        booksId.push(id);
        return booksId;
    }
}

let getFavoriteBookIds = setFavoriteBookIds()

export const Card=(props:ICardProps)=>{
    const appState = useSelector((state:RootState)=>state);
    const dispatch = useDispatch();

    const markPickedBooks = (btn:HTMLButtonElement) =>{
        btn.classList.toggle('picked');
        
    }

    const favoritesHandler = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        let target = e.currentTarget as HTMLButtonElement;
        let currentId = target.dataset.id ? parseInt(target.dataset.id) : undefined;
        let fromLocalStorage = JSON.parse(localStorage.getItem('favoriteBooks') as any)!=null ? JSON.parse(localStorage.getItem('favoriteBooks') as any) : [];//get

        let indexOfCurrentElement = fromLocalStorage.indexOf(currentId);

        if(indexOfCurrentElement<0){
            fromLocalStorage.push(currentId);//push
        }else{
            fromLocalStorage.splice(indexOfCurrentElement,1);
        }
        
        localStorage.setItem('favoriteBooks',JSON.stringify(fromLocalStorage))//set

        dispatch(setLibraryToRender({
            headers:{skipMW:false},
            body:{
                data:null
            }
        }));
            
        markPickedBooks(target);   
            
       
    }

    

    
    
    
    
    const setPickedBook = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        let el = e.currentTarget as HTMLElement;
        let res=appState.fetch.libraryFull.find((item)=>{
            if(el.dataset.id!==undefined){
                return item.id===Number.parseInt(el.dataset.id);
            }  
        }) 

        localStorage.setItem('pickedBook',JSON.stringify(res));
        
        
    }
       

    return(
                    <div className="card" style={{backgroundImage:`url(${props.img})`}}>    
                    <div className="card-row ">
                        <h4 className="car-name">{props.name}</h4>
                        <div className="card-about">
                        <span>{props.publisher}</span>
                                <span>{props.year}</span>
                        </div>     
                        <div className="card-buttons">
                            <button 
                                data-id={props.id}
                                onClick={(e)=>{
                                    setPickedBook(e);
                                }}
                            >
                                <Link to="/book-details">подробнее</Link>
                            </button>
                            {props.isPicked ? 
                            <button 
                            className="picked"
                            data-id={props.id}
                            onClick={(e)=>{
                                favoritesHandler(e)
                            }}><FontAwesomeIcon icon={faBookmark} /></button>
                            :
                            <button 
                            data-id={props.id}
                            onClick={(e)=>{
                                favoritesHandler(e)
                            }}><FontAwesomeIcon icon={faBookmark} /></button>
                        
                        }
  
                        </div>
                    </div>
                </div>
    )
}