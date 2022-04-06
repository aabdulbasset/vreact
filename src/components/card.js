export default function Card(props){
    return (
        <div className='p-2 w-[320px] h-[190px] rounded-md bg-modelblue flex items-center justify-center'>
            <img className='max-h-[60%]' src={props.skin.icon}></img>
        </div>
    )
}
//card component
