import React from 'react'
import './styles/NavBar.scss'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { CiSearch } from "react-icons/ci"

function NavBar() {

    const [open, setOpen] = React.useState<boolean>(false)
    const items: string[] = ["Website", "Portfolio", "other"]

    React.useEffect(() =>{
        const dropdowns = document.getElementsByClassName('dropdown') as HTMLCollectionOf<HTMLElement>
        if (dropdowns) {
          if (open){
            dropdowns[0].classList.add('show')
            dropdowns[1].style.display = 'flex'
            }else{
                dropdowns[0].classList.remove('show')
                dropdowns[1].style.display = 'none'
            }
        }
    }, [open])

  return (
    <header>
        <nav>
            <h1>TEMPLATE</h1>
            <ul>
                <li><a href="#">Home</a></li>
                <li className='dropdown'><motion.a href="#" onClick={() => setOpen(!open) }>products</motion.a>
                    <ul className='dropdown'>
                        {items.map((item, index) => (
                            <motion.li key={index}>{item}</motion.li>
                        ))}
                    </ul>
                </li>
                <li><a href="#">About</a></li>
            </ul>
            <div>
                <div className='search'>
                    <CiSearch className='icon' />
                    <input type="text" placeholder='Search'/>
                </div>
                <div className='button'>
                    <button type='button'><Link className='a' to={'/Login'}>Login</Link></button>
                    <button type='button'><Link className='a' to={'/Register'}>Register</Link></button>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default NavBar

