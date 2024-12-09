import { useEffect, useRef } from 'react'
import './style/HomePage.scss'
import NavBar from './NavBar'
import Home from './Home'
import Content from './Content'
import Footer from './Footer'

function HomePage() {
  var mouse = { x: 0, y: 0 }
  var circle = { x: 0, y: 0 }
  const circleElement = useRef<HTMLDivElement>(null)
  const speed: number = 0.17
 
  const handleMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    }
 
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
 
    const tick = () => {
      circle.x += (mouse.x - circle.x) * speed
      circle.y += (mouse.y - circle.y) * speed
      if (circleElement.current) {
        circleElement.current.style.transform = `translate(${circle.x}px, ${circle.y}px)`
      }
      window.requestAnimationFrame(tick)
    }
    tick()
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  },[])
  return (
    <div className='Home'>
      <div className="circle" ref={circleElement}/>
      <NavBar/>
      <Home/>
      <Content/>
      <Footer/>
    </div>
  )
}

export default HomePage

