import react,{ useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
const Share = (props)=>{
    const url = process.env.REACT_APP_APIURL || "https://valohubapi.herokuapp.com"
    const params = useParams()
    const [skins,setSkins] = useState([])
    const [isLoading,setLoading] = useState(1)
    const [categorized,setCategory] = useState({})
    useEffect(async ()=>{
        
        const result = await (await fetch(`${url}/share/view/${params.id}`)).json()
        categorize(result)
        
    },[])
    const card = (skin)=>{
        return (
            <div className='p-2 w-[320px] h-[190px] rounded-md bg-modelblue flex items-center justify-center'>
                <img className='max-h-[60%]' src={skin.icon}></img>
            </div>
        )
    }
    function categorize(skins){
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
        setCategory(
            {
                "rifles":rifles,
                "sidearms":sidearms,
                "smg":smg,
                "shotguns":shotguns,
                "snipers":snipers,
                "lmg":lmg,
                "melee":melee
            }
        )
        setSkins(skins)
        setLoading(0)
    }
    return(
        <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center mb-8 w-11/12'>
            <img className='w-72 m-12' src="https://i.ibb.co/h7Pv5MH/Valohub-V1-0-06.png"></img>

            <div className='grid gap-4 justify-start grid-cols-flexible w-full justify-items-center'>
                
                {isLoading ? void(0) : categorized.melee.map(skin => {
                    return card(skin)
                })}
                </div>
                
                {isLoading ? void(0): categorized.sidearms.length == 0 ? void(0): <hr className="w-3/4 m-4 solid"></hr>}
                    <div className='grid gap-4 justify-start grid-cols-flexible w-full justify-items-center'>
                    
                    {isLoading ? void(0): categorized.sidearms.map(skin => {
                        return card(skin)
                    })}
                    </div>
                {isLoading ? void(0): categorized.rifles.length == 0 ? void(0): <hr className="w-3/4 m-4 solid"></hr>}
                <div className='grid gap-4 justify-start grid-cols-flexible w-full justify-items-center'>
                {isLoading ? void(0): categorized.snipers.map(skin => {
                    return card(skin)
                })}
                {isLoading ? void(0): categorized.rifles.map(skin => {
                    return card(skin)
                })}
                {isLoading ? void(0): categorized.smg.map(skin => {
                    return card(skin)
                })}
                {isLoading ? void(0): categorized.shotguns.map(skin => {
                    return card(skin)
                })}
                {isLoading ? void(0): categorized.lmg.map(skin => {
                    return card(skin)
                })}                
                </div>
            
        </div>
        </div>
    )
}
export default  Share