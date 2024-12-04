import React from 'react'
import './style/Register.scss'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='Register'>
      <div className='RegisterBanner'>
          <form className='RegisterForm' >
            <h1>Welcome to Template</h1>
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
  )
}

export default Register

