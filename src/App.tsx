import React, { createRef, useEffect, useRef, useState } from 'react';
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
import { setLibraryToRender } from "./features/filterAndSortSlice";
import { Favorites } from './components/popups/Favorites';
import { BookDetails } from './components/bookDetails/BookDetails';
import { BookReader } from './components/bookReader/BookReader';
import {Routes,Route} from 'react-router-dom';
import { Success } from './components/popups/Succes';





function App() {

  const dispatch=useDispatch();
  const appBodyRef:any = useRef();

 useEffect(()=>{
  fetch('https://comics-9c403-default-rtdb.europe-west1.firebasedatabase.app/library.json')
    .then(response=>response.json())
    .then((library)=>{
        dispatch(getFullLibrary(
          {
          headers:{skipMW:true},
          body:{
            data:[]
          }
        }));//запускает процес и показываеться загрузка
    return library
  })
  .then((library)=>{
    
    setTimeout(()=>{
      library.forEach((book:any)=>{
        book.isPicked = false; 
      })
      dispatch(getFullLibrary_success({
        headers:{ skipMW:true },
        body: { data: library},
      }));

      dispatch(setLibraryToRender({
        headers:{ skipMW:true},
        body:{data:library}
      }));

    },500)
   
  })
  .catch((e)=>{
    dispatch(getFullLibrary_error({
      headers:{ skipMW:true},
      body:{ data: 'При загрузке библиотеки призошла ошибка!' }
    }));
  })
  
 },[])

  return (
    <div className="App">
      <Header />
          <Navi/>
          {/* <Slider/> */}
          <div className="container" >
              <div className='app-body' data-picked=''>
                <Routes>
                  <Route path="/" element={<><Sidebar/><Main/></>} />
                  <Route path="/book-details" element={<BookDetails/>}/>
                  <Route path="/book-reader" element={<BookReader/>}/>
                </Routes>
              </div>
          </div>
          <Success/>
          <Favorites/>
          <FeedbackForm/> 
       <Footer/>
    </div>
  );
}

export default App;
