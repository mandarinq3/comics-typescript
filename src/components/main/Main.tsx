import React, { useEffect } from "react";
import './main.scss';
import { Card } from "./card/Card";
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from 'nanoid'
import { Loader } from '../loader/Loader';
// import {setIsLast,setLibraryToRender,setDefaultSort} from '../../features/fetchSlice';
import {filterProps} from "../../filter-select-props/filter-props";

export const Main:React.FC=(props:any)=>{
    
    const dispatch = useDispatch();
    const appState = useSelector((state:RootState)=>state);
    
//рендерит full library
    const card = appState.fetch.libraryFull.map((book)=>{
            return <Card key={book.id} publisher={book.publisher} name={book.name} year={book.year} img={book.img} alt={book.alt} />
        })
//-------------------------------------------------------------------------------------------------------------

//создает селекты в мейн хеде: Чтобы добавить еще один то нужно перейти в файл filterProps.tsx и добавить там
    const selects = filterProps.map((item)=>{
        return <>
        <label>{item.label}</label>
        <select className="main-head-select">
            {
                item.options.map((option)=>{
                    return <option className="main-head-select__option" value={option}>{option}</option>
                })
            }     
        </select>
        </>
    })
//-------------------------------------------------------------------------------------------------------------

    return(
        <main className="main">
            {!appState.fetch.isLoadingDone?null:
            <div className="main-head">
                {selects}
            </div>
            }
            <section className="main-body">
            {
            appState.fetch.isLoading?<Loader/>:<>
            {appState.fetch.errorMsg!=null?<div className="error-msg">{appState.fetch.errorMsg}</div> : card }
            </>
            }
            </section>
           
            
 
            <div className="show-more-btn">
                <button >more</button>
            </div>
             
        </main>
    )
}