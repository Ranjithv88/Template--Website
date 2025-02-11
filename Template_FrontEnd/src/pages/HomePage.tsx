import { useRef, useEffect, useState } from 'react'
import './styles/HomePage.scss'
import NavigationBar from '../components/NavigationBar'
import Home from '../components/Home'
import Content from '../components/Content'
import Footer from '../components/Footer'

function HomePage() { 

  // this is mouse Following div for variables 
  var mouse = { x: 0, y: 0 }
  var circle = { x: 0, y: 0 }
  var scale = 1
  const circleElement = useRef<HTMLDivElement | null>(null)
  const [message, setMessage] = useState<boolean>(true)
  var backgroundColor: string = 'rgba(0, 0, 0, 0.2)'
  const speed = 0.17
 
  // add the Div Effects 
  const handleMouseMove = (e: MouseEvent) => {
    mouse.x = e.x
    mouse.y = e.y
    if(e.target instanceof Element && e.target.classList.contains('Effect')){
      scale = 0
      if(backgroundColor != 'rgba(0, 0, 0, 0.2)'){
        backgroundColor = 'rgba(0, 0, 0, 0.2)'
        setMessage(true)
      } 
    }else if(e.target instanceof Element && e.target.classList.contains('noEffect')){
      scale = 2.2
      if(backgroundColor != 'rgba(0, 0, 0, 1)'){
        backgroundColor = 'rgba(0, 0, 0, 1)'
        setMessage(false)
      }
    }else if(e.target instanceof Element && e.target.classList.contains('portfolio')){
      scale = 0.8
      if(backgroundColor != 'rgba(255, 255, 255, 1)'){
        backgroundColor = 'rgba(255, 255, 255, 1)'
        setMessage(false)
      }
    }else if(e.target instanceof Element && e.target.classList.contains('following')){
      scale = 0.8
      if(backgroundColor != 'rgba(255, 255, 255, 0.4)'){
        backgroundColor = 'rgba(255, 255, 255, 0.4)'
        setMessage(true)
      }
    }else{
      scale = 1
      if(backgroundColor != 'rgba(0, 0, 0, 0.2)'){
        backgroundColor = 'rgba(0, 0, 0, 0.2)'
        setMessage(true)
      }
    }
  }
 
  // Add Event Listener for mousemove this is used to following mouse 
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    const tick = () => {
      circle.x += (mouse.x - circle.x) * speed
      circle.y += (mouse.y - circle.y) * speed
      if (circleElement.current){
        circleElement.current.style.transform = `translate(${circle.x}px, ${circle.y}px) scale(${scale})`
        circleElement.current.style.backgroundColor = backgroundColor
      }
      window.requestAnimationFrame(tick)
    }
    tick()
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  },[])

  return (
    // HomePage HTMl tags 
    <div className='Home'>
        <div className='circle' ref={circleElement}>{message?(<></>):(<h1>View More</h1>)}</div>
        <NavigationBar/>
        <Home/>
        <Content/>
        <Footer/>
    </div>
  )
}

export default HomePage

