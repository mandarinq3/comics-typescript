import React from "react";
import './main.scss';
import { Card } from "./card/Card";
import { RootState } from '../../store/store';
import { useSelector } from "react-redux";
import { Loader } from '../loader/Loader';
import Select from './select/Select';
import { Page } from "./page/Page";

export const Main:React.FC=(props:any)=>{
    
    const appState = useSelector((state:RootState)=>state);
    let showNotFoundMsg = false;

    let card = appState.filterAndSort.libraryToRender.map((book)=>{
    return <Card isPicked={book.isPicked} id={book.id} key={book.id} publisher={book.publisher} name={book.name} year={book.year} img={book.img} alt={book.alt} />
    })

    if(card.length===0 && appState.fetch.isLoadingDone){
        showNotFoundMsg = true ;
    }else{
        showNotFoundMsg = false ;
    }

    let offset = 0;
    
   


    return(
        <main className="main">
{/* ---------------------------------------------------- */}
            {!appState.fetch.isLoadingDone?null:
            <div className="main-head">
                <Select/>
            </div>
            }
{/* ---------------------------------------------------- */}
           
{/* ---------------------------------------------------- */}
            <section className="main-body">
            { 
                showNotFoundMsg===true 
                ?<span className="not-found-msg"></span> 
                :null  
            }

            {
            appState.fetch.isLoading
            ?<Loader/>
            :<>
                {
                    appState.fetch.errorMsg!=null
                    ?<div className="error-msg">{appState.fetch.errorMsg}</div> 
                    :card                 
                }
            </>
            }
            </section>
{/* ---------------------------------------------------- */}
            {/* <div className="show-more-btn">
                <button >more</button>
            </div> */}
{/* ---------------------------------------------------- */}            
        </main>
    )
}