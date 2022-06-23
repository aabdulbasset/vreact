import React from 'react'
import LoginClass from './login'
import Store from './store'
import Collection from './collection'
import Gameinfo from './gameinfo/gamenfo'
function StateManager(props){
    const url = process.env.REACT_APP_APIURL || "https://valohubapi.herokuapp.com"
    if(props.state == 1){
        return <LoginClass url={url} stateFn = {props.stateFn} />
    }else if(props.state ==2 ){
        return <Store url = {url} />
    }else if(props.state == 3){
        return <Collection url = {url} />
    }else if(props.state == 4){
        return <Gameinfo/>
    }
}

export default StateManager