import './styles/Footer.scss'
import { FaArrowRight } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaThreads } from "react-icons/fa6"
import { IoSendSharp } from "react-icons/io5"
import { GrGoogle } from "react-icons/gr"

function Footer() {
  return (
    <footer>
        <div className="Foot">
            <div className="Foot01">
                <button type='button'><FaArrowRight/></button><h1>Contact Us</h1>
            </div>
            <div className="Foot02"></div>
            <div className="Foot03"></div>
            <div className="Foot04">
                 <button type='button'><FaInstagram/></button>
                 <button type='button'><FaThreads/></button>
                 <button type='button'><GrGoogle/></button>
            </div>
            <div className="Foot05"></div>
            <div className="Foot06">
                <a href="#">@CopyRight</a><a href="#">Private Policy</a><a href="#">Terms & Services</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer

