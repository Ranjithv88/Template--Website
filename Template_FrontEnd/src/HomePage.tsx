import { useRef, useEffect } from 'react'
import './HomePage.scss'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'

function HomePage() { 

  var mouse = { x: 0, y: 0 }
  var circle = { x: 0, y: 0 }
  var scale = 1
  const circleElement = useRef<HTMLDivElement | null>(null)
  const speed = 0.17
 
  const handleMouseMove = (e: MouseEvent) => {
    mouse.x = e.x
    mouse.y = e.y
    if(e.target instanceof Element && e.target.classList.contains('Effect'))
      scale = 1.5
    else 
      scale = 1
  }
 
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
 
    const tick = () => {
      circle.x += (mouse.x - circle.x) * speed
      circle.y += (mouse.y - circle.y) * speed
      if (circleElement.current)
        circleElement.current.style.transform = `translate(${circle.x}px, ${circle.y}px) scale(${scale})`
 
      window.requestAnimationFrame(tick)
    }
    tick()
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  },[])

  return (
    <div className='Home'>
        <div className='circle' ref={circleElement}/>
        <NavigationBar/>
        <Home/>
    </div>
  )
}

export default HomePage

