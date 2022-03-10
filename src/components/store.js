import React,{Component} from 'react'

class Store extends Component {
    constructor(props){
        super(props);
        this.state = {
            daily : []
        }
    }
    async componentDidMount(){
        const authToken = JSON.parse(localStorage.getItem("authToken"))
        const data = {"authToken":authToken.value,"entToken":localStorage.getItem("entToken"),"sub":localStorage.getItem("sub")}
        const response = await fetch(this.props.url+"/store",{
            method:'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const jsonSkin = await response.json()
        this.setState({"daily":jsonSkin.daily})
    }
    render(){
        return (
            <div className='flex flex-wrap w-[90vw] lg:w-[75vw]  gap-8 md:flex-row items-center flex-col'>
                {this.state.daily.map(e => {
                    return <Card icon = {e.icon}/>
                })}
            </div>
        )
    }
}

const Card = (props)=>{
    return(
        <div className='bg-modelblue rounded-2xl grow md:h-[25vh] md:w-[25vw] w-[75vw] h-[25vh] flex items-center justify-center' >
            <img className='md:max-h-[20vh] max-h-[25vh] aspect-auto' src={props.icon}></img>
        </div>
    )
}
export default Store