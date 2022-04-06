import React from "react";
import Card from "./card";
import { CardWithPrice } from "./CardWithPrice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmarkCircle} from '@fortawesome/free-solid-svg-icons'
class Nightstore extends React.Component{
    constructor(props){
        super(props);
        this.handleCloseButton = this.handleCloseButton.bind(this)

    }
    componentDidMount(){
        setTimeout(() => {document.querySelector(".nightModal").style.opacity = "1"},50)
    }
    handleCloseButton(e){
        e.preventDefault()
        document.querySelector(".nightModal").style.opacity = "0"
        setTimeout(this.props.closeModal,500)
    }
    render(){
        console.log(this.props.skins)
        return (
            <>
                
            <div className=  {`fixed p-4 top-12 nightModal justify-around w-5/6 h-5/6 rounded-xl flex flex-col gap-4 items-center`}>
                    <button onClick={this.handleCloseButton} className="p-4 absolute md:top-4 md:right-4 top-0 right-0"><FontAwesomeIcon className="md:w-12 md:h-12 text-pinky" icon={faXmarkCircle} /></button>
                    <div className="relative"><h1 className="text-mainbg text-4xl">Night Market</h1></div>
                    <div className="flex flex-wrap justify-center gap-8 md:h-fit md:w-3/4 md:scale-100 scale-90 overflow-auto">
                    {this.props.skins.map(item => {
                                            return <CardWithPrice item={item} />
                                })}
                    </div>
                </div>
            </>
        )
    }
}
export default Nightstore