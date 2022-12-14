import React, { useEffect, useState } from "react";
import './bookDetails.scss';
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsDetailsShown } from "../../features/generalSlice";
import { nanoid } from "nanoid";
import { NewForm } from "./NewForm";
import { setUserAndToken } from "../../features/authSlice";

interface IPickedBook {
    id: number;
    publisher: string;
    name: string;
    year: number;
    img: string;
    alt: string;
    file:string;
    description:string;     
}

interface ICmcsData {
    user: string | null,
    token:string | null,    
}

interface IShowFormOptions {
    showCommentForm: boolean;
    showLoginForm: boolean;
    showRegisterForm: boolean;
    showMsgScreen: boolean;
}

export const BookDetails:React.FC=()=>{



 const appState=useSelector((state:RootState)=>state);

 const dispatch = useDispatch();

    

 const [pickedBook, setPickedBook] = React.useState<IPickedBook>(
    JSON.parse(localStorage.getItem('pickedBook') as any) != null 
  ? JSON.parse(localStorage.getItem('pickedBook') as any) 
  : {}
  );

 const [cmcsData,setCmcsData] = React.useState<ICmcsData>(
        JSON.parse(localStorage.getItem('cmcs_data') as any) != null 
      ? JSON.parse(localStorage.getItem('cmcs_data') as any) 
      : {
            user:null,
            token:null,
        }
    );

const [bookComments, setBookComments] = useState([]);

const [showFormOptions, setShowFormOptions]=React.useState<IShowFormOptions>({
    showCommentForm: cmcsData.token===null ? false : true,
    showLoginForm:false,
    showRegisterForm:false,
    showMsgScreen: cmcsData.token===null ? true : false ,
 });

 const [emailError , setEmailError] = React.useState<string>();
 const [passwordError, setPasswordError] = React.useState<string>();
 const [confirmPasswordError, setConfirmPasswordError] = React.useState<string>();


const getAndSetAllComments = () : void => {
    fetch(`https://comics-9c403-default-rtdb.europe-west1.firebasedatabase.app/library/${pickedBook.id}.json`,
    {
    method:"GET",
    headers:{
        'Content-Type':'application/json'
    },
    })

    .then((res)=>{    
    return res.json();    
    })

    .then((data)=>{   
        setBookComments( data.comments!==undefined ? data.comments : []);
    })
}

 const commentHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{

    const form = e.target as HTMLFormElement;
    const textareaInput = form.elements[0] as HTMLInputElement;
    const text:string = textareaInput.value;

    let [...bookCommentsCopy] : any  = bookComments ? bookComments  : [];
    
    if(textareaInput.value!==''){

        let newComment = {
            id: nanoid(),
            user:cmcsData.user,
            date:new Date().toLocaleString(),
            text:text,
        }

        bookCommentsCopy.push(newComment);
           
        fetch(`https://comics-9c403-default-rtdb.europe-west1.firebasedatabase.app/library/${pickedBook.id}.json?auth=${cmcsData.token}`,{
            method:"PATCH",
            headers:{ 'Content-Type':'application/json'}, 
            body:JSON.stringify({ comments:bookCommentsCopy })
        })
            .then(response => response.json())
            .then((data)=>{ 
                textareaInput.value = '';
                textareaInput.classList.remove('error-border');
            })
            .catch((error)=>{
                console.log(error);
                console.log(error.message);    
            })
            setBookComments(bookCommentsCopy);
    }
    else{
        textareaInput.classList.add('error-border');
    }
}


 const loginHandler = (e: React.FormEvent<HTMLFormElement>) =>{
    
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements[0] as HTMLInputElement;
    const passwordInput = form.elements[1] as HTMLInputElement;
    const email:string = emailInput.value;
    const password:string = passwordInput.value;

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzitYqzLboH0ImVFzG6uljY0fcgIfCVt0`,{
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ email, password, returnSecureToken:true})
        })
        .then(response=>response.json())
        .then((data)=>{
            
            if(!data.hasOwnProperty('error')){
                // ..... success
                setEmailError('');
                setPasswordError('');

                dispatch(setUserAndToken({
                    headers:{skipMW:true},
                    body:{ data:{
                        user:data.email,
                        token:data.idToken,
                    }}
                }));

                localStorage.setItem('cmcs_data', JSON.stringify({
                    user:data.email,
                    token:data.idToken
                }));

                setCmcsData({
                    user:data.email,
                    token:data.idToken
                })

                setShowFormOptions({
                    showCommentForm:true,
                    showLoginForm:false,
                    showRegisterForm:false,
                    showMsgScreen:false,
                })

                showSuccessPop();            
                
            }
            else{
                //.......error
                if(data.error.message===process.env.REACT_APP_EMAIL_NOT_FOUND){
                    //email error
                    setEmailError('???????????????????????? ???? ????????????');
                    setPasswordError('');
                }

                if(data.error.message===process.env.REACT_APP_INVALID_PASSWORD){
                    //password error
                    setEmailError('');
                    setPasswordError('???????????????? ????????????');
                }
            }
        })
        .catch((error)=>{
            console.log(error);
        }) 
}

const registerHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    const form = e.target as HTMLFormElement;
//.............elements
    const emailInput = form.elements[0] as HTMLInputElement;
    const passwordInput = form.elements[1] as  HTMLInputElement ;
    const confirmPasswordInput = form.elements[2] as  HTMLInputElement ;
//.............values   
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if(password!==confirmPassword){
          
            setConfirmPasswordError('???????????? ???? ??????????????????');
        
        return
    }else{
        setConfirmPasswordError('');

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzitYqzLboH0ImVFzG6uljY0fcgIfCVt0',{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({ email, password, returnSecureToken:true })
        })
            .then(response=>response.json())
            .then((data)=>{
                if(!data.hasOwnProperty('error')){
                    // ..... success
                    setEmailError('');

                    dispatch(setUserAndToken({
                        headers:{skipMW:true},
                        body:{ data:{
                            user:data.email,
                            token:data.idToken,
                        }}
                    }));
    
                    localStorage.setItem('cmcs_data',JSON.stringify({
                        user:data.email,
                        token:data.idToken
                    }));

                    setCmcsData({
                        user:data.email,
                        token:data.idToken
                    })
    
                    setShowFormOptions({
                        showCommentForm:true,
                        showLoginForm:false,
                        showRegisterForm:false,
                        showMsgScreen:false,
                    })   

                    showSuccessPop();             
                }
                
                else{
                    //.......errors
                    if(data.error.message===process.env.REACT_APP_EMAIL_EXISTS){                        
                        //email error
                        setEmailError('???????????????????????? ?????? ??????????????????????????????');
                        setPasswordError('');
                        setConfirmPasswordError('');

                    }

                    if(data.error.message===process.env.REACT_APP_WEAK_PASSWORD){                   
                        //email error
                        setEmailError('');
                        setPasswordError('???????????????? ????????????. ?????????????? 6 ????????????????');
                        setConfirmPasswordError('');
                    }

                    if(data.error.message===process.env.REACT_APP_INVALID_EMAIL){
                        setEmailError('?????????????????????? email');
                        setPasswordError('');
                        setConfirmPasswordError('');
                    }

                }
                
            })
            .catch((error)=>{ console.log(error)})
    }
}

const showSuccessPop = () : void =>{
    appState.refs.refs.succesRef.style.display='flex';   
  }


//================== generate html comments===========
const comments = bookComments.map((comment:{id:string,user:string,date:string,text:string})=>{
    return <div key={comment.id} className="comment">
    <div className="comment-col--left">
    <span className="users-name">{comment.user}</span>
    <i className="comment-date">{comment.date}</i>
    </div>
    <div className="comment-col--right">
    <span className="users-comment">{comment.text}</span> 
    </div>
    </div> 
 })
//=====================================================

useEffect(()=>{
    //--------------did mount-----------
    
        dispatch(setIsDetailsShown(
            {
                headers:{skipMW:true},
                body:{data:true}
            }
            ))
        getAndSetAllComments();
        
    // --------------did unmount------------
    return ()=>{

        dispatch(setIsDetailsShown(
            {
            headers:{skipMW:true},
            body:{data:false}
            }
            )) 
        }

    },[])
    
    return(
        <div className="details">
          <div className="details-body">

            <aside className="details-aside">
                <div 
                    className="aside-col aside-col--top" 
                    style={{backgroundImage:`url(${pickedBook.img})`}}
                ></div>
                <div className="aside-col aside-col--middle">
                    <h3 className="book-title">{pickedBook.name}</h3>
                    <span className="book-publisher">{pickedBook.publisher}</span>
                    <span className="book-year">{pickedBook.year}</span>
                </div>

                <div className="aside-col aside-col--bottom">
                <a href={pickedBook.file}
                ><button className="read-btn">????????????</button></a>
                </div>
            </aside>


        <main className="details-main">
            <div className="details-main-row--top">
                <h2>????????????????</h2>
            </div>
            <div className="details-main-row--bottom">
                <span>{pickedBook.description}</span>
            </div>
        </main>
          
          
        <div className="details-comments">
        <h3>???????????????? ??????????</h3>
            <div className="details-comments-row details-comments-row__top "> 
             <div className="details-comment-col">
{/* ========================================================= */}
                {   showFormOptions.showMsgScreen
                    ?<>
                    <div className="msg-screen">
                        <h5>?????????????? ?????? ??????????????????????????????????<br/>?????????? ???????????????? ??????????</h5>
                        <button
                        onClick={()=>{
                            setShowFormOptions({
                                showCommentForm:false,
                                showLoginForm:true,
                                showRegisterForm:false,
                                showMsgScreen:false,
                            })
                        }}
                        >??????????</button>
                        <button
                        onClick={()=>{
                            setShowFormOptions({
                                showCommentForm:false,
                                showLoginForm:false,
                                showRegisterForm:true,
                                showMsgScreen:false,
                            })
                        }}
                        >?????????????? ?? ??????????????????????</button>
                    </div>
                    </>
                    : null
                             
                }
{/* ========================================================= */}
                {   showFormOptions.showLoginForm     
                    ?
                    <>
                        <NewForm
                            btnValue="??????????"
                            handler={loginHandler}
                            content={
                                <>
                                <input required type="email" placeholder="email" />
                                <p className="input-error">{emailError}</p>
                                <input required type="password" placeholder="????????????" />
                                <p className="input-error">{passwordError}</p>
                                </>
                            }
                        />
                        <button 
                            className="btn--switch"
                            onClick={()=>{
                                setShowFormOptions({
                                    showCommentForm:false,
                                    showLoginForm:false,
                                    showRegisterForm:true,
                                    showMsgScreen:false,
                                })
                            }}
                        >????????????????????????????????????</button>
                    </>
                    : null
                }
{/* ========================================================= */}
                {   showFormOptions.showRegisterForm
                    
                    ?
                    <>
                        <NewForm
                            btnValue="????????????????????????????????????"
                            handler={registerHandler}
                            content={
                                <>
                                <input required type="email" placeholder="email" />
                                <p className="input-error">{emailError}</p>
                                <input required type="password" placeholder="????????????" />
                                <p className="input-error">{passwordError}</p>
                                <input required type="password" placeholder="?????????????????????? ????????????"/>
                                <p className="input-error">{confirmPasswordError}</p>
                                </>
                            }
                        />
                        <button 
                            className="btn--switch"
                            onClick={()=>{
                                setShowFormOptions({
                                    showCommentForm:false,
                                    showLoginForm:true,
                                    showRegisterForm:false,
                                    showMsgScreen:false,
                                })
                            }}
                        >?????? ???????? ??????????????</button>
                    </>
                    : null
                }

{/* ========================================================= */}
            { showFormOptions.showCommentForm
                    ? 
                    <>
                        <NewForm
                            btnValue="??????????????????"
                            handler={commentHandler}
                            content={
                                <>
                                <textarea 
                                    className="details-comment-textarea" 
                                    rows={50} 
                                    cols={40}
                                    onInput={(e)=>{
                                        let el = e.target as HTMLTextAreaElement;
                                        el.classList.remove('empty-textarea');                   
                                    }}  
                                    >
                                </textarea>
                                </>
                            }/>
                    </>
                    : null
            }
{/* ========================================================= */}
            </div>   
            </div>
{/* ----------------------------------------------------- */}
            <div className="details-comments-row details-comments-row__bottom ">
            <h3>???????????? ??????????????????</h3>
{/* --------------------------------------- */}
            {comments}
{/* --------------------------------------- */}
            </div>
        </div>
{/* --------------------------------------- */}

        </div>
        </div> 
    )
}