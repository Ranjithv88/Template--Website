import './styles/Font.scss'
import { fonts } from '../Details'

function Font() {
  return (
    <>
        <div className='empty'/>
        <main className='Font'>
            {fonts.map(font =>(
                <div key={font.key} className='Font01'>
                    <div style={{ backgroundImage: `url(${font.image})` }} />
                    <h1>{font.name}</h1>
                </div>
            ))}
        </main>
    </>
  )
}

export default Font

