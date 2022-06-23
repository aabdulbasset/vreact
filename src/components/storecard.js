export default function StoreCard(props){
    return(
        <div key={props.name} className='bg-modelblue rounded-2xl grow md:h-[25vh] md:w-[25vw] w-[75vw] h-[25vh] flex items-center justify-center' >
            <img className='md:max-h-[20vh] max-h-[25vh] aspect-auto'  src={props.icon} referrerPolicy="no-referrer"></img>
        </div>
    )
}