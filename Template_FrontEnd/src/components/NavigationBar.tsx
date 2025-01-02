import React from 'react'
import './styles/NavigationBar.scss'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../redux/Hooks'
import { CgSearch } from "react-icons/cg"
import { FaWindowClose } from "react-icons/fa"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import { TbShoppingCartFilled } from "react-icons/tb"
import { GiPlagueDoctorProfile } from "react-icons/gi"
import { MdEdit } from "react-icons/md"
import { IoMdLogOut } from "react-icons/io"
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { setUserName, setAge, setEmail, setPhoneNumber } from '../redux/UserSlices'

function NavigationBar() {

  // Variables Declaration 
  const [menu, setMenu] = React.useState<boolean>(true)
  const search = React.useRef<HTMLInputElement | null>(null) 
  const [user, setUser] = React.useState<boolean>(false)
  const [profilePic, setProfilePic] = React.useState<boolean>(false)
  const [cookies, _, removeCookie] = useCookies(['token'])
  const userInformation = useAppSelector((state) => state)
  const appDispatch = useAppDispatch()

  // Search Focus Functions 
  React.useEffect(()=>{
    search.current?.focus()
  },[menu])

  React.useEffect(() => {
    loginUser()
  }, [])

  const loginUser = async() => {
    if(cookies.token!=undefined) {
      const response = await getUserDetails()
      if (response) {
        appDispatch(setUserName(response.data.userName), setAge(response.data.age), setEmail(response.data.email), setPhoneNumber(response.data.phoneNumber))
        setUser(true)
        setProfilePic(false)
        console.log("working....!", response.data)
      }
    }else {
      setUser(false)
      setProfilePic(false)
      console.log(" places Login ....! ")
    }
  }

  const getUserDetails = async() => {
    try {
      let response = await axios.get('http://localhost:8888/user/getUserDetails', {headers: {'Authorization': 'Bearer '+cookies.token}})
      return response
    } catch (e: any) {
      if(e.message === "Network Error")
        alert("Server is Not Working, please try again later....!")
      console.log(e)
      return false
    }
  }

  const logOut =async()=>{
    try {
      let response = await axios.get('http://localhost:8888/user/logout', {headers: {'Authorization': 'Bearer '+cookies.token}})
        if(response.status===201 && response.data==='Token add BlockList Successfully.......!'){
          setMenu(true)
          setUser(false)
          setProfilePic(false)
          appDispatch(setUserName(''), setAge(0), setEmail(''), setPhoneNumber(''))
          removeCookie('token', { path: '/'})
        }
    }catch(e: any) {
      if(e.message === "Network Error")
        alert("Server is Not Working, please try again later....!")
        if(e.response.status != 409 && e.response.data != 'Token Is Already Exists......!')
          alert("Something went wrong, User is Already LogOut....!")
      setUser(true)
      setProfilePic(false)
    }
  }

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
                  <h1>{userInformation.user.userName}</h1>
                  <div className='MOptions'>
                    <button className='MCart' type='button'><TbShoppingCartFilled/>cart</button><button className='MEdit' type='button'><MdEdit/>Edit</button>
                  </div>
                  <button className='logOut' type='button' onClick={()=>logOut()}><IoMdLogOut/>Log Out</button>
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

