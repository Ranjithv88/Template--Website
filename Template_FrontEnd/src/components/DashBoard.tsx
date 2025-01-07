import React from 'react'
import './styles/DashBoard.scss'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { setUserName, setAge, setEmail, setPhoneNumber } from '../redux/UserSlices'
import { useAppSelector, useAppDispatch } from '../redux/Hooks'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { BiLogOutCircle } from "react-icons/bi"
import NotFound from './404'
import { GiPlagueDoctorProfile } from "react-icons/gi"
import DashBoardImage from '../assets/images/dashBoard/fellowart-logo-face-orange.svg'
import { FaEdit } from "react-icons/fa"
import { FaFileWaveform } from "react-icons/fa6"
import Loading from './Loading'

function DashBoard() {

    const [loadingProcess, setLoadingProcess] = React.useState<boolean>(true)
    const [access, setAccess] = React.useState<boolean>(false)
    const [cookies, _, removeCookie] = useCookies(['token'])
    const [profilePic, setProfilePic] = React.useState<boolean>(false)
    const appDispatch = useAppDispatch()
    const [enable, setEnable] = React.useState<boolean>(false)
    const [process, setProcess] = React.useState({updateProcess: true, anyChanges: true})
    const userDetails:{userName: string, age: number, email: string, phoneNumber: string} ={userName: useAppSelector(state => state.user.userName), age: useAppSelector(state => state.user.age), email: useAppSelector(state => state.user.email), phoneNumber: useAppSelector(state => state.user.phoneNumber)}
    const details:{key: number, name: string, description: string}[] = [{key: 1, name: 'Personal Information', description:'See the data in your Template Account and choose what activity is saved to personalize your Template experience'}, {key: 2, name: 'Security', description:'its a Security Information about you, its most import'}, {key: 3, name: 'Terms & services', description:'its Terms & services you must read it place'}, {key: 4, name: 'Coming Soon', description: ''}]

    React.useEffect(()=>{editUser()},[])

    React.useEffect(() => {
      const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
      if (enable) {
        inputs.forEach((input) => input.removeAttribute('readonly'))
      } else {
        inputs.forEach((input) => input.setAttribute('readonly', 'true'))
        if (inputs.length >= 4) { 
          inputs[0].value = userDetails.userName || ''
          inputs[1].value = userDetails.age?.toString() || ''
          inputs[2].value = userDetails.email || ''
          inputs[3].value = userDetails.phoneNumber || ''
        }
      }
    }, [enable, userDetails])
    
    const editUser = async() => {
      setLoadingProcess(true)
      setAccess(false)
      if(cookies.token!=undefined) {
        const response = await getUserDetails()
        if (response) {
          appDispatch(setUserName(response.data.userName))
          appDispatch(setAge(response.data.age))
          appDispatch(setEmail(response.data.email))
          appDispatch(setPhoneNumber(response.data.phoneNumber))
          if(response.status === 200){
            setAccess(true)
            console.log(userDetails)
          }
        }
      }else {
        console.log(" places Login ....! ")
        setAccess(false)
        setProfilePic(false)
      }
      setLoadingProcess(false)
      setProfilePic(false)
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

    const updateUserDetails = () => {
      setProcess({updateProcess: false, anyChanges: true})
      
    }

  return (
    <>{loadingProcess?<Loading/>:<>
      {access?
        <div className='DashBoard'>
          <div className='DashBoardInner'>
            <Link className='DashBoardBack' to={'/'}><BiLogOutCircle/>Go To Home</Link>
            <div className='DashBoardProfile'>
              {profilePic?<img src='#' alt="ProfilePic" />:<button className='NProfile' type='button'><GiPlagueDoctorProfile className='a'/></button>}
              <h1 className='NProfileName'>Welcome, {userDetails.userName}</h1>
              <p>Manage your info, privacy, and security to make Google work better for you. <a href="#">Learn more</a></p>
            </div>
            <div className='DashBoardOuter'>
              {details.map(data=>(
                <motion.div key={data.key} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }} >
                  <h1>{data.name}</h1>
                  <p>{data.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className='DashBoardContent'>
            <motion.div className='DashBoardContentPI' initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }} >
              <img src={DashBoardImage} alt="Orange face" />
              <h1>Personal Information</h1>
              <div className='DashBoardDetails'>
                <div className='dashBoardControls'>
                  <button className='dashBoardControlsIcon DBCI01' type='button' style={{ backgroundColor: `${enable?'rgba(255, 255, 255, 1)':'rgba(255, 215, 0, 1)'}`, color: `${enable?'rgba(0, 0, 0, 1)':'rgba(255, 255, 255, 1)'}` }} onClick={()=>setEnable(false)}><FaFileWaveform className='q'/></button>
                  <button className='dashBoardControlsIcon' type='button' style={{ backgroundColor: `${enable?'rgba(255, 215, 0, 1)':'rgba(255, 255, 255, 1)'}`, color: `${enable?'rgba(255, 255, 255, 1)':'rgba(0, 0, 0, 1)'}` }} onClick={()=>setEnable(true)}><FaEdit className='q' /></button>
                </div>
                <div className='DashBoardDetailsFull'>
                  <h1>UserName</h1><span>:</span><input type="text" minLength={2} style={{ backgroundColor: `${enable?'rgba(255, 255, 255, 1)':'transparent'}`, boxShadow: `${enable?'inset 1px 1px 2px rgba(0, 0, 0, 0.2)':'none'}` }}/>
                  <h1>Age</h1><span>:</span><input type="number" min={10} max={99} style={{ backgroundColor: `${enable?'rgba(255, 255, 255, 1)':'transparent'}`, boxShadow: `${enable?'inset 1px 1px 2px rgba(0, 0, 0, 0.2)':'none'}` }}/>
                  <h1>Email</h1><span>:</span> <input type="email" style={{ backgroundColor: `${enable?'rgba(255, 255, 255, 1)':'transparent'}`, boxShadow: `${enable?'inset 1px 1px 2px rgba(0, 0, 0, 0.2)':'none'}` }}/>
                  <h1>PhoneNumber</h1><span>:</span><input type='number' min={1000000000} max={9999999999} style={{ backgroundColor: `${enable?'rgba(255, 255, 255, 1)':'transparent'}`, boxShadow: `${enable?'inset 1px 1px 2px rgba(0, 0, 0, 0.2)':'none'}` }}/>
                </div>
              </div>
              <div className='DashBoardUpdate'><button className='DashBoardUpdateButton' type='button' style={{ opacity: `${enable?'1':'0'}` }} onClick={()=>updateUserDetails()}>{process.updateProcess?'places Wait ...':'Update'}</button></div>
            </motion.div>
          </div>
          <div className='DashBoardContent01' >
            <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }}>Terms & services</motion.h1>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }}>&nbsp;&nbsp;&nbsp;&nbsp;We collect personal information like name, email, and payment details to process orders and improve our services. Non-personal data, such as browser type and IP address, is used for analytics. Your information is protected and only shared with trusted third parties, like payment processors. Cookies are used to enhance your experience, and you can manage them in your browser settings.<br/><a href="#"> Read The Document</a></motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }}>&nbsp;&nbsp;&nbsp;&nbsp;By using our website, you agree to comply with our terms. Templates are sold under a limited-use license and cannot be redistributed or resold. All purchases are final, with no refunds, unless otherwise stated. We reserve the right to modify or terminate services at any time.<br/><a href="#">Read The Document</a></motion.p>
          </div>
        </div>
        :
        <NotFound/>}
      </>}
    </>
  )
}

export default DashBoard

