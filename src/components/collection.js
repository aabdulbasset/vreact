
import {Component} from 'react'
import ClipboardJS from 'clipboard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './card'
let clipped
class Collection extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading : 1,
            skins : [],
            categorized: {},
            link: ""
        }
        this.loading = this.loading.bind(this)
        this.handleLink = this.handleLink.bind(this)
        this.categorize = this.categorize.bind(this)
    }
    async componentDidMount(){
        this.setState({isLoading:1})
        const authToken = JSON.parse(localStorage.getItem("authToken")).value
        let response = await fetch(this.props.url + "/skins",{
            method:'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"authToken":authToken,"entToken":localStorage.getItem("entToken"),"sub":localStorage.getItem("sub")})
            })
        const skins = await response.json()
        this.categorize(skins)
        this.handleLink()
        clipped = new ClipboardJS('.copyBtn')
        this.setState({isLoading:0})
        
    }
    categorize(skins){
        let sidearms = []
        let smg = []
        let shotguns = []
        let rifles = []
        let snipers = []
        let lmg = []
        let melee = []
        
        skins.forEach(skin=>{
            if(skin.name.search("Vandal") > -1 || skin.name.search("Phantom") > -1 || skin.name.search("Guardian") > -1 || skin.name.search("Bulldog") > -1 ){
                rifles.push(skin)
            }else if(skin.name.search("Spectre") > -1 || skin.name.search("Stinger") > -1){
                smg.push(skin)
            }else if(skin.name.search("Marshal") > -1 || skin.name.search("Operator") > -1){
                snipers.push(skin)
            }else if(skin.name.search("Bucky") > -1 || skin.name.search("Judge") > -1){
                shotguns.push(skin)
            }else if(skin.name.search("Ares") > -1 || skin.name.search("Odin") > -1){
                lmg.push(skin)
            }else if(skin.name.search("Classic") > -1 || skin.name.search("Shorty") > -1 || skin.name.search("Frenzy") > -1 || skin.name.search("Ghost") > -1 || skin.name.search("Sheriff") > -1){
                sidearms.push(skin)
            }else{
                melee.push(skin)
            }
        })
        this.setState({categorized:{
            "rifles":rifles,
            "sidearms":sidearms,
            "smg":smg,
            "shotguns":shotguns,
            "snipers":snipers,
            "lmg":lmg,
            "melee":melee
        },skins:skins})
    }
    loading(){
        return (
            <div className=''>
                <div className="lds-roller black"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    async handleLink(){
        const result = await fetch(this.props.url + "/share/create",{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({"sub":localStorage.getItem("sub"),"skins":this.state.skins})
        })
        const linkResult = await result.json()
        this.setState({link:`${window.location.href}#/collection/${linkResult.link}`})
    }
    toast(){
        console.log("triggered")
        toast.success('copied', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    counter(){
        
        return <div className='p-4 bg-modelblue rounded-md mb-4 cursor-pointer copyBtn' onClick ={this.toast} data-clipboard-text={this.state.link}>
            <h1 className='text-center text-white'>You have {this.state.skins.length} skin/s !</h1>
            <h1 className='text-white'>Click here to copy link</h1>
        </div>
    }
    render(){
        let types = ['snipers','rifles','smg','shotguns','lmg']
        return(
            <div className='flex items-center flex-col pb-4 gap-4 w-11/12'>{this.state.isLoading ? this.loading():this.counter()}

                <div className='grid gap-4 justify-start grid-cols-flexible w-full justify-items-center'>
                
                {this.state.isLoading ? void(0) : this.state.categorized.melee.map(skin => {
                    return <Card skin={skin}/>
                })}
                </div>
                
                {this.state.isLoading ? void(0): this.state.categorized.sidearms.length == 0 ? void(0): <hr className="w-3/4 solid"></hr>}
                    <div className='grid gap-4 justify-start grid-cols-flexible w-full justify-items-center' >
                    
                    {this.state.isLoading ? void(0): this.state.categorized.sidearms.map(skin => {
                        return <Card skin={skin}/>
                    })}
                    </div>
                {this.state.isLoading ? void(0): this.state.categorized.rifles.length == 0 ? void(0): <hr className="w-3/4 solid"></hr>}
                <div className='grid gap-4 justify-start grid-cols-flexible w-full justify-items-center'>
                {types.map((v,i)=>{
                    return(
                        this.state.isLoading ? void(0): this.state.categorized[types[i]].map(skin => {
                            return <Card skin={skin}/>
                        }) 
                    )                   
                })}
        
                </div>
            </div>
        )
    }
}
export default Collection