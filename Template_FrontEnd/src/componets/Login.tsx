import React, { useRef, useState} from 'react'
import './style/login.scss'
import {FcGoogle} from "react-icons/fc"
import {FaFacebook,FaXTwitter} from "react-icons/fa6"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

  const [emailValidator, setEmailValidator] = useState<boolean>(false)
  const [passwordValidator, setPasswordValidator] = useState<boolean>(false)
  const [loginValidator, setLoginValidator] = useState<boolean>(false)
  const [curserValidator, setCurserValidator] = useState<String>("not-allowed")
  const emailInput = useRef<HTMLInputElement>()
  const passwordInput = useRef<HTMLInputElement>()
  const navigate = useNavigate()

  interface FormData {
    email: string
    password: string
  }

  async function submit(){
    document.body.style.cursor = "wait"
    const obj: FormData = {
      email: emailInput.current?.value,
      password: passwordInput.current?.value
    }
    if(emailValidation() == true && passwordValidation() == true) {
      console.log(await send(obj) == true)
      if(await send(obj) == true){
        navigate('./register')
      }else{
        setLoginValidator(true)
        document.body.style.cursor = "default"
      }
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

  const curserPrograss = () => {
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

  return (
    <div className='Login'>
      <div className='LoginBanner'>
          <form className='LoginForm' >
            <h1>Template</h1>
            <input type="email" ref={emailInput} onChange={()=>{emailValidation(), curserPrograss()}} placeholder=' Enter the Email'/>
            {emailValidator?<h4>Email is Invaild...</h4>:<></>}
            <input type="password" ref={passwordInput} onChange={()=>{passwordValidation(), curserPrograss()}} minlength="8" placeholder=' Enter the Password'/>
            {passwordValidator?<h4>password is to Weak...</h4>:<></>}
            <h2>Forget Your Password ?</h2>
            {loginValidator?<h4>username and Password Wrong...</h4>:<></>}
            <button className='SignIn' type='button' style={{ cursor: curserValidator }} onClick={submit} >Log In</button>
            <span>OR</span>
            <button className='SignG'><h3><FcGoogle /></h3>Continue With Google </button>
            <button className='SignF'><h3><FaFacebook /></h3>Continue With FaceBook </button>
            <button className='SignT'><h3><FaXTwitter /></h3>Continue With X </button>
            <span>Don't have the Account ? <Link to='/register'><a href='#'>Click Here</a></Link></span>
            <p>By continuing, you agree to Online Shop Terms of Service an acknowledge you've read our Privacy Policy. Notice at collection.</p>
          </form>
        </div>
    </div>
  )
}

export default Login

