import React, { Ref, useRef, useState } from "react";
import './sidebar.scss';
import { RootState } from '../../store/store';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { setLibraryToRender } from "../../features/filterAndSortSlice";

// import {setIsFirstRender} from '../../features/fetchSlice';


//нужно сделать массив из выбранных издателей сделать stringify и назначить в качестве data атррибута UL. а если не выбран никто то добавить All а если есть то убрать

export const Sidebar:React.FC=(props:any)=>{

    
    const appState = useSelector((state:RootState)=>state);
    const dispatch=useDispatch();
     
    const [pickedPublishers, setPickedPublishers] = useState([] as string[])
    
    let hasCurrent;  
    
    
    // выделяет выбранных издадетелей
    const markPickedElement = (el:HTMLElement):void=>{
        let [...elems]:any=document.querySelectorAll('.aside-navi-list__item');
        let AllPublishersEl = document.querySelector('.aside-navi-list__item[data-id="All"]');

        if(el.dataset.id!=='All'){ 
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
        const element = e.target as any;
        markPickedElement(element);
        if(element.dataset.id==='All'){
            pickedPublishers.splice(0);          
        }else{
            let i=pickedPublishers.indexOf(element.dataset.id) ;
            //если i меньше 0 значит такого элемента нет и можно его добавить в массив а если больше нуля нужно вырезать из массива этот элемент
            if(i===-1 && element.dataset.id!=='All'){
                pickedPublishers.push(element.dataset.id);
            }else{
                pickedPublishers.splice(i,1);
            }   
        }

        //кладем в дата атрибут массив из выбранных издателей в виде строки чтобы потом из миддл вейр получить к ним доступ
        const appBody = document.querySelector('.app-body') as HTMLElement;
        
        if(appBody!==null){
            appBody.dataset.picked=JSON.stringify(pickedPublishers);
        }
        


        
        dispatch(setLibraryToRender({
            headers:{skipMW:false},
            body:{data:null},
        }));    
    }   
    
    let libCopy=JSON.parse(JSON.stringify(appState.fetch.libraryFull));
    
    let pubsNotFiltered=libCopy.map((item:any)=>{
        return item.publisher;
    })

    let pubsFiltered:string[] = [];

    pubsNotFiltered.forEach((p:string)=>{
        if(!pubsFiltered.includes(p)){
            pubsFiltered.push(p)
        }
    })


    let lItem=pubsFiltered.map((pbs)=>{
        return <li 
        key={pbs}
        data-id={pbs} 
        className="aside-navi-list__item" 
        onClick={(event)=>{
            publishersHandler(event);
        }}>{pbs}</li>
    })

    
    
  
    

    return(
        <aside 
        className="aside" 
        >
            {!appState.fetch.isLoadingDone?null:
            <nav className="aside-navi">
                <h3 className="aside-navi__title">publishers</h3>
                <ul className="aside-navi__list" >
                    <li 
                    data-id="All" 
                    className="aside-navi-list__item current"    
                    onClick={(event)=>{
                            publishersHandler(event);
                    }} 
                    >All</li>
                    {lItem}
                </ul>
            </nav>
}
        </aside>
    )
}