import React, { useEffect, useState } from "react";
import './favorites.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setLibraryToRender } from "../../features/filterAndSortSlice";
import { Link } from "react-router-dom";

export const Favorites:React.FC=(props:any)=>{
    const appState = useSelector((state:RootState)=>state);
    const dispatch = useDispatch();
    const [showPop, setShowPop] = useState(false);

    const fromLocalStorage = JSON.parse(localStorage.getItem('favoriteBooks') as any)!=null ? JSON.parse(localStorage.getItem('favoriteBooks') as any) : [];//get

    
    const pickedBooks=appState.fetch.libraryFull.filter((book)=>{
       return  fromLocalStorage.some((id:number)=>{
            return book.id === id 
        })       
    })

    const deleteFromFavorites = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        const element = e.target as HTMLElement;
        let currentId = element.dataset.id ? parseInt(element.dataset.id) : undefined;
        let fromLocalStorage = JSON.parse(localStorage.getItem('favoriteBooks') as any)!=null ? JSON.parse(localStorage.getItem('favoriteBooks') as any) : [];//get
        let indexOfCurrentElement = fromLocalStorage.indexOf(currentId);
        
        fromLocalStorage.splice(indexOfCurrentElement,1); 
        
        localStorage.setItem('favoriteBooks',JSON.stringify(fromLocalStorage))//set
        
        dispatch(setLibraryToRender({
            headers:{skipMW:false},
            body:{
                data:null
            }
        }));
        
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

    const listItem = pickedBooks.map((book)=>{
  
                return <li key={book.id} className="favorites-list__item">
                <div className="item-col item-col--left">
                <div className="item-img-holder">
                <img src="https://cdn.vox-cdn.com/thumbor/sxmXSDsfMFcVFsUYZPi32cOBS9o=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/23160898/MONKEYPRINCE_Cv1.jpg" alt="" />
                </div>
                </div>
                <div className="item-col item-col--right">
                <div className="row row--top">
                <h4 className="item-title">{book.name}</h4>
                </div>
                <div className="row row--bottom">  
                    <button 
                        data-id={book.id}
                        className="item-btn item-btn--details"
                        onClick={(e)=>{
                            setPickedBook(e);
                            setShowPop((prev)=>{
                                return !prev;
                            })
                        }    
                        }
                    >
                        <Link to="/book-details">подробнее</Link>
                    </button>
                <button 
                    data-id={book.id}
                    className="item-btn item-btn--delete" 
                    onClick={(e)=>{
                        deleteFromFavorites(e);
                    }}
                >удалить</button>
                </div>
                </div>
            </li>
       
    });

    const popDisplayOption = {
        display:'none',
    }
   
    popDisplayOption.display=showPop ? 'flex' : 'none';
   
    const closePop=(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        setShowPop((prev)=>{
            return !prev;
        })
    }

    useEffect(()=>{
        if(appState.refs.refs.showFavoritePopBtn!==undefined){
            appState.refs.refs.showFavoritePopBtn.addEventListener('click',()=>{
                setShowPop((prev)=>{
                    return !prev;
                })  
            },);
        };
    },[appState.refs.refs.showFavoritePopBtn])

    let hasFavorites = false;

   if( listItem.length===0){
        hasFavorites = false
   }else{
        hasFavorites = true;
   }

    
    return(
        <div 
            className="favorites-bg" 
            style={popDisplayOption}
        >
            <div className="favorites-pop"> 
                <div 
                    className="favorites-close-btn" 
                    onClick={(e)=>{
                        closePop(e)
                    }}
                >
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
                { hasFavorites===false ? <span className="no-favorites-msg"></span> : null}
                <ul className="favorites-list">
                {listItem}
                </ul>   
            </div>         
        </div>
        
    )
}

               