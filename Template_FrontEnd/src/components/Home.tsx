import React from 'react'
import './styles/Home.scss'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const [mousePosition, setMousePosition] = React.useState({ x: 500, y: 500 })
    const [isHovered, setIsHovered] = React.useState(false)
    const message = React.useRef<HTMLDivElement | null>(null)

    // button message on hover
    const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX+10, y: e.clientY+10 })
    }
    React.useEffect(() => {
          if (isHovered){
            document.addEventListener('mousemove', handleMouseMove)
            if (message.current) {
              message.current.style.display = 'block';
            }
          }else {
            document.removeEventListener('mousemove', handleMouseMove)
            if (message.current) {
              message.current.style.display = 'none'
            }
            }
          return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [isHovered])
        

  return (
    <>
        <div className='empty'/>
        <main className="HMainOuter">
            <main className="HMainInner">
                <div className='HOne portfolio' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
                    <h1 className='portfolio'>Create your own Portfolio</h1>
                    <p className='portfolio'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa esse corrupti obcaecati aliquam dolores assumenda maiores deserunt excepturi quos expedita tenetur, quae id, incidunt, quo possimus error natus eum ipsam.</p>
                </div>
                <div className='HTwo noEffect'>
                    <button>View More</button>
                </div>
                <div className='HThree'>
                    <div className='HThree01' onClick={()=> navigate('./Font-Face')}><h1>$Fonts</h1></div>
                    <div className='HThree02'><h1>$Colors</h1></div>
                </div>
            </main>
        </main>
        <div className='empty'/>
        <h1 className='Underdevelopment' ref={message} style={{top: mousePosition.y+'px', left: mousePosition.x+'px'}}>Click</h1>
    </>
  )
}

export default Home

