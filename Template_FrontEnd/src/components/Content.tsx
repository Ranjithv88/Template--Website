import React from 'react'
import './style/Content.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { motion } from "framer-motion"
import Img from '../assets/images/Worm.png'
import Img01 from '../assets/images/circle.png'

function Content() {
 
  const [slider, setSlider] = React.useState<number>(0)

  var temp = [{key: 1, value: 'ranjith'}, {key: 2, value: 'kumar'},{Key: 3, value: 'selva'},{Key: 4, value: 'kumar'}] 
  
  var words: string[] = ["Buy It", "Own It"]
  const [index, setIndex] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
    setIndex((prevIndex) => (prevIndex + 1) % words.length)
  }, 4000)
  return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    const item01 =  document.querySelector('.Content03Item01') as HTMLElement | null
    const item02 =  document.querySelector('.Content03Item02') as HTMLElement | null
    console.log(slider)
    if (item01 && item02) { 
      if (slider === 0) {
        item01.style.display = 'flex'
        item02.style.display = 'none'
      }else if(slider === 1) {
        item01.style.display = 'none'
        item02.style.display = 'flex'
      }
    }
  },[slider])

  return (
    <div className='Content'>
      <div className='Empty'/>
      <div className='Content01'>
        <div className='Content01Img'/>
        <div className="Content01Outer">
          <Swiper slidesPerView={2} spaceBetween={30} pagination={{ clickable: true }} modules={[Pagination]} className="mySwiper">
            {temp.map(Temp => (
              <SwiperSlide className='MySwiperSlide' key={Temp.key}>{Temp.value}</SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className='Content02'>
        <motion.h1 className='Content02Title' key='text' initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.5 }}>
          you can
        </motion.h1>
        <motion.h1 key={words[index]} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.5 }}>
          {words[index]}
        </motion.h1>
      </div>
      <div className='Empty'/>
      <div className='Content03'>
        <div className='Content03Outer'>
          <div className='Content03Item01'>
            <img src={Img} alt="Image" />
            <h1>Free Font</h1>
          </div>
          <div className='Content03Item02'>
              <img src={Img01} alt="Image" />
              <h1>Color Code</h1>
          </div>
        </div>
        <div className='Content03Controls'>
          <div className='Content03Controls01'>
            <button type='button' onClick={() => setSlider(prevCounter =>prevCounter < 1? prevCounter - 1:0) }>&lt;</button>
            <button type='button' onClick={() => setSlider(prevCounter => prevCounter > 0? prevCounter + 1:1) }>&gt;</button>
          </div>
        </div>
      </div>
      <div className='Empty'/>
    </div>
  )
}

export default Content

