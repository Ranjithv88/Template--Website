import React from 'react'
import './styles/Font.scss'
import { fonts } from '../Details'
import { motion } from 'motion/react'
import { FaRegWindowClose } from "react-icons/fa"
import { transform } from 'motion'

function Font() {

  interface FontPreview {
    image: string
    name: string
  }
  
  const [preview, setPreview] = React.useState<FontPreview>({ image: '', name: '' })
  const [previewToggle, setPreviewToggle] = React.useState<boolean>(false)

  return (
    <>
        <div className='empty'/>
        <main className='FontOuter'>
          <main className='Font'>
              {fonts.map(font =>(
                  <motion.div key={font.key} className='Font01'
                    initial={{ opacity: 0.8, filter: 'grayScale(100%) blur(0.5px)' }} 
                    whileInView={{ opacity: 1, filter: 'grayScale(0%) blur(0px)', transition: { duration: 0.8 } }} 
                    viewport={{ amount: 0.6 }}
                    onClick={()=>{setPreview({ image: font.image,  name: font.name }); setPreviewToggle(true) }}
                   >
                      <div style={{ backgroundImage: `url(${font.image})` }} />
                      <h1>{font.name}</h1>
                  </motion.div>
              ))}
          </main>
        </main>
        <div className='FontDetails' style={{ display: previewToggle?'flex':'none' }}>
          <div style={{ backgroundImage: `url(${preview.image})` }} />
            <h1><span>Font Name : </span>{preview.name}</h1>
            <p>Fonts are sets of characters with a common design, categorized into families like serif, sans-serif, monospace, and display fonts. They vary in style (italic, bold) and weight, and are chosen based on readability and design purpose. Web fonts are hosted externally, while system fonts are pre-installed on devices. Proper font pairing and accessibility are key to effective design. Font licensing is important to ensure legal usage, especially for commercial projects.</p>
             <button type='button'><FaRegWindowClose className='a' onClick={()=>setPreviewToggle(preValue => preValue == true ? false : true)}/></button>
        </div>
    </>
  )
}

export default Font

