import React from 'react'
import './style/Register.scss'
import { Link } from 'react-router-dom'
import {FcGoogle} from "react-icons/fc"
import {FaFacebook,FaXTwitter} from "react-icons/fa6"
import { CgDanger } from "react-icons/cg"
import axios from 'axios'
import Loading from './Loading'

function Register() {

  const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
  const [after, setAfter] = React.useState(true)
  const [loadingAfter, setLoadingAfter] = React.useState(true)
  const [emailUnique, setEmailUnique] = React.useState(false)
  const [passwordConfirm, setPasswordConfirm] = React.useState(false)
  const [phoneNumberUnique, setPhoneNumberUnique] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState<String>('password')

  interface FormData {
    name: string
    age: number
    email: string
    password: string
    conformPassword?: string
    phoneNumber: string
  }

    const submit = async (event: any): Promise<void> => {
    event.preventDefault()
    document.body.style.cursor = "wait"
    var registerData: FormData = {
      name: event.target[0].value,
      age: parseInt(event.target[1].value),
      email: event.target[2].value,
      password: event.target[3].value,
      conformPassword: event.target[4].value,
      phoneNumber: event.target[5].value
    }
    if(validation(registerData)){
      if(await addUser(registerData)){
        setAfter(false)
        await sleep(5000)
        setLoadingAfter(false)
      }
      document.body.style.cursor = "default"
    }
    document.body.style.cursor = "default"
  }

  function validation(registerData: any): boolean { 
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(registerData.name.length < 2){
      return false
    }else if(registerData.age >= 10 && registerData.age >= 99){
      return false
    }else if(!emailPattern.test(registerData.email)){
      return false
    }else if(registerData.password != registerData.conformPassword){
      setPasswordConfirm(true)
      return false
    }else if(registerData.password.length < 8){
      return false
    }else if(registerData.phoneNumber.length != 10){
      return false
    }else{
      setPasswordConfirm(false)
      return true
    }
  }

  async function addUser(registerData: any) {
    try{
      let response = await axios.post('http://localhost:8888/register',
        {
          name: registerData.name,
          age: registerData.age,
          email: registerData.email,
          password: registerData.password,
          phoneNumber: registerData.phoneNumber
        })
        if(response.status === 201 && response.data === "Registered Successfully...!"){
          console.log(response)
          return true
        }else if(response.status != 409 && response.data != "That Email is taken, Try another...!"){
          setEmailUnique(true)
          return false
        }else if(response.status != 409 && response.data != "That PhoneNumber is taken. Try another...!"){
          setPhoneNumberUnique(true)
          return false
        }else{
          setEmailUnique(false)
          setPhoneNumberUnique(false)
          return false
        }
    }catch (e){
      alert(" Something Went wrong, please try again later....!")
      console.log(e)
      return false
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(showPassword === 'text'? 'password' : 'text')
  }
 
  return (
    <>
      {after?
        <div className='Register'>
          <div className='RegisterBanner'>
            <div className='RegisterOuter'>
              <h1>Welcome to Template</h1>
              <div className='RegisterLink'>
                <h1> Using Magical Link? </h1>
                <button className='SignG'><h3><FcGoogle /></h3>Continue With Google </button>
                <button className='SignF'><h3><FaFacebook /></h3>Continue With FaceBook </button>
                <button className='SignT'><h3><FaXTwitter /></h3>Continue With X </button>
              </div>
              <form className='RegisterForm' onSubmit={submit}>
                <input type="text" minLength={2} placeholder=' Enter the Username'/>
                <input type="number" min={10} max={99} placeholder=' Enter the Age'/>
                <input type="email" placeholder=' Enter the Email'/>
                {emailUnique?<h4><CgDanger/> That Email is taken. Try another.</h4>:<></>}
                <input type={showPassword} minLength={8} placeholder=' Enter the Password'/>
                <input type={showPassword} minLength={8} placeholder=' Renter the Password'/>
                <h5 onClick={togglePasswordVisibility}>Show Password</h5>
                {passwordConfirm?<h4><CgDanger/> password Mismatch</h4>:<></>}
                <input type="number" min={1000000000} max={9999999999} placeholder=' Enter the PhoneNumber'/>
                {phoneNumberUnique?<h4><CgDanger/> That PhoneNumber is taken. Try another.</h4>:<></>}
                <button className='SignIn' type='submit'>Register Now</button>
                <span>I already have the Account ?<Link className='a' to='/login'>Click Here</Link></span>
                <p>By continuing, you agree to Template <span className='RegisterSpan'> Terms of Service </span>an acknowledge you've read our <span className='RegisterSpan'> Privacy Policy</span></p>
              </form>
            </div>
          </div>
        </div>
        :loadingAfter? <Loading/>:
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
              <button type='button'><Link className='a' to={'/login'}>Go to Login</Link></button>
              <button type='button'><Link className='a' to={'/Home'}>Go to Home</Link></button>
            </div>
          </div>
        }
    </>
  )
}

export default Register

