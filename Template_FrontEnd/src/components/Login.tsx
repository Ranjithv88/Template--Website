import React, { useRef, useState} from 'react'
import './style/login.scss'
import {FcGoogle} from "react-icons/fc"
import {FaFacebook,FaXTwitter} from "react-icons/fa6"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'
import svg from '../assets/logo/Template.svg'

function Login() {

  const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
  const [after, setAfter] = React.useState(true)
  const [loadingAfter, setLoadingAfter] = React.useState(true)
  const [emailValidator, setEmailValidator] = useState<boolean>(false)
  const [loginValidator, setLoginValidator] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<String>('password')
  const [curserValidator, setCurserValidator] = useState<String>("not-allowed")
  const emailInput = useRef<HTMLInputElement>()
  const passwordInput = useRef<HTMLInputElement>()

  interface FormData {
    email: string
    password: string
  }

  async function submit(){
    document.body.style.cursor = "wait"
    const obj: FormData = {
      email: emailInput.current?.value || "",
      password: passwordInput.current?.value || "",
    }
    if(emailValidation() == true && passwordValidation() == true) {
      if(await send(obj) == true){
        setAfter(false)
        await sleep(5000)
        setLoadingAfter(false)
      }else{
        setLoginValidator(true)
        document.body.style.cursor = "default"
      }
    }
    document.body.style.cursor = "default"
  }

  const emailValidation=()=> {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailPattern.test(emailInput.current?.value)){
      if(!emailInput.current?.value == ""){
        setEmailValidator(true)
        return false
      }
      setEmailValidator(false)
      return false
    }else{
      setEmailValidator(false)
      return true
    }
  }

  const passwordValidation=()=> {
    if(passwordInput.current.value.length < 2){
      if(passwordInput.current?.value == ""){
        return false
      }
    return false
    }else{
      return true
    }
  }

  const curserProgress = () => {
    if(emailValidation() && passwordValidation())
      setCurserValidator("pointer")
    else
      setCurserValidator("not-allowed")
  }

  async function send(obj: FormData){
    try{
      let response = await axios.post('http://localhost:8888/login',obj)
      if(response.status === 200){
        localStorage.setItem("token",response.data)
        return true
      }else
        return false
    }catch(e){
      console.error(e)
      return false
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(showPassword === 'text'? 'password' : 'text')
  }

  return (
    <>
      {after?
        <div className='Login'>
          <div className='LoginBanner'>
              <form className='LoginForm' >
                <h1>Hi, welcome back!</h1>
                <input type="email" ref={emailInput} onChange={()=>{emailValidation(), curserProgress()}} placeholder=' Enter the Email'/>
                {emailValidator?<h4>Email is Invaild...</h4>:<></>}
                <input type={showPassword} ref={passwordInput} onChange={()=>{passwordValidation(), curserProgress()}} minLength={2} placeholder=' Enter the Password'/>
                <h5 className='ShowPassword' onClick={togglePasswordVisibility}>Show Password</h5>
                <h2>Forget Your Password ?</h2>
                {loginValidator?<h5>username and Password Wrong...</h5>:<></>}
                <button className='SignIn' type='button' style={{ cursor: curserValidator }} onClick={submit} >Log In</button>
                <span>OR</span>
                <button className='SignG'><h3><FcGoogle /></h3>Continue With Google </button>
                <button className='SignF'><h3><FaFacebook /></h3>Continue With FaceBook </button>
                <button className='SignT'><h3><FaXTwitter /></h3>Continue With X </button>
                <span>Don't have the Account ?<Link className='a' to='/register'>Click Here</Link></span>
                <p>By continuing, you agree to Template <span className='LoginSpan'> Terms of Service </span>an acknowledge you've read our <span className='LoginSpan'> Privacy Policy</span></p>
              </form>
            </div>
        </div>:loadingAfter? <Loading/>:
        <div className='LoginSuccess'>
          <img src={svg} alt='Template'/>
          <h2>hi, {emailInput.current?.value}</h2>
          <button type='button'><Link className='a' to={'/Home'}>go to Home</Link></button>
        </div>
      }
    </>
  )
}

export default Login

