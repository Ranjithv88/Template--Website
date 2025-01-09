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
import media from '../assets/media/Mouse-Click-Animated.gif'

function DashBoard() {

    const [loadingProcess, setLoadingProcess] = React.useState<boolean>(true)
    const [access, setAccess] = React.useState<boolean>(false)
    const [cookies] = useCookies(['token'])
    const [profilePic, setProfilePic] = React.useState<boolean>(false)
    const appDispatch = useAppDispatch()
    const [enable, setEnable] = React.useState<boolean>(false)
    const [validation, setValidation] = React.useState<boolean>(true)
    const [process, setProcess] = React.useState(false)
    const [updateMessage, setUpdateMessage] = React.useState<boolean>(false)
    const [options, setOptions] = React.useState<number>(0)
    const [verified, setVerified] = React.useState({ emailVerified: false, phoneNumberVerified: false })
    const userDetails:{userName: string, age: number, email: string, phoneNumber: string} ={userName: useAppSelector(state => state.user.userName), age: useAppSelector(state => state.user.age), email: useAppSelector(state => state.user.email), phoneNumber: useAppSelector(state => state.user.phoneNumber)}
    const details:{key: number, name: string, description: string}[] = [{key: 1, name: 'Personal Information', description:'See the data in your Template Account and choose what activity is saved to personalize your Template experience'}, {key: 2, name: 'Security', description:'its a Security Information about you, its most import'}, {key: 3, name: 'Terms & services', description:'its Terms & services you must read it place'}, {key: 4, name: 'Coming Soon', description: ''}]
    const sleep=(ms: number): Promise<void> => new Promise(resolve=>setTimeout(resolve, ms)) 

    React.useEffect(()=>{editUser()},[])

    React.useEffect(() => { inputDataUpdate() }, [enable, userDetails])

    const inputDataUpdate = () => {
      const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>
      if (enable) {
        inputs.forEach((input) => input.removeAttribute('readonly'))
        if (inputs.length > 0)
          inputs[0].setAttribute('readonly', 'true')
      } else {
        inputs.forEach((input) => input.setAttribute('readonly', 'true'))
        if (inputs.length >= 4) { 
          inputs[0].value = userDetails.userName || ''
          inputs[1].value = userDetails.age?.toString() || ''
          inputs[2].value = userDetails.email || ''
          inputs[3].value = userDetails.phoneNumber || ''
        }
      }
    }
    
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
            inputDataUpdate()
            setAccess(true)
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

    const updateUserDetails = async() => {
      setProcess(true)
      if(cookies.token!=undefined) {
        if(validationProcess()) {
          try {
            const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>
            if(inputs){
              let response = await axios.put('http://localhost:8888/user/UpdateUser', {'userName': inputs[0].value, 'age': inputs[1].value, 'email': inputs[2].value, 'phoneNumber': inputs[3].value}, {headers: {'Authorization': 'Bearer '+cookies.token}})
              if(response.status === 200) {
                editUser()
                setEnable(false)
                setUpdateMessage(true)
                viewOptions()
                await sleep(7000)
                setUpdateMessage(false)
              }
            }
          }catch(error: any) {
            if(error.message == "Network Error")
              alert("Server is Not Working, please try again later....!")
            console.log(error)
          }
        }
      }
      setProcess(false)
    }

    const validationProcess =() => {
    const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      if (inputs) {
        if(inputs[1].value.length >= 10 && inputs[1].value.length >= 99) {
          setValidation(false)
          return false
        }else if(!emailPattern.test(inputs[2].value)) {
          setValidation(false)
          return false
        }else if(inputs[3].value.length != 10) {
          console.log(3)
          setValidation(false)
          return false
        }else {
          setValidation(true)
          return true
        }
      }else {
        setValidation(true)
        return false
      }
    }

    const viewOptions = () => {
      const element = document.querySelector('.DashBoardContent') as HTMLDivElement | null
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }

    const viewOptionsForSection = () => {
      const element = document.querySelector('.DashBoardInner') as HTMLDivElement | null
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const viewOptionsClick = (value: number) => {
      if(value != 3){
        setOptions(value)
        viewOptions()
      }else {
        const termsAndServices = document.querySelector('.DashBoardContent01')
        if(termsAndServices) 
          termsAndServices.scrollIntoView({ behavior:'smooth', block:'start' })
      }
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
                <motion.div key={data.key} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }} onClick={()=>viewOptionsClick(data.key)} >
                  <h1>{data.name}</h1>
                  <p>{data.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className='DashBoardSpace' />
          <div className='DashBoardContent'>
            <motion.div className='DashBoardContentI' initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }} style={{ display: options === 0?'flex':'none' }} onClick={()=>viewOptionsForSection() } >
              <h1> " Choose the Options for Given Above " </h1>
              <img src={media} alt='Mouse Click Animation ....!'/>
              <h2> Click Here View Options </h2>
            </motion.div>
            <motion.div className='DashBoardContentPI' initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }} style={{ display: options === 1?'Block':'none' }}>
              <img src={DashBoardImage} alt="Orange face" />
              <h1>Personal Information</h1>
              <div className='DashBoardDetails'>
                <div className='dashBoardControls'>
                  <button className='dashBoardControlsIcon DBCI01' type='button' style={{ backgroundColor: `${enable?'rgba(255, 255, 255, 1)':'rgba(255, 215, 0, 1)'}`, color: `${enable?'rgba(0, 0, 0, 1)':'rgba(255, 255, 255, 1)'}` }} onClick={()=>setEnable(false)}><FaFileWaveform className='q'/></button>
                  <button className='dashBoardControlsIcon' type='button' style={{ backgroundColor: `${enable?'rgba(255, 215, 0, 1)':'rgba(255, 255, 255, 1)'}`, color: `${enable?'rgba(255, 255, 255, 1)':'rgba(0, 0, 0, 1)'}` }} onClick={()=>setEnable(true)}><FaEdit className='q' /></button>
                </div>
                <div className='DashBoardDetailsFull'>
                  <h1>UserName</h1><span>:</span><input type="text" style={{ backgroundColor: `${enable?'rgba(255, 255, 255, 1)':'transparent'}`, boxShadow: `${enable?'inset 1px 1px 2px rgba(0, 0, 0, 0.2)':'none'}` }} />
                  {enable?<h2> Do Not Change The UserName ......! </h2>:<></>}
                  <h1>Age</h1><span>:</span><input type="number" min={10} max={99} style={{ backgroundColor: `${enable?'rgba(255, 255, 255, 1)':'transparent'}`, boxShadow: `${enable?'inset 1px 1px 2px rgba(0, 0, 0, 0.2)':'none'}` }} onChange={()=>validationProcess()}/>
                  <div className='UpdateMessage' style={{ opacity: `${updateMessage?'1':'0'}` }}>
                    <h1>Profile Update SuccessFully ......!</h1>
                  </div>
                  <h1>Email</h1><span>:</span> <input type="email" style={{ backgroundColor: `${enable?'rgba(255, 255, 255, 1)':'transparent'}`, boxShadow: `${enable?'inset 1px 1px 2px rgba(0, 0, 0, 0.2)':'none'}` }} />
                  <h1>PhoneNumber</h1><span>:</span><h4>+91 <input type='number' min={1000000000} max={9999999999} style={{ backgroundColor: `${enable?'rgba(255, 255, 255, 1)':'transparent'}`, boxShadow: `${enable?'inset 1px 1px 2px rgba(0, 0, 0, 0.2)':'none'}` }} /></h4>
                </div>
              </div>
              <div className='DashBoardUpdate'>{validation?<></>:<h1>Please Enter The Valid Input ......!</h1>}<button className='DashBoardUpdateButton' type='button' style={{ opacity: `${enable?'1':'0'}`, pointerEvents: `${process?'none':'fill'}` }} onClick={()=>updateUserDetails()}>{process?'Please Wait ...':'Update'}</button></div>
            </motion.div>
            <motion.div className='DashBoardContentS' initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1 } }} viewport={{ amount: 0 }} style={{ display: options === 2?'flex':'none' }}>
              <h1>Security</h1>
              <div className='DashBoardContentSMain'>
                <div className='DashBoardContentSMain01'>
                  <h2>Email :<br/> {userDetails.email}</h2>
                  <h3 style={{ color: verified.emailVerified?'rgba(2, 48, 32, 1)':'rgba(219, 0, 0, 1)'}}>{verified.emailVerified?'Verified':'Not Verified'}</h3>
                  <button style={{ pointerEvents: verified.emailVerified?'none':'fill'}}> Verify Email </button>
                </div>
                <div className='DashBoardContentSMain02'>
                  <h2>Phone Number :<br/> +91 {userDetails.phoneNumber}</h2>
                  <h3 style={{ color: verified.phoneNumberVerified?'rgba(2, 48, 32, 1)':'rgba(219, 0, 0, 1)'}}>{verified.phoneNumberVerified?'Verified':'Not Verified'}</h3>
                  <button style={{ pointerEvents: verified.phoneNumberVerified?'none':'fill'}}> Verify Phone Number </button>
                </div>
              </div>
            </motion.div>
            <motion.div className='DashBoardContentCS' initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1 } }} viewport={{ amount: 0 }} style={{ display: options === 4?'block':'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.000314728997182101 545.0260009765625 640.9843139648438" fill="none" preserveAspectRatio="xMidYMid meet" role="img">
              <path fillRule="evenodd" clipRule="evenodd" d="M522.804 18.3077C517.814 28.2387 503.745 28.5366 498.339 18.8258L497.008 16.4351C493.995 11.0219 495.045 4.85942 498.58 0.700881L477.486 1.1476C481.195 5.15273 482.506 11.2659 479.724 16.8023L478.496 19.2473C473.505 29.1782 459.437 29.4762 454.031 19.7654L452.7 17.3746C449.686 11.961 450.737 5.79777 454.273 1.63922L433.178 2.08596C436.888 6.09107 438.199 12.2049 435.417 17.7418L434.188 20.1868C429.198 30.1178 415.13 30.4157 409.724 20.7049L408.393 18.3142C405.379 12.9 406.43 6.73609 409.967 2.57752L388.874 3.02423C392.581 7.02939 393.891 13.1414 391.11 18.6769L389.881 21.1219C384.891 31.0528 370.823 31.3508 365.417 21.64L364.086 19.2492C361.072 13.8365 362.123 7.67444 365.657 3.51592L344.563 3.96265C348.272 7.96775 349.584 14.0817 346.802 19.6187L345.573 22.0637C340.583 31.9946 326.515 32.2926 321.108 22.5818L319.777 20.191C316.763 14.7767 317.815 8.61278 321.352 4.45421L300.256 4.90096C303.965 8.90608 305.277 15.0194 302.495 20.556L301.266 23.001C296.276 32.9319 282.207 33.2299 276.801 23.5191L275.47 21.1283C272.456 15.7145 273.508 9.55112 277.044 5.39256L255.95 5.83929C259.658 9.84443 260.969 15.9572 258.187 21.4933L256.958 23.9383C251.968 33.8692 237.9 34.1672 232.494 24.4564L231.163 22.0656C228.149 16.6523 229.2 10.4895 232.735 6.33092L211.642 6.77763C215.351 10.7827 216.662 16.8962 213.88 22.4328L212.652 24.8778C207.662 34.8088 193.593 35.1067 188.187 25.3959L186.856 23.0052C183.842 17.5913 184.893 11.4278 188.43 7.26922L167.333 7.71601C171.043 11.7211 172.354 17.8352 169.572 23.3724L168.344 25.8174C163.353 35.7483 149.285 36.0463 143.879 26.3355L142.548 23.9447C139.534 18.5303 140.585 12.3661 144.122 8.20755L123.029 8.65428C126.736 12.6594 128.047 18.7717 125.265 24.3074L124.036 26.7524C119.046 36.6834 104.978 36.9813 99.5718 27.2705L98.2409 24.8798C95.2274 19.4668 96.2778 13.3045 99.8125 9.14595L78.7225 9.59259C82.4294 13.5978 83.7392 19.7095 80.9579 25.2447L79.7294 27.6897C74.7393 37.6207 60.6708 37.9186 55.2647 28.2078L53.9337 25.8171C50.9206 20.4045 51.9705 14.2428 55.5045 10.0843L34.4111 10.531C38.1204 14.5361 39.4318 20.6498 36.6497 26.1865L35.4211 28.6315C30.431 38.5625 16.3625 38.8604 10.9565 29.1496L9.62552 26.7589C6.6115 21.3448 7.66284 15.1812 11.1993 11.0226L0 11.2598L13.3362 640.984L25.9928 640.716C21.1842 636.848 19.1395 629.896 22.2667 623.672L23.4952 621.227C28.4853 611.296 42.5538 610.998 47.9599 620.709L49.2908 623.1C52.6787 629.186 50.9302 636.218 46.2896 640.286L70.3047 639.777C65.4931 635.91 63.4463 628.956 66.5744 622.73L67.8029 620.286C72.793 610.355 86.8615 610.057 92.2676 619.767L93.5985 622.158C96.9873 628.245 95.2368 635.28 90.5932 639.348L114.611 638.839C109.8 634.972 107.754 628.018 110.882 621.793L112.111 619.348C117.101 609.417 131.169 609.119 136.575 618.83L137.906 621.221C141.295 627.308 139.545 634.342 134.902 638.409L158.917 637.901C154.107 634.033 152.062 627.08 155.189 620.856L156.418 618.411C161.408 608.48 175.476 608.182 180.882 617.893L182.213 620.284C185.602 626.37 183.852 633.403 179.21 637.471L203.227 636.962C198.416 633.095 196.37 626.141 199.497 619.916L200.726 617.471C205.716 607.54 219.785 607.242 225.191 616.953L226.522 619.344C229.91 625.431 228.16 632.465 223.517 636.532L247.535 636.024C242.723 632.157 240.676 625.202 243.804 618.977L245.033 616.532C250.023 606.601 264.092 606.303 269.498 616.014L270.829 618.404C274.218 624.492 272.467 631.527 267.823 635.594L291.838 635.086C287.029 631.218 284.984 624.266 288.112 618.042L289.34 615.597C294.33 605.666 308.399 605.368 313.805 615.079L315.136 617.469C318.524 623.555 316.775 630.588 312.134 634.656L336.148 634.147C331.338 630.28 329.292 623.327 332.42 617.102L333.648 614.657C338.638 604.726 352.707 604.428 358.113 614.139L359.444 616.53C362.832 622.616 361.083 629.65 356.441 633.717L380.456 633.209C375.645 629.342 373.598 622.388 376.726 616.163L377.955 613.718C382.945 603.787 397.013 603.489 402.42 613.2L403.75 615.59C407.139 621.677 405.389 628.712 400.746 632.779L424.76 632.271C419.951 628.403 417.907 621.451 421.034 615.228L422.263 612.783C427.253 602.852 441.321 602.554 446.727 612.265L448.058 614.655C451.446 620.741 449.698 627.773 445.057 631.841L469.069 631.332C464.259 627.465 462.214 620.512 465.342 614.288L466.57 611.843C471.56 601.912 485.629 601.614 491.035 611.325L492.366 613.716C495.754 619.802 494.005 626.835 489.364 630.902L513.378 630.394C508.568 626.527 506.522 619.573 509.649 613.348L510.878 610.904C515.868 600.973 529.936 600.675 535.343 610.385L536.674 612.776C540.062 618.863 538.312 625.897 533.67 629.964L545.026 629.724L531.69 -0.000314729L521.796 0.209225C525.504 4.21437 526.814 10.3269 524.032 15.8627L522.804 18.3077Z" fill="#F6E8D6"></path>
              <text x="50%" y="45%" fontSize="4vw" textAnchor="middle" fill="black" fontFamily="Griffy">
                 Coming Soon .....! 
              </text>
              <text x="50%" y="52%" fontSize="0.5vw" textAnchor="middle" fill="black" fontFamily="Griffy">
                The "Coming Soon" section provides a brief yet engaging overview of upcoming features, 
              </text>
              <text x="50%" y="54%" fontSize="0.5vw" textAnchor="middle" fill="black" fontFamily="Griffy">
                 highlighting innovative enhancements designed to elevate user experience and meet evolving needs. 
              </text>
              <text x="50%" y="56%" fontSize="0.5vw" textAnchor="middle" fill="black" fontFamily="Griffy">
                 It ensures users stay informed and excited about future developments. 
              </text>
            </svg>
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

