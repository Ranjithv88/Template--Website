import React from 'react'
import './styles/DashBoard.scss'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { setUserName, setAge, setEmail, setPhoneNumber } from '../redux/UserSlices'
import { useAppSelector, useAppDispatch } from '../redux/Hooks'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { BiLogOutCircle } from "react-icons/bi"

function DashBoard() {

    const [process, setProcess] = React.useState<boolean>(false)
    const [cookies, _, removeCookie] = useCookies(['token'])
    const appDispatch = useAppDispatch()
    const userInformation = useAppSelector((state) => state)
    const details:{key: number, name: string, description: string}[] = [{key: 1, name: 'Personal Information', description:'Edit the Profile ,its a general Information about you, its confidential'}, {key: 2, name: 'Security', description:'its a Security Information about you, its most import'}, {key: 3, name: 'Terms & services', description:'its Terms & services you must read it place'}, {key: 4, name: 'Coming Soon', description: ''}]

    React.useEffect(() => {
        editUser()
    }, [])

    const editUser = async() => {
        setProcess(true)
        if(cookies.token!=undefined) {
          const response = await getUserDetails()
          if (response) {
            appDispatch(setUserName(response.data.userName), setAge(response.data.age), setEmail(response.data.email), setPhoneNumber(response.data.phoneNumber))

          }
          setProcess(false)
        }else {
          console.log(" places Login ....! ")
          setProcess(false)
        }
      }
    
    const getUserDetails = async() => {
        try {
          let response = await axios.get('http://localhost:8888/user/getUserDetails', {headers: {'Authorization': 'Bearer '+cookies.token}})
          return response
        } catch (e: any) {
          if(e.message === "Network Error")
            alert("Server is Not Working, please try again later....!")
          console.log(e)
          return false
        }
    }

  return (
    <div className='DashBoard'>
      <div className='DashBoardInner'>
        <Link className='DashBoardBack' to={'/'}><BiLogOutCircle/>Go To Home</Link>
        <div className='DashBoardOuter'>
          {details.map(data=>(
            <motion.div key={data.key} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }} onClick={} >
              <h1>{data.name}</h1>
              <p>{data.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className='DashBoardSpace'/>
      <div className='DashBoardContent'>

      </div>
      <div className='DashBoardContent01' >
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }}>We collect personal information like name, email, and payment details to process orders and improve our services. Non-personal data, such as browser type and IP address, is used for analytics. Your information is protected and only shared with trusted third parties, like payment processors. Cookies are used to enhance your experience, and you can manage them in your browser settings.<br/><a href="#"> Read The Document</a></motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 3 } }} viewport={{ amount: 0 }}>By using our website, you agree to comply with our terms. Templates are sold under a limited-use license and cannot be redistributed or resold. All purchases are final, with no refunds, unless otherwise stated. We reserve the right to modify or terminate services at any time.<br/><a href="#">Read The Document</a></motion.p>
      </div>
    </div>
  )
}

export default DashBoard

