import React from 'react'
import './styles/Register.scss'
import Loading from './Loading'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {FcGoogle} from "react-icons/fc"
import {FaFacebook,FaXTwitter} from "react-icons/fa6"
import { CgDanger } from "react-icons/cg"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"

function Register() {

    // Variables & React Hooke Declarations 
    const [after, setAfter] = React.useState<boolean>(true)
    const [loadingAfter, setLoadingAfter] = React.useState<boolean>(true)
    const [showPassword, setShowPassword] = React.useState<string>('password')
    const [userNameUnique, setUserNameUnique] = React.useState<boolean>(false)
    const [passwordConfirm, setPasswordConfirm] = React.useState<boolean>(false)
    const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
    const [isHovered, setIsHovered] = React.useState(false)
    const [mousePosition, setMousePosition] = React.useState({ x: 500, y: 500 })
    const message = React.useRef<HTMLDivElement | null>(null)
    const lightDiv = React.useRef<HTMLDivElement | null>(null)
    const [registerProcess, setRegisterProcess] = React.useState<Boolean>(true)

    // light div positioning
    React.useEffect(() => {
      let EyeIcon = document.querySelector('.LEyeIcon') as HTMLElement
      let lightDiv = document.querySelector('.light') as HTMLDivElement
      if (EyeIcon && lightDiv) {
        const light = EyeIcon.getBoundingClientRect()
        lightDiv.style.left = `${light.left - 79 * window.innerWidth / 100}px`
        lightDiv.style.top = `${light.top - 12.8 * window.innerHeight / 100}px`
      }
    }, [])

    // button message on hover
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX+10, y: e.clientY+10 })
    }
    React.useEffect(() => {
      if (isHovered){
        document.addEventListener('mousemove', handleMouseMove)
        if (message.current) {
          message.current.style.display = 'block';
        }
      }else {
        document.removeEventListener('mousemove', handleMouseMove)
        if (message.current) {
          message.current.style.display = 'none'
        }
        }
      return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [isHovered])
    
    // password Toggle Function
    const togglePasswordVisibility = () => {
      setShowPassword(showPassword === 'text'? 'password' : 'text')
    }

    // Interface for Form Data
    interface FormData {
        userName: string
        password: string
        conformPassword?: string
        age: number
        email: string
        phoneNumber: string
    }

    // For Submit Function for Form Data
    const submit = async (event: any): Promise<void> => {
        event.preventDefault()
        document.body.style.cursor = "wait"
        setRegisterProcess(false)
        var registerData: FormData = {
          userName: event.target[0].value,
          password: event.target[1].value,
          conformPassword: event.target[2].value,
          age: parseInt(event.target[3].value),
          email: event.target[4].value,
          phoneNumber: event.target[5].value
        }
        if(validation(registerData)){
            if(await addUser(registerData)){
              setShowPassword('password')
              setAfter(false)
              setRegisterProcess(false)
              await sleep(6000)
              setLoadingAfter(false)
            }
            setRegisterProcess(false)
            document.body.style.cursor = "default"
          }
        setRegisterProcess(false)
        document.body.style.cursor = "default"
    }

    // Input validation function
    function validation(registerData: any): boolean { 
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const passwordPattern = /^.{8,}$/
        if(registerData.userName.length < 2){
            return false
        }else if(registerData.password != registerData.conformPassword){
            setPasswordConfirm(true)
            return false
        }else if(!passwordPattern.test(registerData.password)){
            return false
        }else if(registerData.age >= 10 && registerData.age >= 99){
            return false
        }else if(!emailPattern.test(registerData.email)){
            return false
        }else if(registerData.phoneNumber.length != 10){
            return false
        }else{
            setPasswordConfirm(false)
            return true
        }
      }

    // AddUser function for Api Call
    async function addUser(registerData: any) {
        try{
          let response = await axios.post('http://localhost:8888/register',
            {
                userName: registerData.userName,
                password: registerData.password,
                age: registerData.age,
                email: registerData.email,
                phoneNumber: registerData.phoneNumber
            })
            if(response.status === 201 && response.data === "Registered Successfully...!"){
              return true
            }
        }catch (e: any){
            if(e.message != "Network Error"){
                if(e.response.status === 409 && e.response.data === 'That UserName is taken, Try another...!'){
                    setUserNameUnique(true)
                    return false
                }else { 
                    alert("Something went wrong, please try again later....!")
                    return false
                }
            }
            alert("Server is Not Working, please try again later....!")
            return false
        }
      }

  return (
    // Registration Page Html Code
    <>
      {after?
        <div className='Register'>
          <div className='RegisterBanner'>
            <div className='RegisterOuter'>
              <h1>Welcome to Template</h1>
              <div className='RegisterLink'>
                <h1> Using Magical Link? </h1>
                <button className='SignG' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}><h3><FcGoogle /></h3>Continue With Google </button>
                <button className='SignF' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}><h3><FaFacebook /></h3>Continue With FaceBook </button>
                <button className='SignT' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}><h3><FaXTwitter /></h3>Continue With X </button>
              </div>
              <form className='RegisterForm' onSubmit={submit}>
                <input type="text" minLength={2} placeholder=' Enter the Username'/>
                {userNameUnique?<h4><CgDanger/> That userName is taken. Try another.</h4>:<></>}
                <div className='showPassword'>
                    <input pattern="^.{8,}$" title="Password must be at least 8 characters long." type={showPassword} minLength={8} placeholder=' Enter the Password'/>
                    <h5 className='LEyeIcon' onClick={togglePasswordVisibility}>{showPassword == 'password'?<BsFillEyeSlashFill/>:<BsFillEyeFill/>}</h5>
                    <input pattern="^.{8,}$" title="Password must be at least 8 characters long." type={showPassword} minLength={8} placeholder=' Renter the Password'/>
                    <h5 className='PMessage'>Password must be at least 8 characters long.</h5>
                </div>
                {passwordConfirm?<h4><CgDanger/> password Mismatch</h4>:<></>}
                <input type="number" min={10} max={99} placeholder=' Enter the Age'/>
                <input type="email" placeholder=' Enter the Email'/>
                <input type="number" min={1000000000} max={9999999999} placeholder=' Enter the PhoneNumber'/>
                <button className='SignIn' type='submit' style={{pointerEvents: `${registerProcess?'fill':'none'}`}}>{registerProcess?'Register Now':'places Wait ...'}</button>
                <span>I already have the Account ?<Link className='a' to='/login'>Click Here</Link></span>
                <p>By continuing, you agree to Template <span className='RegisterSpan'> Terms of Service </span>an acknowledge you've read our <span className='RegisterSpan'> Privacy Policy</span></p>
              </form>
            </div>
          </div>
        </div>
        // Loading page for Registration
        :loadingAfter? <Loading/>:
        // That is thankyou page for Registration
          <div className='RegisterSuccess'>
            <div className='RegisterSuccessOuter'>
              <ul>
                <li>T</li>
                <li>h</li>
                <li>a</li>
                <li>n</li>
                <li>k</li>
                <li>&nbsp;</li>
                <li>Y</li>
                <li>o</li>
                <li>u</li>
              </ul>
              <Link to={'/login'}><button type='button'>Go to Login</button></Link>
              <Link to={'/'}><button type='button'>Go to Home</button></Link>
            </div>
          </div>
        }
      <h1 className='Underdevelopment' ref={message} style={{top: mousePosition.y+'px', left: mousePosition.x+'px'}}>Under Development</h1>
      <div className='light' ref={lightDiv} style={{ display: showPassword === 'password' ? 'none' : 'block' }}></div>
    </>
  )
}

export default Register

