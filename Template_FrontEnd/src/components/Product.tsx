import React from 'react'
import './styles/Product.scss'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setUserName, setAge, setEmail, setPhoneNumber, setCart } from '../redux/UserSlices'
import { useAppSelector, useAppDispatch } from '../redux/Hooks'
import { useCookies } from 'react-cookie'
import Loading from './Loading'
import NotFound from './404'
import { TbShoppingCartFilled } from "react-icons/tb"
import { GoIssueClosed } from "react-icons/go"

function Product() {

  interface Product {
    id: number
    image: string
    name: string
    price: number
  }

  const [product, setProduct] = React.useState<Product | null>(null)
  const { productName } = useParams<{ productName: string }>()
  const [user, setUser] = React.useState<boolean>(false)
  const userInformation = useAppSelector((state) => state.user.userName)
  const cart = useAppSelector((state) => state.user.cart)
  const appDispatch = useAppDispatch()
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()
  const [process, setProcess] = React.useState<boolean>(false)
  const [loadingProcessApi, setLoadingProcessApi] = React.useState<boolean>(false)
  const [serverOff, setServerOff] = React.useState<boolean>(false)

  React.useEffect(() =>{
    
    loadingProcess()
  }, [])

  const loadingProcess = async() => {
    await loginUser()
    if(await getProduct())
      setProcess(true)
    else
    setProcess(false)
  }

   const loginUser = async() => {
      if(cookies.token!=undefined) {
        const response = await getUserDetails()
        if (response) {
          appDispatch(setUserName(response.data.userName))
          appDispatch(setAge(response.data.age))
          appDispatch(setEmail(response.data.email))
          appDispatch(setPhoneNumber(response.data.phoneNumber))
          appDispatch(setCart(response.data.cart.products))
          setUser(true)
          return true
        }
        setUser(false)
        return false
      }else {
        setUser(false)
        console.log(" places Login ....! ")
        return false
      }
    }

    const getUserDetails = async() => {
      try {
        let response = await axios.get('http://localhost:8888/user/getUserDetails', {headers: {'Authorization': 'Bearer '+cookies.token}})
        setServerOff(false)
        return response
      } catch (e: any) {
        if(e.message === "Network Error"){
          setServerOff(true)
          alert("Server is Not Working, please try again later....!")
        }
        console.log(e)
        return false
      }
    }

  async function getProduct() {
    try {
        const response = await axios.post('http://localhost:8888/products/getOneProduct', {name: productName})
        if(response.status === 200){
          setProduct(response.data)
          return true
        }else {
          setProduct(null)
          return false
        }
    }catch (e: any) {
        setProduct(null)
        console.log(e)
        return false
    }
}

  async function addCart() {
    setLoadingProcessApi(true)
    if(cookies.token!=undefined) {
        try {
            const response = await axios.put('http://localhost:8888/user/updateCart/'+userInformation+'/'+product?.id, {}, {headers: {'Authorization': 'Bearer '+cookies.token}})
            if(response.status === 200) 
                appDispatch(setCart(response.data.products))
        }catch (e: any) {
            console.log(e)
        }
    }
    setLoadingProcessApi(false)
  }

  const removeCartItem = async() => {
    setLoadingProcessApi(true)
    if(cookies.token!=undefined) {
        try {
            const response = await axios.delete('http://localhost:8888/user/deleteCart/'+userInformation+'/'+product?.id, {headers: {'Authorization': 'Bearer '+cookies.token}})
            if(response.status === 200) {
              appDispatch(setCart(response.data.products))
            }
        }catch (e: any) {
            console.log(e)
        }
    }
    setLoadingProcessApi(false)
  }

  return (
    <>
      {process ?
        <div className='Product'>
          <div className='productBook'>
            <div className="productFirstBook">
              <div className="productBackArrow" onClick={()=>navigate('/')}/>
              <div className='ProductImage'>
                <img src={product?.image} alt={product?.name} />
              </div>
            </div>
            <div className='waterMark'>P<br/>O<br/>RTF<br/>O<br/>LI<br/>O</div>
            <div className="productSecondBook">
              <h1>{product?.name}</h1>
              <div className='productContent'>
                <div className='productPrice'>
                  <h2>Price : <br/>${product?.price}.00</h2>
                  <button className='buyNow' type='button'>Buy Now</button>
                  {cart.some((item) => item.name === productName) ? <button className='RemoveProductCart' type='button' onClick={()=>removeCartItem()}><GoIssueClosed/> Cart <TbShoppingCartFilled/></button> : <button className='ProductCart' type='button' style={{ visibility: user?'visible':'hidden', fontSize: user?'20px':'0px', pointerEvents: loadingProcessApi?'none':'fill' }} onClick={()=>addCart()}>{loadingProcessApi? 'Please Wait ...' : 'Add to Cart'}</button>}
                  <button className='ProductLiveDemo' type='button'>Live demo</button>
                </div>
              </div>
              <div className='productDetails'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum dignissimos asperiores expedita magnam eligendi, ut ullam odit maxime optio dicta, distinctio porro quis pariatur atque? Quaerat quas repellat in commodi!</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum dignissimos asperiores expedita magnam eligendi, ut ullam odit maxime optio dicta, distinctio porro quis pariatur atque? Quaerat quas repellat in commodi!</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum dignissimos asperiores expedita magnam eligendi, ut ullam odit maxime optio dicta, distinctio porro quis pariatur atque? Quaerat quas repellat in commodi!</p>
              </div>
            </div>
          </div>
        </div> : (serverOff?<NotFound />:<Loading />)
      }
    </>
  )
}

export default Product

