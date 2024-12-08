import React from 'react'
import './style/Content.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { motion } from "framer-motion"

function Content() {
 
  var temp = [{key: 1, value: 'ranjith'}, {key: 2, value: 'kumar'},{Key: 3, value: 'selva'},{Key: 4, value: 'kumar'}] 
  
  var words: string[] = ["buy it", "own it"]
  const [index, setIndex] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
    setIndex((prevIndex) => (prevIndex + 1) % words.length)
  }, 4000)
  return () => clearInterval(interval)
  }, [])

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
      <div className='Empty'/>
      <div className='Content02'>
        <motion.h1 className='Content02Title' key='text' initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.5 }}>
          you can
        </motion.h1>
        <motion.h1 key={words[index]} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.5 }}>
          {words[index]}
        </motion.h1>
      </div>
      <div className='Empty'/>
    </div>
  )
}

export default Content

