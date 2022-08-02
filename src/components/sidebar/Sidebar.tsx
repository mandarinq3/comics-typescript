import React from "react";
import './sidebar.scss';
import { RootState } from '../../store/store';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export const Sidebar:React.FC=()=>{
    
    const appState = useSelector((state:RootState)=>state);
    const dispatch=useDispatch();

    let hasCurrent;

    // выделяет выбранных издадетелей
    const markPickedElement = (el:HTMLElement):void=>{
        let [...elems]:any=document.querySelectorAll('.aside-navi-list__item');
        let AllPublishersEl = document.querySelector('.aside-navi-list__item[data-id="All"]');

        if(el.dataset.id!='All'){ 
            AllPublishersEl?.classList.remove('current');
            el.classList.toggle('current');  
            el.classList.toggle('close');    

            //проверка есть ли выбранный элемент и если нет установить all как текущий выбранный          
                hasCurrent=elems.some((item:any)=>{
                    return item.classList.contains('current');
                })
                if(!hasCurrent){
                    AllPublishersEl?.classList.add('current');
                }      
        }else{  
            for(let i=0; i<elems.length; i++){             
                elems[i].classList.remove('current');
                elems[i].classList.remove('close');
            }
            el.classList.add('current');
        }  
    }
   
    const publishersHandler = (e:React.MouseEvent<HTMLElement>):void=>{
        const element = e.target as HTMLElement;
        markPickedElement(element);
    }
        

    return(
        <aside>
            {!appState.fetch.isLoadingDone?null:
            <nav className="aside-navi">
                <h3 className="aside-navi__title">publishers</h3>
                <ul className="aside-navi__list">
                    <li 
                    data-id="All" 
                    className="aside-navi-list__item current"    
                    onClick={(event)=>{
                            publishersHandler(event);
                    }} 
                    >All</li>
                    <li 
                    data-id="Marvel" 
                    className="aside-navi-list__item" 
                    onClick={(event)=>{
                        publishersHandler(event);
                    }}>Marvel</li>
                    <li 
                    data-id="DC" 
                    className="aside-navi-list__item" 
                    onClick={(event)=>{
                        publishersHandler(event);
                    }}>DC</li>
                    <li 
                    data-id="Cartoon books" 
                    className="aside-navi-list__item" 
                    onClick={(event)=>{
                        publishersHandler(event);
                    }}>Cartoon books</li>
                    <li 
                    data-id="Dark Horse" 
                    className="aside-navi-list__item" 
                    onClick={(event)=>{
                        publishersHandler(event);
                    }}>Dark Horse</li>
                    <li 
                    data-id="Image" 
                    className="aside-navi-list__item" 
                    onClick={(event)=>{
                        publishersHandler(event);
                    }}>Image</li>
                    <li 
                    data-id="Vertigo" 
                    className="aside-navi-list__item" 
                    onClick={(event)=>{
                        publishersHandler(event);
                    }}>Vertigo</li>
                </ul>
            </nav>
}
        </aside>
    )
}