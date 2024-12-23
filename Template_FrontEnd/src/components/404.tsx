import "./styles/404.scss"
import { Link } from 'react-router-dom'
import { IoArrowRedoSharp } from "react-icons/io5"

function NotFound() {
  return (
    <div className='NotFound'>
      <p>A '404 Not Found' error means the requested resource isn't available. Ensure React routes are correctly defined, and server-side routing redirects to `index.html` for SPA. Verify API endpoints match frontend requests and are case-sensitive. Check static asset paths and ensure the server is running. Test URLs in Postman and configure a fallback route or page for unmatched paths.</p>
      <h1>404.</h1>
      <Link to={'/'}><button type="button">Go <IoArrowRedoSharp/><br/>to Home</button></Link>
      <h2>Not Found</h2>
    </div>
  )
}

export default NotFound

