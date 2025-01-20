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
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { motion } from 'motion/react'
import img from '../assets/images/no-signal.jpg'

function Product() {

  interface Product {
    id: number
    image: string
    name: string
    price: number
  }

  interface ImagePreviewState {
    hidden: React.CSSProperties;
    visible: React.CSSProperties;
  }

  const [product, setProduct] = React.useState<Product | null>(null)
  const [productIdSelect, setProductIdSelect] = React.useState<number>(0)
  const [products, setProducts] = React.useState<Product[]>([])
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
  const [loadingProductId, setLoadingProductId] = React.useState<Number>(0)
  const [imageClickPreview, setImageClickPreview] = React.useState<ImagePreviewState>({hidden: {transform: 'rotate(0deg)'},visible: {transform: 'rotate(-3deg)'}})

  React.useEffect(() =>{
    loadingProcess()
  }, [productName])

  const loadingProcess = async() => {
    await loginUser()
    if(await getProduct() && await getAllProduct())
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
        return response
      } catch (e: any) {
        console.log(e)
        return false
      }
    }

  async function getProduct() {
    try {
        const response = await axios.post('http://localhost:8888/products/getOneProduct', {name: productName})
        if(response.status === 200){
          setProduct(response.data)
          setProductIdSelect(response.data.id)
          setServerOff(false)
          console.log(response.data)
          return true
        }else {
          setServerOff(false)
          setProduct(null)
          return false
        }
    }catch (e: any) {
      if(e.message === "Network Error")
        setServerOff(true)
      setProduct(null)
      console.log(e)
      return false
    }
}

  async function addCart(productId: number) {
    setLoadingProductId(productId)
    setLoadingProcessApi(true)
    if(cookies.token!=undefined) {
        try {
            const response = await axios.put('http://localhost:8888/user/updateCart/'+userInformation+'/'+productId, {}, {headers: {'Authorization': 'Bearer '+cookies.token}})
            if(response.status === 200) 
                appDispatch(setCart(response.data.products))
        }catch (e: any) {
            console.log(e)
        }
    }
    setLoadingProcessApi(false)
    setLoadingProductId(0)
  }

  const removeCartItem = async(productId: number) => {
    setLoadingProductId(productId)
    setLoadingProcessApi(true)
    if(cookies.token!=undefined) {
        try {
            const response = await axios.delete('http://localhost:8888/user/deleteCart/'+userInformation+'/'+productId, {headers: {'Authorization': 'Bearer '+cookies.token}})
            if(response.status === 200) {
              appDispatch(setCart(response.data.products))
            }
        }catch (e: any) {
            console.log(e)
        }
    }
    setLoadingProcessApi(false)
    setLoadingProductId(0)
  }

  async function getAllProduct() {
    try {
        const response = await axios.get('http://localhost:8888/products/getProducts')
        if(response.status === 200){
          setProducts(response.data.filter((data: Product) => data.id !== product?.id))
          return true
        }else {
          setProducts([])
          return false
        }
    }catch (e: any) {
      setProducts([])
      console.log(e)
      return false
    }
}

  return (
    <>
      {process ?<div className='productOuter'>
        <NavigationBar />
        <div className='empty'/>
        <div className='Product'>
          <div className='productBook'>
            <div className="productFirstBook">
              <div className="productBackArrow" onClick={()=>navigate('/')}/>
              <motion.div className='ProductImage' variants={imageClickPreview} initial='imageClickPreview.hidden' whileInView={{transform: 'rotate(-3deg)', transition: { duration: 1, delay: 0.5 } }} viewport={{ amount: 0.6 }} style={{ position: imageClickPreview==?'fixed':'static' }} onClick={()=>setImageClickPreview(!imageClickPreview)}>
                <img src={product?.image ?`data:image/jpeg;base64,${product?.image}`:img} alt={product?.name} />
              </motion.div>
            </div>
            <div className='waterMark'>P<br/>O<br/>RTF<br/>O<br/>LI<br/>O</div>
            <div className="productSecondBook">
              <h1>{product?.name}</h1>
              <div className='productContent'>
                <div className='productPrice'>
                  <h2>Price : <br/>${product?.price}.00</h2>
                  <button className='buyNow' type='button'>Buy Now</button>
                  {cart.some((item) => item.name === productName) ? <button className='RemoveProductCart' type='button' onClick={()=>removeCartItem(productIdSelect)}><GoIssueClosed/> Cart <TbShoppingCartFilled/></button> : <button className='ProductCart' type='button' style={{ visibility: user?'visible':'hidden', fontSize: user?'20px':'0px', pointerEvents: loadingProcessApi?'none':'fill' }} onClick={()=>addCart(productIdSelect)}>{loadingProcessApi? 'Please Wait ...' : 'Add to Cart'}</button>}
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
        </div>
        <div className='empty'/>
        <h1 className='anotherProducts'><h1>Another Products</h1></h1>
        <div className='empty'/>
        {products.length == 0?<></>:
        <div className='ProductOuter'>
                {products.map(data =>(
                    <div className='Content01' key={data.id}>
                        <img src={data.image?`data:image/jpeg;base64,${data.image}`:img} alt={data.name} onClick={()=>{navigate('/Home/Template/'+data.name), setProcess(false)}}/>
                        <h2 className='ProductName'>{data.name}</h2>
                        <div className='ContentInner'>
                            <p><span className='productTag'>Price : </span><span>$ </span>{data.price}.00</p>
                            {cart.some((item) => item.id === data.id) ? <button className='RemoveButton Effect' type='button' style={{ display: user?'block':'none' }} onClick={()=>removeCartItem(data.id)} ><GoIssueClosed/> Cart <TbShoppingCartFilled/></button>:<button className='Effect' type='button' style={{ display: user?'block':'none' }} onClick={()=>addCart(data.id)} >{loadingProductId === data.id ? 'Please Wait ...' : 'Add to Cart'}</button>}
                        </div>
                    </div>
                ))}
            </div>}
        <Footer /></div> : (serverOff?<NotFound />:<Loading />)
      }
    </>
  )
}

export default Product

