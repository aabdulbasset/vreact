import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { HashRouter,Route,Routes } from "react-router-dom";
import Share from './components/share'
ReactDOM.render(
  <HashRouter>
  <Routes>
    <Route path= "" element={<App/>}>
    </Route>
    <Route path="collection" >
      <Route path=":id" element={<Share/>}></Route>
    </Route>
  </Routes>
  </HashRouter>
  ,
  document.getElementById('root')
);
