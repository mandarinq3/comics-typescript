import React from "react";
import './select.scss';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from "react-redux";
import {filterProps} from "../../../filter-select-props/filter-props";
import { setLibraryToRender } from "../../../features/filterAndSortSlice";



const Select:React.FC=(props:any)=>{

    const appState = useSelector((state:RootState)=>state);
    const dispatch = useDispatch();

//------------------------------------------------------------------------------------
    const resetOtherSelects = (e:React.ChangeEvent<HTMLSelectElement>) => {
        let selectsAll=document.querySelectorAll('.main-head-select');

        selectsAll.forEach((sel:any)=>{
            if(sel.dataset.sortby!==e.target.dataset.sortby){
                sel.selectedIndex=0;
            }
        })
    }
    
//------------------------------------------------------------------------------------
const selectHandler=(e:React.ChangeEvent<HTMLSelectElement>)=>{

    resetOtherSelects(e);

    dispatch(setLibraryToRender({
        headers:{skipMW:false},
        body:{
            data:{
                sortBy:e.target.dataset.sortby,
                sortDirection:e.target.value
        }}
    }));
    
}


//создает селекты в мейн хеде: Чтобы добавить еще один то нужно перейти в файл filterProps.tsx и добавить там
    const selects = filterProps.map((item,i)=>{       
        return <div key={i} className="main-head-selects-holder">
        <label>{item.label}</label>
        <select 
        className="main-head-select" 
        data-sortby={item.sortBy}
        onChange={(e)=>{
            selectHandler(e);
        }}>
            {
                item.options.map((option,i)=>{
                    if(option==='☰'){
                        return <option 
                        key={option}
                        className="main-head-select__option" 
                        value='default'
                        data-type={item.sortBy}
                        >{option}</option> 
                    }else{
                        return <option 
                        key={option}
                        className="main-head-select__option" 
                        value={option}
                        >{option}</option>
                    }
                    
                })
            }     
        </select>
        </div>
    })
//-------------------------------------------------------------------------------------------------------------
    return(
        <>
            {selects}
        </>
    )
}

export default Select;