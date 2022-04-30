
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
            link: "",
            free:0,
            previousFree:0
        }
        this.loading = this.loading.bind(this)
        this.switch = this.switch.bind(this)
        this.handleLink = this.handleLink.bind(this)
        this.categorize = this.categorize.bind(this)

        this.handleToggle = this.handleToggle.bind(this)
    }
    async componentDidMount(){
        const authToken = JSON.parse(localStorage.getItem("authToken")).value
        let response = await fetch(this.props.url + "/skins",{
            method:'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"authToken":authToken,"entToken":localStorage.getItem("entToken"),"sub":localStorage.getItem("sub"),"free":this.state.free,"region":localStorage.getItem("region")})
            })
        const skins = await response.json()
        this.categorize(skins)
        this.handleLink()
        clipped = new ClipboardJS('.copyBtn')
        this.setState({isLoading:0})
        
    }
    async componentDidUpdate(){

        if(this.state.free!=this.state.previousFree && this.state.isLoading==0){
            this.setState({previousFree:this.state.free,isLoading:1})
            const authToken = JSON.parse(localStorage.getItem("authToken")).value
            console.log("UPDATING")
            let response = await fetch(this.props.url + "/skins",{
                method:'POST',
                headers:{
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({"authToken":authToken,"entToken":localStorage.getItem("entToken"),"sub":localStorage.getItem("sub"),"free":this.state.free,"region":localStorage.getItem("region")})
                })
            const skins = await response.json()
            this.categorize(skins)
            this.handleLink()
            this.setState({isLoading:0})
        }
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
                            <svg width="158" height="147" viewBox="0 0 158 147" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="main">
    <mask id="mask0_11_48" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="158" height="147">
    <g id="mask">
    <mask id="path-1-inside-1_11_48" fill="white">
    <path d="M0.51976 0.245371C1.468 -0.415071 2.12447 0.905814 2.63506 1.64881C36.3341 49.4483 70.106 97.1653 103.878 144.882C104.534 145.543 104.024 147.029 103.076 146.864C86.9555 146.864 70.7625 146.864 54.6424 146.864C53.3294 146.864 52.0894 146.121 51.2871 145.047C34.5105 121.354 17.8069 97.6606 1.03035 73.9672C0.300933 72.9766 -0.0637813 71.7383 0.00916022 70.4999C0.00916022 47.6321 0.00916022 24.6817 0.00916022 1.81392C0.00916022 1.23604 0.0091691 0.493037 0.51976 0.245371Z"/>
    <path d="M156.542 0.0802621C157.198 -0.249959 158.001 0.493038 157.855 1.31859C157.855 24.1864 157.855 47.1368 157.855 70.0046C157.928 71.3255 157.636 72.6464 156.906 73.637C151.8 80.8193 146.695 88.0842 141.589 95.2665C140.713 96.5048 139.327 97.1653 137.942 97.1653C121.894 97.1653 105.847 97.1653 89.8002 97.1653C88.8519 97.3304 88.3413 95.8444 88.9978 95.184C111.245 63.6478 133.492 32.1943 155.739 0.65815C156.031 0.493039 156.25 0.245373 156.542 0.0802621Z"/>
    </mask>
    <path d="M0.51976 0.245371C1.468 -0.415071 2.12447 0.905814 2.63506 1.64881C36.3341 49.4483 70.106 97.1653 103.878 144.882C104.534 145.543 104.024 147.029 103.076 146.864C86.9555 146.864 70.7625 146.864 54.6424 146.864C53.3294 146.864 52.0894 146.121 51.2871 145.047C34.5105 121.354 17.8069 97.6606 1.03035 73.9672C0.300933 72.9766 -0.0637813 71.7383 0.00916022 70.4999C0.00916022 47.6321 0.00916022 24.6817 0.00916022 1.81392C0.00916022 1.23604 0.0091691 0.493037 0.51976 0.245371Z" fill="#FF4655"/>
    <path d="M156.542 0.0802621C157.198 -0.249959 158.001 0.493038 157.855 1.31859C157.855 24.1864 157.855 47.1368 157.855 70.0046C157.928 71.3255 157.636 72.6464 156.906 73.637C151.8 80.8193 146.695 88.0842 141.589 95.2665C140.713 96.5048 139.327 97.1653 137.942 97.1653C121.894 97.1653 105.847 97.1653 89.8002 97.1653C88.8519 97.3304 88.3413 95.8444 88.9978 95.184C111.245 63.6478 133.492 32.1943 155.739 0.65815C156.031 0.493039 156.25 0.245373 156.542 0.0802621Z" fill="#FF4655"/>
    <path d="M0.51976 0.245371C1.468 -0.415071 2.12447 0.905814 2.63506 1.64881C36.3341 49.4483 70.106 97.1653 103.878 144.882C104.534 145.543 104.024 147.029 103.076 146.864C86.9555 146.864 70.7625 146.864 54.6424 146.864C53.3294 146.864 52.0894 146.121 51.2871 145.047C34.5105 121.354 17.8069 97.6606 1.03035 73.9672C0.300933 72.9766 -0.0637813 71.7383 0.00916022 70.4999C0.00916022 47.6321 0.00916022 24.6817 0.00916022 1.81392C0.00916022 1.23604 0.0091691 0.493037 0.51976 0.245371Z" stroke="black" strokeWidth="2" mask="url(#path-1-inside-1_11_48)"/>
    <path d="M156.542 0.0802621C157.198 -0.249959 158.001 0.493038 157.855 1.31859C157.855 24.1864 157.855 47.1368 157.855 70.0046C157.928 71.3255 157.636 72.6464 156.906 73.637C151.8 80.8193 146.695 88.0842 141.589 95.2665C140.713 96.5048 139.327 97.1653 137.942 97.1653C121.894 97.1653 105.847 97.1653 89.8002 97.1653C88.8519 97.3304 88.3413 95.8444 88.9978 95.184C111.245 63.6478 133.492 32.1943 155.739 0.65815C156.031 0.493039 156.25 0.245373 156.542 0.0802621Z" stroke="black" strokeWidth="2" mask="url(#path-1-inside-1_11_48)"/>
    </g>
    </mask>
    <g mask="url(#mask0_11_48)">
    <g id="moving">
    <path d="M6.51976 0.245371C7.468 -0.415071 8.12447 0.905814 8.63506 1.64881C42.3341 49.4483 76.106 97.1653 109.878 144.882C110.534 145.543 110.024 147.029 109.076 146.864C92.9555 146.864 76.7625 146.864 60.6424 146.864C59.3294 146.864 58.0894 146.121 57.2871 145.047C40.5105 121.354 23.8069 97.6606 7.03035 73.9672C6.30093 72.9766 5.93622 71.7383 6.00916 70.4999C6.00916 47.6321 6.00916 24.6817 6.00916 1.81392C6.00916 1.23604 6.00917 0.493037 6.51976 0.245371Z" fill="#FF4655">
        <animate attributeName="d" dur="2s" values="M6.51976 0.245371C7.468 -0.415071 8.12447 0.905814 8.63506 1.64881C42.3341 49.4483 76.106 97.1653 109.878 144.882C110.534 145.543 110.024 147.029 109.076 146.864C92.9555 146.864 76.7625 146.864 60.6424 146.864C59.3294 146.864 58.0894 146.121 57.2871 145.047C40.5105 121.354 23.8069 97.6606 7.03035 73.9672C6.30093 72.9766 5.93622 71.7383 6.00916 70.4999C6.00916 47.6321 6.00916 24.6817 6.00916 1.81392C6.00916 1.23604 6.00917 0.493037 6.51976 0.245371Z;M-5.48024 0.245371C-4.532 -0.415071 -3.87553 0.905814 -3.36494 1.64881C30.3341 49.4483 64.106 97.1653 97.8779 144.882C98.5344 145.543 98.0238 147.029 97.0756 146.864C80.9555 146.864 64.7625 146.864 48.6424 146.864C47.3294 146.864 46.0894 146.121 45.2871 145.047C28.5105 121.354 11.8069 97.6606 -4.96965 73.9672C-5.69907 72.9766 -6.06378 71.7383 -5.99084 70.4999C-5.99084 47.6321 -5.99084 24.6817 -5.99084 1.81392C-5.99084 1.23604 -5.99083 0.493037 -5.48024 0.245371Z;M6.51976 0.245371C7.468 -0.415071 8.12447 0.905814 8.63506 1.64881C42.3341 49.4483 76.106 97.1653 109.878 144.882C110.534 145.543 110.024 147.029 109.076 146.864C92.9555 146.864 76.7625 146.864 60.6424 146.864C59.3294 146.864 58.0894 146.121 57.2871 145.047C40.5105 121.354 23.8069 97.6606 7.03035 73.9672C6.30093 72.9766 5.93622 71.7383 6.00916 70.4999C6.00916 47.6321 6.00916 24.6817 6.00916 1.81392C6.00916 1.23604 6.00917 0.493037 6.51976 0.245371Z" repeatCount="indefinite" ></animate>
    </path>
    <path d="M162.542 0.0802621C163.198 -0.249959 164.001 0.493038 163.855 1.31859C163.855 24.1864 163.855 47.1368 163.855 70.0046C163.928 71.3255 163.636 72.6464 162.906 73.637C157.8 80.8193 152.695 88.0842 147.589 95.2665C146.713 96.5048 145.327 97.1653 143.942 97.1653C127.894 97.1653 111.847 97.1653 95.8002 97.1653C94.8519 97.3304 94.3413 95.8444 94.9978 95.184C117.245 63.6478 139.492 32.1943 161.739 0.65815C162.031 0.493039 162.25 0.245373 162.542 0.0802621Z" fill="#FF4655">
        <animate attributeName="d" dur="2s" values="M162.542 0.0802621C163.198 -0.249959 164.001 0.493038 163.855 1.31859C163.855 24.1864 163.855 47.1368 163.855 70.0046C163.928 71.3255 163.636 72.6464 162.906 73.637C157.8 80.8193 152.695 88.0842 147.589 95.2665C146.713 96.5048 145.327 97.1653 143.942 97.1653C127.894 97.1653 111.847 97.1653 95.8002 97.1653C94.8519 97.3304 94.3413 95.8444 94.9978 95.184C117.245 63.6478 139.492 32.1943 161.739 0.65815C162.031 0.493039 162.25 0.245373 162.542 0.0802621Z;M150.542 0.0802621C151.198 -0.249959 152.001 0.493038 151.855 1.31859C151.855 24.1864 151.855 47.1368 151.855 70.0046C151.928 71.3255 151.636 72.6464 150.906 73.637C145.8 80.8193 140.695 88.0842 135.589 95.2665C134.713 96.5048 133.327 97.1653 131.942 97.1653C115.894 97.1653 99.8473 97.1653 83.8002 97.1653C82.8519 97.3304 82.3413 95.8444 82.9978 95.184C105.245 63.6478 127.492 32.1943 149.739 0.65815C150.031 0.493039 150.25 0.245373 150.542 0.0802621Z;M162.542 0.0802621C163.198 -0.249959 164.001 0.493038 163.855 1.31859C163.855 24.1864 163.855 47.1368 163.855 70.0046C163.928 71.3255 163.636 72.6464 162.906 73.637C157.8 80.8193 152.695 88.0842 147.589 95.2665C146.713 96.5048 145.327 97.1653 143.942 97.1653C127.894 97.1653 111.847 97.1653 95.8002 97.1653C94.8519 97.3304 94.3413 95.8444 94.9978 95.184C117.245 63.6478 139.492 32.1943 161.739 0.65815C162.031 0.493039 162.25 0.245373 162.542 0.0802621Z" repeatCount="indefinite" fill="#FF4655"  ></animate>
    </path>
    </g>
    <g id="outline">
    <mask id="path-3-inside-2_11_48" fill="white">
    <path d="M0.51976 0.245371C1.468 -0.415071 2.12447 0.905814 2.63506 1.64881C36.3341 49.4483 70.106 97.1653 103.878 144.882C104.534 145.543 104.024 147.029 103.076 146.864C86.9555 146.864 70.7625 146.864 54.6424 146.864C53.3294 146.864 52.0894 146.121 51.2871 145.047C34.5105 121.354 17.8069 97.6606 1.03035 73.9672C0.300933 72.9766 -0.0637813 71.7383 0.00916022 70.4999C0.00916022 47.6321 0.00916022 24.6817 0.00916022 1.81392C0.00916022 1.23604 0.0091691 0.493037 0.51976 0.245371Z"/>
    <path d="M156.542 0.0802621C157.198 -0.249959 158.001 0.493038 157.855 1.31859C157.855 24.1864 157.855 47.1368 157.855 70.0046C157.928 71.3255 157.636 72.6464 156.906 73.637C151.8 80.8193 146.695 88.0842 141.589 95.2665C140.713 96.5048 139.327 97.1653 137.942 97.1653C121.894 97.1653 105.847 97.1653 89.8002 97.1653C88.8519 97.3304 88.3413 95.8444 88.9978 95.184C111.245 63.6478 133.492 32.1943 155.739 0.65815C156.031 0.493039 156.25 0.245373 156.542 0.0802621Z"/>
    </mask>
    <path d="M0.51976 0.245371C1.468 -0.415071 2.12447 0.905814 2.63506 1.64881C36.3341 49.4483 70.106 97.1653 103.878 144.882C104.534 145.543 104.024 147.029 103.076 146.864C86.9555 146.864 70.7625 146.864 54.6424 146.864C53.3294 146.864 52.0894 146.121 51.2871 145.047C34.5105 121.354 17.8069 97.6606 1.03035 73.9672C0.300933 72.9766 -0.0637813 71.7383 0.00916022 70.4999C0.00916022 47.6321 0.00916022 24.6817 0.00916022 1.81392C0.00916022 1.23604 0.0091691 0.493037 0.51976 0.245371Z" stroke="black" strokeWidth="2" mask="url(#path-3-inside-2_11_48)"/>
    <path d="M156.542 0.0802621C157.198 -0.249959 158.001 0.493038 157.855 1.31859C157.855 24.1864 157.855 47.1368 157.855 70.0046C157.928 71.3255 157.636 72.6464 156.906 73.637C151.8 80.8193 146.695 88.0842 141.589 95.2665C140.713 96.5048 139.327 97.1653 137.942 97.1653C121.894 97.1653 105.847 97.1653 89.8002 97.1653C88.8519 97.3304 88.3413 95.8444 88.9978 95.184C111.245 63.6478 133.492 32.1943 155.739 0.65815C156.031 0.493039 156.25 0.245373 156.542 0.0802621Z" stroke="black" strokeWidth="2" mask="url(#path-3-inside-2_11_48)"/>
    </g>
    </g>
    </g>
    </svg>
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
        
        return (<><div className='p-4 bg-modelblue rounded-md mb-4 cursor-pointer copyBtn' onClick ={this.toast} data-clipboard-text={this.state.link}>
            <h1 className='text-center text-white'>You have {this.state.skins.length} skin/s !</h1>
            <h1 className='text-white'>Click here to copy link</h1>
            
        </div>
        </>)
    }
    async handleToggle(){
        this.setState({free:this.state.free^1})

    }
    switch(){
        return(
            <>
            <h1>BP skins</h1>
            <label className="switch inline" > 
                <input type="checkbox" onClick={this.handleToggle}/>
                <span className="slider round"></span>
            </label>
            </>
        )
    }

    render(){
        let types = ['snipers','rifles','smg','shotguns','lmg']
        return(
            <div className='flex items-center flex-col pb-4 gap-4 w-11/12'>{this.state.isLoading ? this.loading():this.counter()
                
            }
                {this.switch()}
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