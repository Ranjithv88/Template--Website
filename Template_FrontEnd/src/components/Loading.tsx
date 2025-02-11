import './styles/Loading.scss'
import media from '../assets/media/Loading_bg.mp4'

function Loading() {
  return (
    // Loading Component HTML Tags 
    <div className='Loading'>
       <video className="media" autoPlay muted loop>
        <source src={media} type="video/mp4"/>
      </video>
      <div className='LoadingOuter'>
        <div className='LoadingInner'></div>
      </div>
      {/* Loading Messages Tags */}
      <ul>
        <li>L</li>
        <li>o</li>
        <li>a</li>
        <li>d</li>
        <li>i</li>
        <li>n</li>
        <li>g</li>
        <li>.</li>
        <li>.</li>
        <li>.</li>
      </ul>
    </div>
  )
}

export default Loading

