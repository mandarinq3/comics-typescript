//select interfaces and types
interface ISelectProps {
    sortBy?:string | null,
     sortDirection?:string | null | undefined,
}

let selectProps:ISelectProps = {
    sortBy:null,
    sortDirection:null,
}

export const filterAndSortMW = (store:any)=>(next:any)=>(action:any)=>{ 

    let pickedBooks:any=JSON.parse(localStorage.getItem('favoriteBooks') as any)!=null?JSON.parse(localStorage.getItem('favoriteBooks') as any) : []; 
    
    if(action.payload.headers.skipMW!==true){        
                      
        //elements
        let appBody = document.querySelector('.app-body') as HTMLElement;
        let searchInp:any = document.querySelector('#inp');
        
        //element values
        let searchInpValue = searchInp.value;
        let pickedPublishers:string[]=[];

        if( appBody.dataset.picked!==''){
            if(appBody.dataset.picked!==undefined){
                pickedPublishers=JSON.parse(appBody.dataset.picked);
            }
            
        }
        
        

        //full library
        const [...libraryFull]=store.getState().fetch.libraryFull;

        type digitSortDirection = 'maxfirst' | 'minfirst';
        type digitSortBy = 'id' | 'year';
        type stringSortDirection = 'А-Я' | 'Я-А';
        type stringSortBy = 'name';

        

        //update select props
        //срабатывает только когда выбран select так как он при dispatch кладет в payload.body.data == обьект , а в остальных случаях в payload.body.data кладеьтся null
        if(action.payload.body.data!==null){
            if(action.payload.sortDirection==='default'){
                selectProps.sortBy=null;
                selectProps.sortDirection=null;
            }else{
                selectProps=action.payload.body.data;
            }              
        } 
        

const stringTypeSort = ()=>{
    
let sortResult:any[];

    return (sortBy:stringSortBy,direction:stringSortDirection,libraryForSort:any)=>{
        let key=sortBy;
        if(direction==='А-Я'){
            if(libraryForSort.length>0){           
                sortResult=libraryForSort.sort((a:any,b:any)=>{
                    if(b[key][0]>a[key][0]){
                        return -1
                    }
                })
            }
        }

        if(direction==='Я-А'){
            if(libraryForSort.length>0){        
                sortResult=libraryForSort.sort((a:any,b:any)=>{
                    if(b[key][0]<a[key][0]){
                        return -1
                    }
                })
            }
        }
        return sortResult;
    }    
}

const digitTypeSort = () => {
   
    let sortResult:any[];    
    
    return (sortBy:digitSortBy,direction:digitSortDirection,libraryForSort:any)=>{
        let key=sortBy;
        if(direction==='maxfirst'){
            if(libraryForSort.length>0){
            
                sortResult=libraryForSort.sort((a:any,b:any)=>{
                    return b[key]-a[key]
                })
            }
        }
        
        if(direction==='minfirst'){
            if(libraryForSort.length>0){
                sortResult=libraryForSort.sort((a:any,b:any)=>{
                    if(b[key]>a[key]){
                        return -1
                    }
                })
            }
        }
        return sortResult;
    }
}

//=============================step 1=================================
        const byPublisher=()=>{ 
           
            let result:any = [];
            //фильтруем библиотеку если выбран хотябы один издатель и возвращаем отфильтрованный массив иначе в резултат кладем всю библиотеку
    //==============================if
            if(pickedPublishers.length>0){

                libraryFull.forEach((book:any)=>{
                    pickedPublishers.forEach((pickedPublisher)=>{
                        if(pickedPublisher===book.publisher){
                            result.push(book);
                        }
                    })
                })
            }
    //===============================else      
            else{
                result=libraryFull;
            }  
            return result;
        }
//================================step 2==============================
        const bySearch=(lib=byPublisher())=>{//тут в аргументе будет либо вся библиотека либо отфильтрованная
           
            let result:any = [];
            let exp = new RegExp(`${searchInpValue}`,'gi')
    //==============================if        
             if(searchInpValue.length>0){
                lib.forEach((book:any)=>{
                    if(book.name.match(exp)!==null){
                        result.push(book);
                    }     
                })
             }
    //===============================else
             else{
                result=lib;
             }
             return result;  
        } 
     
//=================================step 3=============================
        const bySort=(lib=bySearch())=>{
            
            let result:any = [];
//если выбран тип сортировки то отсортировать lib
//если нет то просто прокинуть его дальше

            if(selectProps.sortBy!==null){
                //-------------name-----------------
                if(selectProps.sortBy==='name'){
                    const cb=stringTypeSort();
                    if(selectProps.sortDirection==='А-Я'){
                        result=cb(selectProps.sortBy,'А-Я',lib);
                    }else{
                        result=cb(selectProps.sortBy,'Я-А',lib);
                    }
                }
                //-------------id------------
                if(selectProps.sortBy==='id'){
                    const cb=digitTypeSort();
                    
                    if(selectProps.sortDirection==='новые'){
                        result=cb(selectProps.sortBy,'maxfirst',lib);
                    }
                    else{
                        result=cb(selectProps.sortBy,'minfirst',lib);
                    }
                    
                }
                //-------------year------------
                if(selectProps.sortBy==='year'){
                    const cb=digitTypeSort();
                    if(selectProps.sortDirection==='новые'){
                        result=cb(selectProps.sortBy,'maxfirst',lib);
                    }
                    else{
                        result=cb(selectProps.sortBy,'minfirst',lib);
                    }
                    
                }
                
            }
//прокидываем дальше нетронутую библиотеку
            else{
                result=lib;
            }
           return result
        }
        action.payload.body.data=bySort();    
}       


// ============================================================== 
    // if(action.type!=='refs/setRef' ){
        if(action.type==='filterAndSort/setLibraryToRender'){

        if(pickedBooks.length>0){
            let dataCopy = JSON.parse(JSON.stringify(action.payload.body.data))
           
                dataCopy.forEach((book:any)=>{
                    pickedBooks.forEach((id:number)=>{
                        if(book.id===id){
                            book.isPicked = true;
                        }
                    })
                })
                action.payload.body.data = dataCopy;
         } 
    }
    
         

    next(action);    
}
