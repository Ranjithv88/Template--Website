import './styles/NavigationBar.scss'
import { Link } from 'react-router-dom'
import { CgSearch } from "react-icons/cg"

function NavigationBar() {
  return (
    <header>
        <nav>
            <ul className='NUl01'><li>P</li><li>O</li><li>R</li><li>T</li><li>F</li><li>O</li><li>L</li><li>I</li><li>O</li></ul>
            <ul className='NUl02'>
                <Link to={'/'}><li className='Effect'>Home</li></Link>
                <li className='Effect'>Product</li>
                <li className='Effect'>About</li>
            </ul>
            <div className='Nav03'>
                <button className='search' type='button'><CgSearch/></button>
                <Link className='a' to={'/Login'}><button type='button'>Login</button></Link>
                <Link className='a' to={'/Register'}><button type='button'>Register</button></Link>
            </div>
        </nav>
    </header>
  )
}

export default NavigationBar

