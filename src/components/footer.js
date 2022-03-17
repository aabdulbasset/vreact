import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDiscord, faGithub} from '@fortawesome/free-brands-svg-icons'
function LinkGen(props){
    return(
        <a href={props.link} target="_blank"><FontAwesomeIcon className='hover:text-modelblue hover:scale-125 transition-all' icon={props.icon} /></a>
    )
}
export default function Footer(){

    return (
        <div className='overflow-hidden'>
            <div className='text-center mt-12'>
                <LinkGen link="https://discord.gg/tHRXjbHdrM" icon={faDiscord} />
                <div className='inline text-slate-400 m-2'>|</div>
                <LinkGen link="https://github.com/aabdulbasset/vreact" icon={faGithub} />
                
                
            </div>
            {/* <img className='fixed' src="https://i.ibb.co/MC7j1Dd/valohub-watermark-01.webp"></img> */}

        </div>
    )
}