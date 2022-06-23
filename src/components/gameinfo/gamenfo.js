import { useEffect,useState } from 'react'
import Playercard from './playercard'

async function Gamedetails(matchid,data){
    let url = "https://valohubapi.herokuapp.com/gameinfo/gamestatus"
    data = {...data, matchid:matchid}
    let response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let result = await response.json()
    return result
}

export default function Gameinfo(){
    const [ingame,setIngame] = useState(false)
    const [matchid,setMatchid] = useState(null)
    const [refresh,setRefresh] = useState(0)
    const [blue,setBlue] = useState([])
    const [red,setRed] = useState([])
    useEffect(()=>{
        setBlue([])
        setRed([])
        setMatchid(null)
        inGame()
    },[refresh])
    const inGame = async ()=>{
        let url = "https://valohubapi.herokuapp.com/gameinfo/ingame"
        let data = {
            "sub":localStorage.getItem("sub"),
            "entToken":localStorage.getItem("entToken"),
            "authToken":JSON.parse(localStorage.getItem("authToken")).value,
            "region":localStorage.getItem("region")
        }
        let response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let result = await response.json();
        if(result.ingame == true){
            setMatchid(result.matchid)
            let players = await Gamedetails(result.matchid,data)
                        players.forEach(player=>{
                if(player.team == "Blue"){
                    setBlue(blue=>[...blue,player])
                }else{
                    setRed(red=>[...red,player])
                }

            })
            
            setIngame(true)            

        }
    }
    function handleRefresh(){
        setRefresh(refresh=>refresh^1)
    }
    return(
        <div className='flex justify-center items-center flex-col gap-4'>
            {ingame ? <div className='flex flex-row flex-wrap gap-6 m-6 justify-center'>{blue.map(player=>{
                return <Playercard player={player} />
            })}</div> : <div>Not in a game</div>}
            {ingame ? <div className='flex flex-row flex-wrap gap-6 m-6 justify-center'>{red.map(player=>{
                return <Playercard player={player} />
            })}</div> : void(0)}
            <button className='rounded-md p-4 bg-modelblue text-white' onClick={handleRefresh}>Refresh</button>
        </div>
        )
}