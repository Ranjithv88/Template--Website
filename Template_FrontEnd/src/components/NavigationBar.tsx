import React from 'react'
import './styles/NavigationBar.scss'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../redux/Hooks'
import { CgSearch } from "react-icons/cg"
import { FaWindowClose } from "react-icons/fa"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import { TbShoppingCartFilled } from "react-icons/tb"
import { GiPlagueDoctorProfile } from "react-icons/gi"
import { MdEdit } from "react-icons/md"
import { IoMdLogOut } from "react-icons/io"

function NavigationBar() {

  // Variables Declaration 
  const [menu, setMenu] = React.useState<boolean>(true)
  const search = React.useRef<HTMLInputElement | null>(null) 
  const [user, setUser] = React.useState<boolean>(false)
  const [profilePic, setProfilePic] = React.useState<boolean>(false)

  // Search Focus Functions 
  React.useEffect(()=>{
    search.current?.focus()
  },[menu])

  const userInformation = useAppSelector((state) => state)

  React.useEffect(() => {
    console.log('User Information:', userInformation)
  }, [userInformation])

  return (
    <header style={{ height: `${menu?'14vh':'100vh'}`}}>
      {menu?
        <nav>
              <Link to={'/'}><ul className='NUl01 Effect'><li>P</li><li>O</li><li>R</li><li>T</li><li>F</li><li>O</li><li>L</li><li>I</li><li>O</li></ul></Link>
              <ul className='NUl02'>
                  <Link to={'/'}><li className='Effect'>Home</li></Link>
                  <li className='Effect'  onClick={()=>setMenu(!menu)}>Product</li>
                  <Link to={'/ContactUs'}><li className='Effect'>About</li></Link>
              </ul>
              <div className='Nav03'>
                  <button className='search' type='button'  onClick={()=>setMenu(!menu)}><CgSearch/></button>
                  {user?<>
                    <button className='NCart' type='button'><TbShoppingCartFilled/>cart</button>
                    <button className='NProfile' type='button' onClick={()=>setMenu(!menu)}><GiPlagueDoctorProfile/></button>
                    </>:<>
                    <Link className='a' to={'/Login'}><button type='button'>Login</button></Link>
                    <Link className='a' to={'/Register'}><button type='button'>Register</button></Link>
                  </>}
              </div>
        </nav>:
        <div className='menuOuter' >
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
              {user?
                <div className='MenuUser'>
                  {profilePic?<img src='#' alt="ProfilePic" />:<button className='NProfile' type='button'><GiPlagueDoctorProfile className='a'/></button>}
                  <h1>Ranjith Kumar</h1>
                  <div className='MOptions'>
                    <button className='MCart' type='button'><TbShoppingCartFilled/>cart</button><button className='MEdit' type='button'><MdEdit/>Edit</button>
                  </div>
                  <button className='logOut' type='button'><IoMdLogOut/>Log Out</button>
                </div>
                :
                <div className='menu03'>
                  <Link className='a' to={'/Login'}><button type='button'>Login</button></Link>
                  <Link className='a' to={'/Register'}><button type='button'>Register</button></Link>
                </div>
              }
            </div>
        </div>
      }
    </header>
  )
}

export default NavigationBar

