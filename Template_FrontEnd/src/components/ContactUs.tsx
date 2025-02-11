import "./styles/ContactUs.scss"
import { Link } from "react-router-dom"
import { GrGoogle } from "react-icons/gr"
import { FaThreads } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

function ContactUs() {
  return (
    // ContactUs Page Html Tag
    <div className="ContactUs">
        <div className="CUWaterDrop"/>
        <div className="CUWaterDrop01"/>
        <div className="ContactDetailsBar">
            <div className="ContactDetails">
                <h1>Contact us</h1>
                <button className="CUGoogle" type="button" onClick={()=>window.open('mailto:ranjith.dev.00@gmail.com', '_blank')}><GrGoogle className="CUA"/><span>Google</span></button>
                <button className="CUThread" type="button"><FaThreads className="CUA"/><span>Threads</span></button>
                <button className="CUInstagram" type="button" onClick={()=>window.open('https://instagram.com/ranjith_kumar__v', '_blank')}><FaInstagram className="CUA"/><span>Instagram</span></button>
                <button className="CUTwitter" type="button"><FaXTwitter className="CUA"/><span>X</span></button>
            </div>
            <div className="ContactDetailsBar01">
                <div className="CUPrivatePolicy">
                    <h1>Privacy Policy</h1>
                    <p>We collect personal information like name, email, and payment details to process orders and improve our services. Non-personal data, such as browser type and IP address, is used for analytics. Your information is protected and only shared with trusted third parties, like payment processors. Cookies are used to enhance your experience, and you can manage them in your browser settings.<br/><a href="#"> Read The Document</a></p>
                </div>
                <div className="CUTermsAndService">
                    <h1>Terms and Services</h1>
                    <p>By using our website, you agree to comply with our terms. Templates are sold under a limited-use license and cannot be redistributed or resold. All purchases are final, with no refunds, unless otherwise stated. We reserve the right to modify or terminate services at any time.<br/><a href="#">Read The Document</a></p>
                </div>
                <div className="GoTOHome">
                    <h1>"Mentally ill but totally chill"</h1>
                    <Link to={'/'}><button type="button">Go To The Home</button></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUs

