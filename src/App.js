import React, {useState,useEffect } from 'react';
import './App.css';
import StateManager from './components/statemanager'
import Header from './components/header.js'
import { Routes, Route } from "react-router-dom";
import Test from './components/test'

function App(){

  const [stage, setStage] = useState(1)
  if(localStorage.getItem("authToken") && stage == 1){
    setStage(2)
    
  }
  <Routes>
    <Route path="/collection" element={<Test />} />
  </Routes>
  function checkToken(){
    if(localStorage.getItem("authToken")){
      let authToken
      try{
        authToken = JSON.parse(localStorage.getItem("authToken"))
      }catch(err){
        localStorage.clear()
        window.location.reload(false);
      }
      if(Date.now() > authToken.expires){
        localStorage.clear()
        window.location.reload(false);
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
      <div className='flex items-center justify-center'>
        <StateManager state={stage} stateFn = {setStage} />
      </div>
    </div>
  );
}

export default App;
