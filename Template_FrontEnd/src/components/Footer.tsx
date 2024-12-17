import './styles/Footer.scss'
import { FaArrowRight } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaThreads } from "react-icons/fa6"
import { IoSendSharp } from "react-icons/io5"
import { GrGoogle } from "react-icons/gr"
import { FaChrome } from "react-icons/fa6"
import { FaEdge } from "react-icons/fa"
import { FaFirefoxBrowser } from "react-icons/fa6"
import { FaSafari } from "react-icons/fa6"

function Footer() {
  return (
    <footer>
        <h4>About Us</h4>
        <div className="Foot">
            <div className="Foot01">
                <button type='button'><FaArrowRight/></button><h1>Contact Us</h1>
            </div>
            <div className="Foot02">
            <h1>FeedBack</h1>
              <main className='feedback'>
              <input type="email" placeholder='Email Address......!'/><textarea minLength={10} rows={4} placeholder='Message...!'></textarea>
              <button type='button'><IoSendSharp/></button>
              </main>
            </div>
            <div className="Foot03">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nam. Dolore at sunt asperiores, ipsum aspernatur nesciunt eveniet, iste nostrum quasi ratione ex ut pariatur debitis. Voluptates laudantium totam dolorum?</p>
            </div>
            <div className="Foot04">
                 <button type='button'><FaInstagram/></button>
                 <button type='button'><FaThreads/></button>
                 <button type='button'><GrGoogle/></button>
            </div>
            <div className="Foot05">
              <h1><h2 className='FH201'>Support </h2><h2 className='FH202'>Browser</h2></h1>
              <button type='button'><a href="#"><FaChrome className='Fa'/></a><h5>Google Chrome</h5></button>
              <button type='button'><a href="#"><FaEdge className='Fa'/></a><h5>Edge</h5></button>
              <button type='button'><a href="#"><FaFirefoxBrowser className='Fa'/></a><h5>Fire Fox</h5></button>
              <button type='button'><a href="#"><FaSafari className='Fa'/></a><h5>Safari</h5></button>
            </div>
            <div className="Foot06">
                <a href="#">@CopyRight</a><a href="#">Private Policy</a><a href="#">Terms & Services</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer

