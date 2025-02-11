import React from 'react'
import './styles/Product.scss'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../redux/Hooks'
import { setUserName, setAge, setEmail, setPhoneNumber, setCart } from '../redux/UserSlices'
import NavigationBar from './NavigationBar'
import Loading from './Loading'
import NotFound from './404'
import Footer from './Footer'
import { TbShoppingCartFilled } from "react-icons/tb"
import { GoIssueClosed } from "react-icons/go"
import img from '../assets/images/no-signal.jpeg'
import NotFoundMedia01 from '../assets/media/404-NotFound-first.gif'
import NotFoundMedia02 from '../assets/media/404-NotFound-second.gif'
import NotFoundMedia03 from '../assets/media/404-NotFound-three.gif'

function Product() {

  // Product Interface Model 
  interface Product {
    id: number
    image: string
    name: string
    price: number
  }

  // Product Details variable and Hooks 
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
  const [imageClickPreview, setImageClickPreview] = React.useState<boolean>(false)
  const [notFound, setNotFound] = React.useState<boolean>(true)
  const [isHovered, setIsHovered] = React.useState<boolean>(false)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const message = React.useRef<HTMLHeadingElement | null>(null)

  // useEffect trigger OnLoading
  React.useEffect(() =>{setProcess(false), loadingProcess()},[productName])

  // This for Loading Process 
  const loadingProcess = async() => {
    await loginUser()
    if(await getProduct() && await getAllProduct())
      setProcess(true)
    else
    setProcess(false)
  }

  // this is for Login user
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

  // Get Login User Details 
  const getUserDetails = async() => {
    try {
      let response = await axios.get('http://localhost:8888/user/getUserDetails', {headers: {'Authorization': 'Bearer '+cookies.token}})
      return response
    } catch (e: any) {
      console.log(e)
      return false
    }
  }

  // Get the Product Details 
  async function getProduct() {
    try {
        const response = await axios.post('http://localhost:8888/products/getOneProduct', {name: productName})
        if(response.status === 200){
          setProduct(response.data)
          setProductIdSelect(response.data.id)
          setServerOff(false)
          setNotFound(true)
          return true
        }else {
          setServerOff(false)
          setProduct(null)
          return false
        }
    }catch (e: any) {
      if(e.message === "Network Error")
        setServerOff(true)
      if(e.response.status === 404 && e.response.data === ''){
        setNotFound(false)
        return true
      }
      setProduct(null)
      console.log(e)
      return false
    }
  }

   // Add Cart Product Function
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

   // Remove Cart Product Function 
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

  // get All Product From DataBase 
  async function getAllProduct() {
    try {
        const response = await axios.get('http://localhost:8888/products/getProducts')
        if(response.status === 200){
          setProducts(response.data.filter((data: Product) => data.name !== productName))
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

  // Product Not Found Message in Mouse Following Track Function 
  const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX+10, y: e.clientY+10 })
  React.useEffect(() => {
    if (isHovered){
      document.addEventListener('mousemove', handleMouseMove)
      if (message.current) {
        message.current.style.display = 'block';
      }
    }else {
      document.removeEventListener('mousemove', handleMouseMove)
      if (message.current) {
        message.current.style.display = 'none'
      }
      }
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  return (
    // Product Details Page HTML Tags  
    <>
      {process ?<div className='productOuter'>
        {/* NavigationBar Component */}
        <NavigationBar />
        <div className='empty'/>
        {/* Single Product Details HTML Tags */}
        {notFound?<div className='Product'>
          <div className='productBook'>
            <div className="productFirstBook" style={{ width: imageClickPreview?'90vw':'45vw' }}>
              <div className="productBackArrow" onClick={()=>navigate('/')}/>
              <div className="ProductImage" style={{ height: imageClickPreview?'90vh':'75vh', width: imageClickPreview?'90vw':'40vw', rotate: imageClickPreview?'2deg':'-3deg' }} onClick={()=>setImageClickPreview(!imageClickPreview)}>
                <img src={product?.image ?`data:image/jpeg;base64,${product?.image}`:img} alt={product?.name} />
              </div>
            </div>
            <div className='waterMark' style={{ display: imageClickPreview?'none':'block' }}>P<br/>O<br/>RTF<br/>O<br/>LI<br/>O</div>
            <div className="productSecondBook" style={{ display: imageClickPreview?'none':'block' }}>
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
        :
        // Product Not Found HTMl Tags 
        <div className='ProductNotFound' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
          <img className='NotFoundMedia01' src={NotFoundMedia01} alt="404 Not Found .....!" />
          <img className='NotFoundMedia02' src={NotFoundMedia02} alt="404 Not Found .....!" />
          <img className='NotFoundMedia03' src={NotFoundMedia03} alt="404 Not Found .....!" />
          <p>this error Show thw '404 Not found' Not Product in there WebSites to make sure to correctly Search or check Correct Product and check Correct Url</p>
          <div>
            <h1>4<span>°0°</span>4</h1>
            <h2>Not Found</h2>
          </div>
          <p>A '404 Not Found' error means the requested resource isn't available. Verify API endpoints match frontend requests and are case-sensitive. Check static asset paths and ensure the server is running.</p>
        </div>}
        <div className='empty'/>
        {/* Balances products Display Tags */}
        <div className='anotherProducts'><h1>Another Products</h1></div>
        <div className='empty'/>
        {products.length == 0?<></>:
        <div className='ProductOuter'>
          {products.map(data =>(
              <div className='Content01' key={data.id}>
                  <img src={data.image?`data:image/jpeg;base64,${data.image}`:img} alt={data.name} onClick={()=>navigate('/Home/Template/'+data.name)}/>
                  <h2 className='ProductName'>{data.name}</h2>
                  <div className='ContentInner'>
                      <p><span className='productTag'>Price : </span><span>$ </span>{data.price}.00</p>
                      {cart.some((item) => item.id === data.id) ? <button className='RemoveButton Effect' type='button' style={{ display: user?'block':'none' }} onClick={()=>removeCartItem(data.id)} ><GoIssueClosed/> Cart <TbShoppingCartFilled/></button>:<button className='Effect' type='button' style={{ display: user?'block':'none' }} onClick={()=>addCart(data.id)} >{loadingProductId === data.id ? 'Please Wait ...' : 'Add to Cart'}</button>}
                  </div>
              </div>
          ))}
        </div>}
        {/* Product Not Found Message Tag */}
        <h1 className='ProductNotFoundMessage' ref={message} style={{top: mousePosition.y+'px', left: mousePosition.x+'px'}}>Not Found</h1>
        {/* Footer Component */}
        <Footer /></div> 
        :
        // {/* Below Condition True Show the NotFound Component Otherwise that show Loading Component */}
        (serverOff?<NotFound />:<Loading />)
      }
    </>
  )
}

export default Product

