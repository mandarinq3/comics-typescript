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
    const feedbackPopRef:React.RefObject<HTMLDivElement> = useRef(null);

    const closeFeedbackPop = ()=>{
        if(feedbackPopRef.current!==null){
            feedbackPopRef.current.style.display='none'; 
        } 
    }

    const showSuccessPop = () : void =>{
        appState.refs.refs.succesRef.style.display='flex';   
      }

      const showFeedbackPop = (display:'flex'|'none')=>{
        appState.refs.refs.feedbackPop.style.display=display;   
      }
   
    

    const formHandler=(e:React.FormEvent<HTMLFormElement>)=>{
//         REACT_APP_TELEGRAM_TOKEN = 5663565755:AAGNTtUt2d_c1wTIToV5XylZMNJf0472Ero
//   REACT_APP_TELEGRAM_CHAT_ID = 759178123
//   let message='our message from input';

        const form = e.target as HTMLFormElement;
        //.............elements
        const nameInput = form.elements[0] as  HTMLInputElement ;
        const emailInput = form.elements[1] as HTMLInputElement;
        const phoneInput = form.elements[2] as  HTMLInputElement ;
        const textarea = form.elements[3] as  HTMLTextAreaElement ;
        //.............values   
        const name:string =  nameInput.value;
        const email:string = emailInput.value;
        const phone:string = phoneInput.value;
        const text:string =  textarea.value;

        const message = `name: ${name} mail: ${email} phone:${phone} text: ${text}`

        const urlToSendMessage=`https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_TOKEN}/sendMessage?chat_id=${process.env.REACT_APP_TELEGRAM_CHAT_ID}&text=`;

        fetch(`${urlToSendMessage}${message}`)
        .then(()=>{
            showFeedbackPop('none');
            showSuccessPop();
        })
        .then(()=>{
            nameInput.value='';
            emailInput.value='';
            phoneInput.value='';
            textarea.value=''; 
        }); 
        
        
    }

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

    return(
        <div className="feedback-bg" ref={feedbackPopRef}> 
                        <form 
                            className="feedback-form"
                            onSubmit={(e)=>{
                                e.preventDefault();
                                formHandler(e);
                            }}
                            >
                            <div 
                                className="feedback-close-btn"
                                onClick={closeFeedbackPop}
                            >
                                <FontAwesomeIcon icon={faXmark}/>
                            </div>
                            <h2>написать нам</h2>
                            <div className="inputs-holder">
                            <input 
                                required
                                className="input name-inp" 
                                type="text"  
                                placeholder="Your name"/>
                            <input 
                                required
                                className="input mail-inp" 
                                type="email" 
                                placeholder="Email"/>
                            <input 
                                required
                                className="input phone-inp" 
                                type="phone" 
                                placeholder="Phone"/>
                            <textarea
                                required
                                className="input"></textarea> 
                            </div>
                            
                            <button 
                                className="feedback-send-btn" 
                                type="submit">отправить</button>
                        </form>           
        </div>
        
    )
}

               