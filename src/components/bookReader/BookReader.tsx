import React, { useEffect, useState } from "react";
import './bookReader.scss';
import { useDispatch } from "react-redux";
import { setIsDetailsShown } from "../../features/generalSlice";
// -------------------------------------------------------------





export const BookReader:React.FC=(props:any)=>{
    const dispatch = useDispatch();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    let isFirstPage = pageNumber > 1 ?  false : true;
    let isLastPage = numPages!==null && pageNumber < numPages ?  false : true;

    // -------------------------------------------------
    let url = 'https://firebasestorage.googleapis.com/v0/b/comics-9c403.appspot.com/o/comics%2Fmarvel_comics%2F0%2Ffile.pdf?alt=media&token=e4602fe6-0ac7-4bd8-bec1-ff084e0f11e6';







    //-------------------------------------------------


   

    const onDocumentLoadSuccess = ({numPages}:any)=>{
        setNumPages(numPages);
        setPageNumber(1);
    }

    const changePage =(offSet:any)=>{
        setPageNumber(prevPageNumber=>prevPageNumber+offSet)
    }

    const changePageBack = () =>{
        changePage(-1);
    }

    const changePageNext = () =>{
        changePage(+1);
    }

    const pageControl = <div className="page-control page-control--top">
                
    <button 
        style={{visibility:pageNumber > 1 ?  'visible':'hidden'}}
        disabled={isFirstPage} 
        className="page-control-btn page-control-btn--prev"
        onClick={changePageBack}
    >&#10094;</button>

<span className="page-control-screen"> <p>{pageNumber}</p> ... <p>{numPages}</p></span>

    <button 
        style={{visibility:numPages!==null && pageNumber < numPages ?  'visible':'hidden'}}
        disabled={isLastPage} 
        className="page-control-btn page-control-btn--next"
        onClick={changePageNext}
    >&#10095;</button>

</div>;

useEffect(()=>{
    
    //--------------did mount----------

    dispatch(setIsDetailsShown(
        {
        headers:{skipMW:true},
        body:{data:true}
        }
        ))
    
    
    // --------------unmount------------
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
        <div className="book-reader">
            <a href="https://firebasestorage.googleapis.com/v0/b/comics-9c403.appspot.com/o/comics%2Fmarvel_comics%2F0%2Ffile.pdf?alt=media&token=e4602fe6-0ac7-4bd8-bec1-ff084e0f11e6">read</a>
            {pageControl}
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
            <Viewer
                    fileUrl='https://firebasestorage.googleapis.com/v0/b/comics-9c403.appspot.com/o/comics%2Fmarvel_comics%2F0%2Ffile.pdf?alt=media&token=e4602fe6-0ac7-4bd8-bec1-ff084e0f11e6' 
                    // cache={false}
                    // crossorigin="anonymous" 
                    httpHeaders={{
                        'Content-Type':'application/pdf'
                    }}  
                    
                />      
            </Worker> */}

            {/* <Document 
                className="document"
                file={file} 
                // file='https://firebasestorage.googleapis.com/v0/b/comics…=media&token=e4602fe6-0ac7-4bd8-bec1-ff084e0f11e6'
                onLoadSuccess={onDocumentLoadSuccess}>
                <Page 
                    className="page"
                    pageNumber={pageNumber}
                />  
            </Document> */}
            {pageControl}
        </div>
    )
}