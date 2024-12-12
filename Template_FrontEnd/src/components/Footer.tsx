import './styles/Footer.scss'
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
        <footer>
            <div className='Foot'>
                <div className='FootTitle'>
                    <Link to={'FeedBack'}><button type='button'><FaArrowRight/></button></Link>
                    <h2>FeedBack</h2>
                </div>
                <div className='FootOuter'>
                    <div className='About'>
                        <h1><a className='a' href="#">Contact</a></h1>
                        <h1><a className='a' href="#">FAQs</a></h1>
                        <h1><a className='a' href="#">Instagram</a></h1>
                        <h1><a className='a' href="#">Terms</a></h1>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis vero libero distinctio! Voluptatibus cumque ipsa recusandae rerum cum blanditiis, incidunt itaque optio magni sint tenetur commodi, reiciendis deleniti voluptatum! Corrupti.</p>
                    <h2>@Copyright ~ Terms</h2>
                </div>
            </div>
            <p className='FootP01'>© Discoverd pty ltd</p>
            <p className='FootP02'>Terms & Conditions</p>
        </footer>
        <div className='footer2'/>
    </>
  )
}

export default Footer

