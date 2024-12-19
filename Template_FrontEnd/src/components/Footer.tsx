import './styles/Footer.scss'
import { FaArrowRight } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaThreads } from "react-icons/fa6"
import { GrGoogle } from "react-icons/gr"
import { FaChrome } from "react-icons/fa6"
import { FaEdge } from "react-icons/fa"
import { FaFirefoxBrowser } from "react-icons/fa6"
import { FaSafari } from "react-icons/fa6"

function Footer01() {
  return (
    <footer>
        <div className='Foot01'>
            <div className='Foot01Outer'>
                <h2>HEADRD<br/>ENOUGH?<FaArrowRight/></h2>
                <h1>Contact us</h1>
            </div>
            <button type='button'><FaArrowRight/></button>
        </div>
         <div className="Foot02">
            <h1><h2 className='FH201'>Support </h2><h2 className='FH202'>Browser</h2></h1>
            <button type='button'><a href="#"><FaChrome className='Fa'/></a><h5>Google Chrome</h5></button>
            <button type='button'><a href="#"><FaEdge className='Fa'/></a><h5>Edge</h5></button>
            <button type='button'><a href="#"><FaFirefoxBrowser className='Fa'/></a><h5>Fire Fox</h5></button>
            <button type='button'><a href="#"><FaSafari className='Fa'/></a><h5>Safari</h5></button>
        </div>
        <div className='Foot03'>
            <div className="Foot03First">
                <h1>@CopyRight-<br/>2025</h1>
            </div>
            <div className="Foot03Two">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi aperiam voluptates cumque itaque, placeat laboriosam. Fugit odit obcaecati enim nesciunt consectetur deleniti corrupti amet porro temporibus officia, itaque neque quis!</p>
            </div>
            <div className="Foot03Three">
                <div className="Foot03Three01">
                    <GrGoogle className='a'/>
                    <FaThreads className='a'/>
                    <FaInstagram className='a'/>
                </div>
                <div className="Foot03Three02 following">
                    <a href="#" className='following'> Google</a>
                    <a href="#" className='following'> Threads</a>
                    <a href="#" className='following'> Instagram</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer01

