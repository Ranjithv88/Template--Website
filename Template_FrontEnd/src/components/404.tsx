import "./styles/404.scss"
import { Link } from 'react-router-dom'
import { IoArrowRedoSharp } from "react-icons/io5"

function NotFound() {
  return (
    <div className='NotFound'>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere eveniet provident dolor, pariatur ex cumque est, quas libero velit dolore itaque delectus incidunt nihil porro harum magnam beatae facilis animi.</p>
      <h1>404.</h1>
      <Link to={'/'}><button type="button">Go <IoArrowRedoSharp/><br/>to Home</button></Link>
      <h2>Not Found</h2>
    </div>
  )
}

export default NotFound

