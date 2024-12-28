import "./styles/404.scss"
import { useNavigate } from 'react-router-dom'
import { IoArrowRedoSharp } from "react-icons/io5"

function NotFound() {

  const Navigate = useNavigate()

  const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

  // Animation Function in NoTFound page
  const animation = async()=> {
    const anime = document.querySelector('.animationNotFound') as HTMLDivElement
    if(anime){
      anime.classList.add('animationNotFound01')
    }
    await sleep(2600)
    Navigate('/')
  }

  return (
    <div className='NotFoundOuter'>
      <div className='NotFound'>
        <p>A '404 Not Found' error means the requested resource isn't available. Ensure React routes are correctly defined, and server-side routing redirects to `index.html` for SPA. Verify API endpoints match frontend requests and are case-sensitive. Check static asset paths and ensure the server is running. Test URLs in Postman and configure a fallback route or page for unmatched paths.</p>
        <h1>404.</h1>
        <button onClick={animation} type="button">Go to Home <IoArrowRedoSharp/></button>
        <h2>Not Found</h2>
      </div>
      <div className='animationNotFound'/>
    </div>
  )
}

export default NotFound

