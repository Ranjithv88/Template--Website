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
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setUserName, setAge, setEmail, setPhoneNumber, setCart } from '../redux/UserSlices'
import { FiAlertOctagon } from "react-icons/fi"
import { CgCloseO } from "react-icons/cg"
import { RiCloseCircleFill } from "react-icons/ri"
import { FaMinusCircle } from "react-icons/fa"
import { GiPowerButton } from "react-icons/gi"
import { BsThreeDots } from "react-icons/bs"
import img from '../assets/images/no-signal.jpeg'
import { div } from 'motion/react-client'

function NavigationBar() {

  // Variables Declaration 
  const [menu, setMenu] = React.useState<boolean>(true)
  const search = React.useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [user, setUser] = React.useState<boolean>(false)
  const [profilePic, setProfilePic] = React.useState<boolean>(false)
  const [cookies, _, removeCookie] = useCookies(['token'])
  const userInformation = useAppSelector((state) => state.user.userName)
  const appDispatch = useAppDispatch()
  const [logoutMessage, setLogoutMessage] = React.useState<boolean>(false)
  const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
  const [cartList, setCartList] = React.useState<boolean>(false)
  const [totalAmount, setTotalAmount] = React.useState<number>(0)
  const [process, setProcess] = React.useState<boolean>(false)
  const [checkOut, setCheckOut] = React.useState<boolean>(false)
  const [isHovered, setIsHovered] = React.useState<boolean>(false)
  const [mousePosition, setMousePosition] = React.useState({ x: 500, y: 500 })
  const message = React.useRef<HTMLDivElement | null>(null)
  const cart = useAppSelector((state) => state.user.cart)
  const [loadingProductId, setLoadingProductId] = React.useState<Number>(0)
  const [imagePreview, setImagePreview] = React.useState<string>('null')
  const [searchResult, setSearchResult] = React.useState<string[]>([])

  // Search Focus Functions 
  React.useEffect(()=>search.current?.focus(),[menu])

  // Total Amount calculation Function
  React.useEffect(() => {
    if (cart && Array.isArray(cart)) {
      const total = cart.reduce((sum, cart) => sum + cart.price, 0)
      setTotalAmount(total)
    } else
      setTotalAmount(0)
  }, [cart])

  // Went Load page he Can trigger the loginUser Function
  React.useEffect(()=>{loginUser()}, [])

  // get userDetails And Stored Redux
  const loginUser = async() => {
    setProcess(true)
    if(cookies.token!=undefined) {
      const response = await getUserDetails()
      if (response) {
        appDispatch(setUserName(response.data.userName))
        appDispatch(setAge(response.data.age))
        appDispatch(setEmail(response.data.email))
        appDispatch(setPhoneNumber(response.data.phoneNumber))
        appDispatch(setCart(response.data.cart.products))
        setUser(true)
        setProfilePic(false)
      }
      setProcess(false)
    }else {
      setUser(false)
      setProfilePic(false)
      console.log(" places Login ....! ")
      setProcess(false)
    }
  }

  // get UserDetails Api call
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

  // LogOut Api call For LogOut Process
  const logOut =async()=>{
    setProcess(true)
    try {
      let response = await axios.get('http://localhost:8888/user/logout', {headers: {'Authorization': 'Bearer '+cookies.token}})
        if(response.status===201 && response.data==='To add BlockList Token Successfully.......!'){
          setMenu(true)
          setUser(false)
          setProfilePic(false)
          appDispatch(setUserName(''), setAge(0), setEmail(''), setPhoneNumber(''), setCart([]))
          removeCookie('token', { path: '/'})
          setLogoutMessage(true)
          await sleep(14000)
          setLogoutMessage(false)
        } 
    }catch(e: any) {
      if(e.message === "Network Error")
        alert("Server is Not Working, please try again later....!")
        if(e.response.status != 409 && e.response.data != 'Token Is Already Exists......!')
          alert("Something went wrong, User is Already LogOut....!")
      setUser(true) 
      setProfilePic(false)
    }finally {
      setProcess(false)
    }
  }

  // Preview Box For Cart Items
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX-100, y: e.clientY-50 })
  }
  React.useEffect(() => {
    if (isHovered){
      document.addEventListener('mousemove', handleMouseMove)
      if (message.current) {
        if(cart.length > 0)
          message.current.style.display = 'flex'
      }
    }else {
      document.removeEventListener('mousemove', handleMouseMove)
      if (message.current) {
        message.current.style.display = 'none'
      }
      }
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  // remove The Cart Item
  const removeCartItem = async(productId: number) => {
    setLoadingProductId(productId)
    if(cookies.token!=undefined) {
        try {
            const response = await axios.delete('http://localhost:8888/user/deleteCart/'+userInformation+'/'+productId, {headers: {'Authorization': 'Bearer '+cookies.token}})
            if(response.status === 200) {
              await sleep(500)
              appDispatch(setCart(response.data.products))
            }
        }catch (e: any) {
            console.log(e)
        }
    }
    setLoadingProductId(0)
  }

  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        if (search.current?.value) {
          console.log("Enter key pressed!")
          navigate(`/Home/Template/${search.current.value}`)
          setMenu(true)
        }
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () =>window.removeEventListener('keydown', handleKeydown)
  },[])

  const searchReclamations = async(e: any) => {
    if(e.target.value.length != 0){
      try {
          const response = await axios.post('http://localhost:8888/products/search/'+e.target.value)
          if(response.status === 200) {
            setSearchResult(response.data)
          }
      }catch (e: any) {
          console.log(e)
      }
    }else {
      setSearchResult([])
    }
  }

  return (
    // Navigation Html Code 
    <>
      {/* Navigation Bar Html Code */}
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
                      <button className='NCart' type='button' onClick={()=>setCartList(true)}><TbShoppingCartFilled/>cart</button>
                      <button className='NProfile' type='button' onClick={()=>setMenu(!menu)}><GiPlagueDoctorProfile/></button>
                      </>:<>
                      <Link className='a' to={'/Login'} style={{ pointerEvents: `${process?'none':'fill'}` }}><button type='button'>{process?'Loading':'Login'}</button></Link>
                      <Link className='a' to={'/Register'} style={{ pointerEvents: `${process?'none':'fill'}` }}><button type='button'>{process?'Loading':'Register'}</button></Link>
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
                    <input ref={search} type="text" placeholder='Search............!' onChange={searchReclamations}/><CgSearch className='a' onClick={()=>{if (search.current?.value) {navigate(`/Home/Template/${search.current.value}`);setMenu(true)}}}/>
                  </div>
                  <div className='searchSuggestions' style={{ height: searchResult.length===0?'1vh':'45vh' }}>
                      {searchResult.map((search)=>(
                        <Link to={`/Home/Template/${search}`}><li>{search}</li></Link>
                      ))}
                  </div>
                </div>
                {user?
                  <div className='MenuUser'>
                    {profilePic?<img src='#' alt="ProfilePic" />:<button className='NProfile' type='button'><GiPlagueDoctorProfile className='a'/></button>}
                    <h1>{userInformation}</h1>
                    <div className='MOptions'>
                      <button className='MCart' type='button' onClick={()=>{setCheckOut(true), setMenu(true)}}><TbShoppingCartFilled/>cart</button><Link to={'/Home/DashBoard'}><button className='MEdit' type='button'><MdEdit/>Edit</button></Link>
                    </div>
                    <button className='logOut' type='button' style={{ cursor: `${process?'wait':'pointer'}`, pointerEvents: `${process?'none':'fill'}` }} onClick={()=>logOut()}><IoMdLogOut/>{process?'Please Wait ...':'Log Out'}</button>
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
      {/* LogoutMessage For Html Code */}
      <div className='logoutMessage Effect' style={{ left: `${logoutMessage?'98%':'128%'}`, visibility: `${logoutMessage?'visible':'hidden'}` }}>
        <FiAlertOctagon className='LOM01 Effect'/>
        <p>LogOut Successfully...!</p>
        <CgCloseO className='LOM03 Effect' onClick={()=>{setLogoutMessage(false), setProcess(false)}}/>
      </div>
      {/* Navigation CartList Html Code */}
      {checkOut?
      // Navigation CheckOut Html Code
        <div className='CheckOut' style={{ visibility: `${checkOut?'visible':'hidden'}`, opacity: `${checkOut?'1':'0'}`}}>
          <div className='CheckOutOuter'>
          <div className='CheckOutTitle'>
              <div className='CheckOutTitleInner'><TbShoppingCartFilled className='CheckOutIcon'/><h1>Check Out</h1></div>
              <RiCloseCircleFill className='CheckOutClose Effect' onClick={()=>setCheckOut(false)}/>
            </div>
            <div className='CheckOutInner'>
              {cart && cart.length > 0 ? (
                cart.map((data, index) => (
                  <div className="CheckOutOfProducts Effect" key={data.id}  onMouseEnter={()=>{setIsHovered(true), setImagePreview(data.image)}} onMouseLeave={()=>setIsHovered(false)}>
                    <span>{index + 1}.</span>
                    <h1>{data.name}</h1>
                    <p>
                      <span>$ </span>
                      {data.price}.00
                    </p>
                    <FaMinusCircle className="CheckOutOfProductsMinus" style={{animationName: loadingProductId === data.id?'removeProduct':'none'}} onClick={()=>removeCartItem(data.id)} />
                  </div>
                )))
              :
                (<h4>No Items in the Cart.</h4>)
              }
            </div>
            <button className='Effect' type='button' onClick={()=>{setCheckOut(true), setCartList(false)}}>$ <span>{totalAmount}.00</span> Buy Now .....</button>
            <div className='CheckoutPreview' ref={message} style={{top: mousePosition.y+'px', left: mousePosition.x+'px'}}>
              <img src={imagePreview?`data:image/jpeg;base64,${imagePreview}`:img} alt="Products Preview.....!" />
              <div className='ControlsForPreview'>
                <GiPowerButton className='CheckoutIcon'/><BsThreeDots className='CheckoutIcon'/>
              </div>
            </div>
          </div>
        </div>:
        // Navigation cartList div Html Code
        <div className='cartList' style={{ visibility: `${cartList?'visible':'hidden'}`, opacity: `${cartList?'1':'0'}`}}>
            <div className='cartListTitle'>
              <div className='cartListTitleInner'><TbShoppingCartFilled className='cartIcon'/><h1 style={{ transform: `rotate(${cartList?'0':'10'}deg)` }}>Cart</h1></div>
              <RiCloseCircleFill className='cartClose Effect' onClick={()=>setCartList(false)}/>
            </div>
            <div className='cartListOfProductsOuter'>
              {cart && cart.length > 0 ? (
                cart.map((data, index)=>(
                  <div key={index} className='cartListOfProducts'>
                    <h1>{data.name}</h1>
                    <p><span>$ </span>{data.price}.00</p>
                  </div>
                )))
              :
                (<h4>No Items in the Cart.</h4>)
              }
            </div>
            <div className='CartCheckOut'><button className='Effect' type='button' onClick={()=>{setCheckOut(true),setCartList(false)}}>$ Check Out .....</button></div>
          </div>
      }
    </>
  )
}

export default NavigationBar

