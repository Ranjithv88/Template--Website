import React from 'react'
import './style/FeedBack.scss'
import { FaArrowRight } from "react-icons/fa"

function FeedBack() {

  React.useEffect(() => {
    const Feedback = document.querySelector('.Feedback')
    if(Feedback)
      Feedback.scrollIntoView({ block: 'start' })
  }, [])

  return (
    <div className='Feedback'>
      <div className='Empty'/>
      <div className='FeedbackOuter'>
          <h2>Feedback</h2>
          <form>
            <div>
              <input type="email" placeholder='Email Address'/>
            </div>
            <textarea id="feedback" name="feedback" minLength={10} rows={5} cols={30} placeholder='Message'/>
          </form>
          <button type="button"><FaArrowRight/></button>
        </div>
    </div>
  )
}

export default FeedBack

