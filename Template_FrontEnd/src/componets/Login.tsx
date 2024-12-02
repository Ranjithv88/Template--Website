import React,{ useRef, useState} from 'react'
import './style/login.scss'
import {FcGoogle} from "react-icons/fc"
import {FaFacebook,FaXTwitter} from "react-icons/fa6"
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {

  const [emailValidator, setEmailValidator] = useState<boolean>(false)
  const [passwordValidator, setPasswordValidator] = useState<boolean>(false)
  const [loginValidator, setLoginValidator] = useState<boolean>(false)
  const emailInput = useRef<HTMLInputElement>()
  const passwordInput = useRef<HTMLInputElement>()

  interface FormData {
    email: string
    password: string
  }

  async function submit(){
    alert(' Pleace wait Few Seconds .....! ')
    const obj: FormData = {
      email: emailInput.current?.value,
      password: passwordInput.current?.value
    }
    if(emailValidation() == true && passwordValidation() == true) {
      if(await send(obj) == true)
        alert("Login successfully......!")
      else
        setLoginValidator(true)
    }
  }

  const emailValidation=()=> {
    if(!emailInput.current?.value.endsWith('@gmail.com')){
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
    if(passwordInput.current.value.length < 8){
      if(passwordInput.current?.value == ""){
        setPasswordValidator(false)
        return false
      }
    setPasswordValidator(true)
    return false
    }else{
      setPasswordValidator(false)
      return true
    }
  }

  async function send(obj: FormData){
    let response = await axios.post('http://localhost:8888/login',obj)
    if(response.status === 200){
      localStorage.setItem("token",response.data)
      return true
    }else
      return false
  }

  return (
    <div className='Login'>
      <form className='LoginForm' >
        <h1>Template</h1>
        <input type="text" ref={emailInput} onChange={emailValidation} placeholder=' Enter the Email'/>
        {emailValidator?<h4>Email is Invaild...</h4>:<></>}
        <input type="password" ref={passwordInput} onChange={passwordValidation} placeholder=' Enter the Password'/>
        {passwordValidator?<h4>password is to Weak...</h4>:<></>}
        <h2>Forget Your Password ?</h2>
        {loginValidator?<h4>username and Password Wrong...</h4>:<></>}
        <button className='SignIn' type='button' onClick={submit} >Log In</button>
        <span>OR</span>
        <button className='SignG'><h3><FcGoogle /></h3>Continue With Google </button>
        <button className='SignF'><h3><FaFacebook /></h3>Continue With FaceBook </button>
        <button className='SignT'><h3><FaXTwitter /></h3>Continue With X </button>
        <span>Don't have the Account ? <Link to='/register'><a href='#'>Click Here</a></Link></span>
        <p>By continuing, you agree to Online Shop Terms of Service an acknowledge you've read our Privacy Policy. Notice at collection.</p>
      </form>
    </div>
  )
}

export default Login

