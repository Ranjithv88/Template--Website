import React from "react"
import "./styles/Color.scss"
import { colors } from "../Details"
import { PiMagnifyingGlassFill } from "react-icons/pi"

function Color() {

  // Variables Declaration
  const [zoom, setZoom] = React.useState({ x: 0, y: 0 })
  const [zoomButton, setZoomButton] = React.useState<boolean>(false)

  // Zoom the Image Function
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent, imageZoom: HTMLDivElement) => {
      const pointer = {
        x: (event.offsetX * 100) / imageZoom.offsetWidth,
        y: (event.offsetY * 100) / imageZoom.offsetHeight
      }
      setZoom({ x: pointer.x, y: pointer.y })
    }

    const imageZoomElements = document.querySelectorAll('.image-zoom')

    imageZoomElements.forEach((imageZoom) => {
      const imageZoomElement = imageZoom as HTMLDivElement
      const handleMouseMoveBound = (event: MouseEvent) => handleMouseMove(event, imageZoomElement)
      imageZoomElement.addEventListener('mousemove', handleMouseMoveBound)
      return () => {
        imageZoomElement.removeEventListener('mousemove', handleMouseMoveBound)
      }
    })
  },[])

  return (
    <>
      <div className="empty" />
      <div className="ColorCodeOuter">
        <div className="ColorCodeInner">
          {colors.map((code) => (
            <div className="image-zoom" key={code.key} style={{ '--backgroundColor': `${zoomButton==true?`url(${code.image})`:'none'}`, '--zoom-x': `${zoom.x}%`, '--zoom-y': `${zoom.y}%`,'--Effect':`${zoomButton==true?'hidden':'visible'}`, cursor: `${zoomButton == true?'zoom-in':'pointer'}` } as React.CSSProperties}>
              <img src={code.image} alt="Image Code" />
            </div>
          ))}
        </div>
      </div>
      <button className="magnifying" type="button" onClick={()=>setZoomButton(!zoomButton)} style={{ backgroundColor: `${zoomButton==true?'rgba(255, 255, 255, 1)':'rgba(0, 0, 0, 1)'}`, color: `${zoomButton==true?'rgba(0, 0, 0, 1)':'rgba(255, 255, 255, 1)'}` }}><PiMagnifyingGlassFill/>Magnifying<br/>Glass</button>
    </>
  )
}

export default Color

