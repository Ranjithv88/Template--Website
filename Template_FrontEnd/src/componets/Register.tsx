import React from 'react'
import './style/Register.scss'
import { Link } from 'react-router-dom'
import {FcGoogle} from "react-icons/fc"
import {FaFacebook,FaXTwitter} from "react-icons/fa6"

function Register() {
  return (
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
            <form className='RegisterForm' >
              <input type="text" minLength={2} maxLength={25} placeholder=' Enter the Username'/>
              <input type="number" minLength={2} maxLength={2} placeholder=' Enter the Age'/>
              <input type="email" placeholder=' Enter the Email'/>
              <input type="password" minLength={8} placeholder=' Enter the Password'/>
              <input type="number" minLength={10} maxLength={10} placeholder=' Enter the PhoneNumber'/>
              <button className='SignIn' type='submit' >Register Now</button>
              <span>I already have the Account ? <Link className='a' to='/login'>Click Here</Link></span>
              <p>By continuing, you agree to Template <span className='RegisterSpan'> Terms of Service </span>an acknowledge you've read our <span className='RegisterSpan'> Privacy Policy</span></p>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register

