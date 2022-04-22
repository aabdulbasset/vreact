import React,{Component} from 'react'
import Card from './storecard'
import Nightstore from './nightstore'
class Store extends Component {
    constructor(props){
        super(props);
        this.state = {
            daily : [],
            nightArray: [],
            night: false,
            nightModal: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e){
        e.preventDefault()
        if(this.state.night == false){
            console.log("No night market stop pressing please")
        }else{
            this.setState({nightModal:true})
        }
    }
    async componentDidMount(){
        const authToken = JSON.parse(localStorage.getItem("authToken"))
        const data = {"authToken":authToken.value,"entToken":localStorage.getItem("entToken"),"sub":localStorage.getItem("sub"),"region":localStorage.getItem("region")}
        const response = await fetch(this.props.url+"/store",{
            method:'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const jsonSkin = await response.json()
        console.log(jsonSkin)
        if(jsonSkin.hasnight == true){
            this.setState({night:true,daily:jsonSkin.daily,nightArray:jsonSkin.night})
        }else{
            this.setState({daily:jsonSkin.daily})
        }
        
    }
    closeModal = () => {
        this.setState({nightModal:false})
    }
    render(){
        console.log(this.state)
        const noNightButtonClass = "bg-gray-500 cursor-default" 
        return (
            <>
            <div className='flex flex-wrap w-[90vw] lg:w-[75vw]  gap-8 md:flex-row items-center flex-col'>
                {this.state.daily.map(e => {
                    return <Card key={e.name} icon = {e.icon}/>
                })}
                
            </div>
            <button className={`${this.state.night ? "bg-modelblue" : noNightButtonClass} text-white p-4 rounded-md`} onClick={this.handleClick} >Night Market</button>
            {this.state.nightModal ? <Nightstore visible={this.state.nightModal} closeModal={this.closeModal} skins={this.state.nightArray} /> : null }
            </>
        )
    }
}


export default Store