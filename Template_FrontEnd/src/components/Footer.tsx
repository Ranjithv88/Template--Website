import './styles/Footer.scss'
import { Link } from 'react-router-dom'
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
            <Link to={'/ContactUs'}><button type='button'><FaArrowRight/></button></Link>
        </div>
         <div className="Foot02">
            <h1><span className='FSpan01'>Support </span><span className='FSpan02'>Browser</span></h1>
            <button type='button'><a target='_Blank' href="https://www.google.com/intl/en_in/chrome/"><FaChrome className='Fa'/></a><h5>Google Chrome</h5></button>
            <button type='button'><a target='_Blank' href="https://www.microsoft.com/en-us/edge/?form=MA13FJ"><FaEdge className='Fa'/></a><h5>Edge</h5></button>
            <button type='button'><a target='_Blank' href="https://www.mozilla.org/en-US/firefox/"><FaFirefoxBrowser className='Fa'/></a><h5>Fire Fox</h5></button>
            <button type='button'><a target='_Blank' href="https://www.apple.com/in/safari/"><FaSafari className='Fa'/></a><h5>Safari</h5></button>
        </div>
        <div className='Foot03'>
            <div className="Foot03First">
                <h1>@CopyRight-<br/>2025</h1>
            </div>
            <div className="Foot03Two">
                <p>By using this site, you agree to our Terms of Service and Privacy Policy.All content, including text, images, and logos, is protected by copyright law.Unauthorized reproduction, distribution, or modification is prohibited.All trademarks are the property of their respective owners.</p>
            </div>
            <div className="Foot03Three">
                <div className="Foot03Three01">
                    <GrGoogle className='a FGB' onClick={()=>window.open('mailto:ranjith.dev.00@gmail.com', '_blank')}/>
                    <FaThreads className='a FTB'/>
                    <FaInstagram className='a FIB' onClick={()=>window.open('https://instagram.com/ranjith_kumar__v', '_blank')}/>
                </div>
                <div className="Foot03Three02 following">
                    <a target='_Blank' href="mailto:ranjith.dev.00@gmail.com" className='following FG'> Google</a>
                    <a href="#" className='following FT'> Threads</a>
                    <a target='_Blank' href="https://instagram.com/ranjith_kumar__v" className='following FI'> Instagram</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer01

