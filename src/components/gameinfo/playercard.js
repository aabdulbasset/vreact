
export default function Playercard(props){
    console.log(props.player)
    let cardClasses = " rounded-md p-2 flex flex-col justify-center items-center min-w-[240px]"
    return(
        <div className={props.player.team == "Blue" ? "bg-modelblue"+cardClasses : "bg-pinky"+cardClasses}>
            <div className="player-name text-white text-center">{props.player.name}</div>
            <img className="w-[120px] rounded-md my-4" referrerPolicy="no-referrer" src={props.player.agent.icon} alt={props.player.agent.name}></img>
            <div className="text-center text-white">LV. {props.player.level}</div>
            <div className="text-white inline mx-[10%]">Rank: {props.player.rank || "unrated"}</div>
            
            <div className="text-white inline mx-[10%]">Peak: {props.player.highestRank || "unrated"}</div>
            
        </div>
    )
}