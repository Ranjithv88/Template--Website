import React from 'react'
import './style/NavBar.scss'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <header>
        <nav>
            <h1>TEMPLATE</h1>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">products</a>
                    <ul>
                        <li><a href="#">Website</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">other</a></li>
                    </ul>
                </li>
                <li><a href="#">About</a></li>
            </ul>
            <div>
                <button type='button'><Link className='a' to={'/Login'}>Login</Link></button>
                <button type='button'><Link className='a' to={'/Register'}>Register</Link></button>
            </div>
        </nav>
    </header>
  )
}

export default NavBar

