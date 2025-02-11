import React from 'react'
import './styles/Home.scss'
import { useNavigate } from 'react-router-dom'

function Home() {

    // Home Component Variables and Hooks 
    const navigate = useNavigate()
    const [mousePosition, setMousePosition] = React.useState({ x: 500, y: 500 })
    const [isHovered, setIsHovered] = React.useState(false)
    const message = React.useRef<HTMLDivElement | null>(null)

    // Button Message on Hover
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
    // Home Component HTML Tags 
    <>
        <div className='empty'/>
        <main className="HMainOuter">
            <main className="HMainInner">
                <div className='HOne portfolio' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
                    <h1 className='portfolio'>Create your own Portfolio</h1>
                    <p className='portfolio'>A portfolio is a collection of work samples that showcase an individual's skills and achievements. It provides potential employers or clients with insight into the person's expertise and work quality.</p>
                </div>
                <div className='HTwo noEffect'>
                    <button>View More</button>
                </div>
                <div className='HThree'>
                    <div className='HThree01' onClick={()=> navigate('./Font-Face')}><h1>$Fonts</h1></div>
                    <div className='HThree02'onClick={()=> navigate('./Color-Code')}><h1>$Colors</h1></div>
                </div>
            </main>
        </main>
        <div className='empty'/>
        {/* Button Message on Hover in HTML Tag */}
        <h1 className='click' ref={message} style={{top: mousePosition.y+'px', left: mousePosition.x+'px'}}>Click</h1>
    </>
  )
}

export default Home

