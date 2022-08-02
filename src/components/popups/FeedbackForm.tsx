import React from "react";
import './feedbackForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';





export const FeedbackForm:React.FC=(props:any)=>{
    return(
        <div className="feedback-bg"> 
                        <form className="feedback-form">
                            <div className="feedback-close-btn">
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

               