import { counter } from '@fortawesome/fontawesome-svg-core'
import react,{Component} from 'react'

class Collection extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading : 0,
            skins : []
        }
        this.loading = this.loading.bind(this)
        this.collection = this.collection.bind(this)
    }
    async componentDidMount(){
        const authToken = JSON.parse(localStorage.getItem("authToken")).value
        this.setState({isLoading:1})
        let response = await fetch(this.props.url + "/skins",{
            method:'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"authToken":authToken,"entToken":localStorage.getItem("entToken"),"sub":localStorage.getItem("sub")})
            })
        this.setState({skins:await response.json(),isLoading:0})
        
            

    }
    loading(){
        return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    }
    collection(skin){
        return (
            <div className='p-2 w-[360px] h-[280px] rounded-md bg-modelblue flex items-center justify-center'>
                <img className='max-h-[60%]' src={skin.icon}></img>
            </div>
        )
    }
    counter(){
        return <div className='p-4 bg-modelblue rounded-md mb-4'><h1 className='text-center text-white'>You have {this.state.skins.length} skin/s !</h1></div>
    }
    render(){
        return(
            <div className='flex items-center flex-col pb-4'>{this.state.isLoading ? void(0):this.counter()}
                <div className='flex gap-8 flex-wrap items-center justify-center w-11/12'>
                    
                {this.state.isLoading ? this.loading() : this.state.skins.map(skin=>{
                    return this.collection(skin)
                })}
                </div>
            </div>
        )
    }
}
export default Collection