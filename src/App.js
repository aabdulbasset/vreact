import React, {useState,useEffect } from 'react';
import './App.css';
import StateManager from './components/statemanager'
import Header from './components/header.js'
import {ToastContainer} from 'react-toastify'
import Footer from './components/footer'
function App(){

  const [stage, setStage] = useState(1)
  if(localStorage.getItem("authToken") && stage == 1){
    setStage(2)
    
  }
  async function checkToken(){
    if(localStorage.getItem("authToken")){
      let authToken
      try{
        authToken = JSON.parse(localStorage.getItem("authToken"))
      }catch(err){
        localStorage.clear()
        window.location.reload(false);
      }
      if(Date.now() > authToken.expires){
        //try to reauth if it failes ask for a relogin
        try{
          let url = "https://valohubapi.herokuapp.com/auth/reauth"
          let cookie = JSON.parse(localStorage.getItem("prevCookie"))
          if(cookie == null){
            throw new Error("No cookie found")
          }
          let response = await fetch(url,{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"prevCookie":cookie.list})
          })
          const date= new Date
          let data = await response.json()
          let expires = date.getTime() + 57*60000
          localStorage.setItem("authToken",JSON.stringify({"value":data.authToken,"expires":expires}))
          localStorage.setItem("entToken",data.entToken)
          localStorage.setItem("prevCookie",JSON.stringify({"list":data.prevCookie,"expires":7*24*60*60000}))
          window.location.reload(false); 
        }catch(err){
          console.log(err)
          localStorage.clear()
          window.location.reload(false);
        }
        
      }

    }
  }
  useEffect(() => {
    checkToken()
    const interval = setInterval(checkToken, 10*60000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      < Header state = {stage} stateFn = {setStage}></Header>
      <div className='flex items-center justify-center flex-col gap-y-8'>
        <StateManager state={stage} stateFn = {setStage} />
        <ToastContainer />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
