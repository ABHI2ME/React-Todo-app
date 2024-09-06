import React, { useState , useEffect } from 'react' ;
import "./App.css"
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";



const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollHeight > clientHeight && scrollTop + clientHeight >= scrollHeight - 20) {
        document.body.style.marginBottom = '100px';
      } else {
        document.body.style.marginBottom = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const [InputItems , setInputItems] = useState("") ;
  const [edit , setEdit] = useState(false) ;
  const [newDivItems  , setNewDivItems] = useState(()=>{
      const store = localStorage.getItem("remember") ;
      return store ? JSON.parse(store) : [] ;
  }) ;
   
  useEffect(()=>{
    localStorage.setItem("remember" , JSON.stringify(newDivItems)) ;
  } , [newDivItems]); 
  
  function editNewDiv(idd){
    const element =  newDivItems.filter((item)=>{
          if(item.id === idd)return item ;
      }) ;

      const val =  newDivItems.map((item)=>{
           if(item.id === idd){
              return {...item , active: !item.active} ;
           }
           else{
            return item ;
           }
         }) ; 
      setEdit(true) ;
      setNewDivItems(val) ;
      setInputItems(element[0].text) ;
      
  }

  function deleteNewDivs(){
     setNewDivItems([]) ;
  }

  function deleteSingleDiv(idd){
      const newArray  = newDivItems.filter((items)=>{
          if(items.id !== idd)return items ;
      }) ;
      setNewDivItems(newArray) ;
  }

  function addToNewDiv(){
    if(InputItems !== "" && edit === false ){
      console.log("welcome new") ;
       const data = {
         text : InputItems , 
         id : new Date().getTime(),
         isToggleInput : false ,
         active : false 
       }
       setNewDivItems([...newDivItems , data]) ;
       setInputItems("") ;
    }
    else if(InputItems != "" && edit === true){
        console.log("welcome") ;
         const val = newDivItems.map((item)=>{
              if(item.active === true){
                 return {...item , active: !item.active , text : item.text = InputItems} ;
              }
              else{
                return item;
              }
           }) ;
        setNewDivItems(val) ;
        setInputItems("") ;
        setEdit(false) ;
    }
    else{
      alert("plaese enter your task") ;
    }
  }

  const toggleInputChange = (idd) => {
    const updatedItems = newDivItems.map((item) => {
      if (item.id === idd) {
        return { ...item, isToggleInput: !item.isToggleInput }; // why the hell this thing written ? what the fuck :> ??
      }
      return item;
    });
    setNewDivItems(updatedItems);
  };

  return (
    <>
      <div className='container'>
          <div className='main'>
             <div  className='main-image'>
                 <img className='main-image-img' src='./images/checklist.png' alt='Logo'></img>
             </div>
             <div className='main-input'>
                
                 <input type="text" value={InputItems} onChange={(e)=>{
                     setInputItems(e.target.value) ;
                 }}  placeholder="Enter text here..." />
                 <button className='.main-input-button' onClick={addToNewDiv}><FaPlus className='main-input-i' /></button>
                
             </div>
             {/* adding new divs */}
             <div className='new-div-container'>
                  {newDivItems.map((currEl)=>{
                      return(
                        <>
                            <div className='new-div' key={currEl.id}>
                                <input className='new-div-input' checked={currEl.isToggleInput} onChange={()=>{
                                  toggleInputChange(currEl.id) ;
                                }} type='checkbox'></input>
                                <span  className = {`new-div-text ${currEl.isToggleInput ? "crossed" : ""} `} >{currEl.text}</span>
                                
                                <MdModeEdit className='new-div-edit-btn' onClick={()=>editNewDiv(currEl.id)} />
                                <MdDeleteForever className='new-div-delete-btn' onClick={()=>deleteSingleDiv(currEl.id)} />
                                
                                
                               
                               </div>
                        </>
                      );
                    
                  })}
             </div>
             <div className='checklist'> 
                     <button onClick={deleteNewDivs} className='checklist-btn'>Checklist</button>
             </div>
          </div>
      </div>
    </>
  )
}

export default App ;
