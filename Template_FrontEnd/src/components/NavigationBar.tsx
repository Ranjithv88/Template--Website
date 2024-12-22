import React from 'react'
import './styles/NavigationBar.scss'
import { Link } from 'react-router-dom'
import { CgSearch } from "react-icons/cg"
import { FaWindowClose } from "react-icons/fa"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"

function NavigationBar() {

  // Variables Declaration 
  const [menu, setMenu] = React.useState<boolean>(true)
  const search = React.useRef<HTMLInputElement | null>(null) 

  // Search Focus Functions 
  React.useEffect(()=>{
    search.current?.focus()
  },[menu])

  return (
    <header style={{ height: `${menu==true?'14vh':'100vh'}`}}>
      {menu?
        <nav>
              <Link to={'/'}><ul className='NUl01'><li>P</li><li>O</li><li>R</li><li>T</li><li>F</li><li>O</li><li>L</li><li>I</li><li>O</li></ul></Link>
              <ul className='NUl02'>
                  <Link to={'/'}><li className='Effect'>Home</li></Link>
                  <li className='Effect'  onClick={()=>setMenu(!menu)}>Product</li>
                  <Link to={'/ContactUs'}><li className='Effect'>About</li></Link>
              </ul>
              <div className='Nav03'>
                  <button className='search' type='button'  onClick={()=>setMenu(!menu)}><CgSearch/></button>
                  <Link className='a' to={'/Login'}><button type='button'>Login</button></Link>
                  <Link className='a' to={'/Register'}><button type='button'>Register</button></Link>
              </div>
        </nav>:
        <div className='menuOuter'>
          <button className='MenuClose' type='button' onClick={()=>setMenu(!menu)}><FaWindowClose className='CloseA'/></button>
            <div className='menu'>
              <div className='menu01'>
                <Link className='MenuA01' to={'/Font-Face'}>Font Face <FaArrowUpRightFromSquare className='Ma'/></Link>
                <Link className='MenuA02' to={'/Color-Code'}>Color Code <FaArrowUpRightFromSquare className='Ma'/></Link>
              </div> 
              <div className='menu02'>
                <div className='menuSearch'>
                  <input ref={search} type="text" placeholder='Search............!'/><CgSearch className='a'/>
                </div>
              </div>
              <div className='menu03'>
                <Link className='a' to={'/Login'}><button type='button'>Login</button></Link>
                <Link className='a' to={'/Register'}><button type='button'>Register</button></Link>
              </div>
            </div>
        </div>
      }
    </header>
  )
}

export default NavigationBar

