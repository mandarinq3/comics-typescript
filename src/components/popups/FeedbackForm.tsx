import React, { useEffect, useRef } from "react";
import './feedbackForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { setRef } from "../../features/refsSlice";
import { RootState } from "../../store/store";





export const FeedbackForm:React.FC=(props:any)=>{
    const appState = useSelector((state:RootState)=>state)
    const dispatch = useDispatch();
    const feedbackPopRef:any = useRef(null);

    
    

useEffect(()=>{
    dispatch(setRef({
        headers:{skipMW:true},
        body:{
            data:{
                name:'feedbackPop',
                ref:feedbackPopRef.current
            }
        }
    }))
},[])

const closeFeedbackPop = ()=>{
   feedbackPopRef.current.style.display='none'; 
}

    return(
        <div className="feedback-bg" ref={feedbackPopRef}> 
                        <form className="feedback-form">
                            <div 
                                className="feedback-close-btn"
                                onClick={closeFeedbackPop}
                            >
                                <FontAwesomeIcon icon={faXmark}/>
                            </div>
                            <h2>LET US KNOW</h2>
                            <input className="input name-inp" type="text" name="name" placeholder="Your name"/>
                            <input className="input mail-inp" type="mail" name="mail" placeholder="Email"/>
                            <input className="input phone-inp" type="phone" placeholder="Phone"/>
                            <p className="phone-exm">+38 (XXX) XXX - XX - XX</p>
                            <button className="feedback-send-btn" type="button">Send</button>
                        </form>           
        </div>
        
    )
}

               