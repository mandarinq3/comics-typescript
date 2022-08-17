import React, { useEffect, useRef } from "react";
import './success.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; 
import { useDispatch, useSelector } from "react-redux";
import { setRef } from "../../features/refsSlice";
import { RootState } from "../../store/store";





export const Success:React.FC=(props:any)=>{
    const appState = useSelector((state:RootState)=>state);
    const dispatch = useDispatch();
    const succesRef:any = useRef(null);

useEffect(()=>{
    dispatch(setRef({
        headers:{skipMW:true},
        body:{
            data:{
                name:'succesRef',
                ref:succesRef.current
            }
        }
    }))
},[])

const closeFeedbackPop = ()=>{
    succesRef.current.style.display='none'; 
}

    return(
        <div className="success-bg" ref={succesRef}> 
                        <div className="success">
                            <div 
                                className="success-close-btn"
                                onClick={closeFeedbackPop}
                            >
                                <FontAwesomeIcon icon={faXmark}/>
                            </div>

                            <div className="success-icon-holder">
                                <FontAwesomeIcon icon={faCheck} className="success-icon"/>
                            </div>
                            <span className="success-text">success</span>
                        </div>           
        </div>
        
    )
}

               