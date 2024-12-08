import './style/HomePage.scss'
import NavBar from './NavBar'
import Home from './Home'
import Content from './Content'

function HomePage() {
  return (
    <div className='Home'>
      <NavBar/>
      <Home/>
      <Content/>
    </div>
  )
}

export default HomePage

