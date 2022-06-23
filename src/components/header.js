import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShop,faGamepad,faBriefcase,faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
let stateFn
function manageButtons(state,reqState){
    let base = "md:w-10 md:h-10 w-5 h-5 pb-1 mr-4 hover:scale-110 transition-all duration-[200ms] cursor-pointer"
    if(state == reqState){
        base += " text-pinky border-b-4 border-pinky"
    }
    return base
}
function handleLogOut(){
    localStorage.clear()
    window.location.reload(false);
}
function handleButtons(e){
    let buttonName
    if(e.target.classList.value != ""){
        buttonName = e.target.classList[1]
    }else{
        buttonName = e.target.farthestViewportElement.classList[1]
    }
    if(buttonName == "fa-briefcase"){
        stateFn(3)
    }else if(buttonName == "fa-shop"){
        stateFn(2)
    }else if(buttonName == "fa-gamepad"){
        stateFn(4)
    }
}
function Buttons(props){
    return (
        
        <div className='flex'>
            <FontAwesomeIcon onClick={handleButtons} className={manageButtons(props.state,2)} icon={faShop} />
            <FontAwesomeIcon onClick={handleButtons} className={manageButtons(props.state,3)} icon={faBriefcase} />
            <FontAwesomeIcon onClick={handleButtons} className={manageButtons(props.state,4)} icon={faGamepad} />
            <FontAwesomeIcon onClick={handleLogOut} className={manageButtons(props.state,5)} icon={faArrowRightFromBracket}></FontAwesomeIcon>
        </div>
    )
}

function Header(props){
    stateFn = props.stateFn
    return (
        <div className='p-8 flex justify-between items-center'>
            <div><img className='max-w-[7rem]' src="https://i.ibb.co/h7Pv5MH/Valohub-V1-0-06.png"></img></div>
            <div className=''>
                {props.state == 1 ? void(0) :  <Buttons state = {props.state}/>}
            </div>
        </div>
    )
}
export default Header