import React, { useEffect } from 'react';
import './App.scss';  
import { Slider } from './components/slider/Slider';
import { Sidebar } from './components/sidebar/Sidebar';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import { Navi } from './components/navbar/Navi';
import {FeedbackForm} from './components/popups/FeedbackForm';
import {useDispatch} from 'react-redux';
import {getFullLibrary,getFullLibrary_success,getFullLibrary_error} from './features/fetchSlice';



function App() {
  const dispatch=useDispatch();
 


 useEffect(()=>{
  fetch('https://comics-9c403-default-rtdb.europe-west1.firebasedatabase.app/library.json')
  .then(response=>response.json())
  .then((library)=>{
    dispatch(getFullLibrary());//запускает процес и показываеться загрузка
    return library
  })
  .then((library)=>{
    setTimeout(()=>{
      dispatch((getFullLibrary_success(library)));// full i later imeyut 24
      let payload = [];
      for(let i=0; i<6; i++){
        payload.push(library[i])
      } 
    },500)
   
  })
  .catch((e)=>{
    dispatch(getFullLibrary_error('При загрузке библиотеки призошла ошибка!'));
  })
 },[])



  return (
    <div className="App">
      <Header/>
      <Navi/>
      <Slider/>
      <div className="container">
          <div className='app-body'>
              <Sidebar/>
              <Main/>
          </div>
      </div>
      <FeedbackForm/>
      <Footer/>
    </div>
  );
}

export default App;
