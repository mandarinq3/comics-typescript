import React, { useEffect, useRef } from "react";
import logo from '../../assets/logo.png';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, fromEvent} from "rxjs";
import { useDispatch, useSelector } from "react-redux";
import { setLibraryToRender } from "../../features/filterAndSortSlice";
import { setRef } from "../../features/refsSlice";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";


export const Header:React.FC=()=>{
    const appState = useSelector((state:RootState)=>state)
    const dispatch = useDispatch();
    const favoriteBtnRef:React.RefObject<HTMLDivElement> = useRef(null);

    let fromLocalStorage = JSON.parse(localStorage.getItem('favoriteBooks') as any)!=null 
        ? JSON.parse(localStorage.getItem('favoriteBooks') as any) 
        : [];//get
        
   
    useEffect(()=>{
        
        let searchInp=document.querySelector('#inp');
        if(searchInp!=null){
            fromEvent(searchInp,'input')
            .pipe(debounceTime(800))
            .subscribe((data)=>{
                
                dispatch(setLibraryToRender({
                    headers:{skipMW:false},
                    body:{data:null},
                })); 
            })
        } 

        dispatch(setRef({
            headers:{skipMW:true},
            body:{
                data:{
                    name:'showFavoritePopBtn',
                    ref:favoriteBtnRef.current
                }
            }
        }))
    },[])

  return(    
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="header-logo">
                            <Link to="/">
                            <img src={logo} alt="" />
                            </Link>
                            
                        </div>
                    </div>
                    <div className="col">
  

                        <input
                            id='inp'
                            type="search"
                            placeholder="поиск..."
                            disabled={appState.general.isDetailsShown}
                            style={{
                                visibility: appState.general.isDetailsShown ? 'hidden': 'visible' }}
                        />

                    </div>
                    
                    <div className="col">
                        <div className="header-favorite" ref={favoriteBtnRef}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </div>
                
                        <span 
                            style={{visibility:fromLocalStorage.length>0?'visible':'hidden'}}
                            className="header-favorite__count"
                        >{fromLocalStorage.length}</span> 
                    </div>
                </div>
            </div>
        </header>
    )
}