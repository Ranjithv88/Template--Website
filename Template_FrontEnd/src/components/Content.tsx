import { useState, useEffect } from 'react'
import './styles/Content.scss'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useAppSelector, useAppDispatch } from '../redux/Hooks'
import { setCart } from '../redux/UserSlices'
import { TbShoppingCartFilled } from "react-icons/tb"
import { GoIssueClosed } from "react-icons/go"
import img from '../assets/images/no-signal.jpg'

function Content() {

    let temp01: Product[] = [{id : 1, image: img, name : 'preview', price: 0},{id : 2, image: img, name : 'preview', price: 0},{id : 3, image: img, name : 'preview', price: 0},{id : 4, image: img, name : 'preview', price: 0},{id : 5, image: img, name : 'preview', price: 0}, {id : 6, image: img, name : 'preview', price: 0}, {id : 7, image: img, name : 'preview', price: 0}, {id : 8, image: img, name : 'preview', price: 0}, {id : 9, image: img, name : 'preview', price: 0}, {id : 10, image: img, name : 'preview', price: 0}]
    const [products, setProducts] = useState<Product[]>([])
    const [cookies] = useCookies(['token'])
    const userInformation = useAppSelector((state) => state.user.userName)
    const cart = useAppSelector((state) => state.user.cart)
    const appDispatch = useAppDispatch()
    const [loadingProductId, setLoadingProductId] = useState<Number>(0)
    
    interface Product {
        id: number
        image: string
        name: string
        price: number
    }
    
    useEffect(()=>{getProduct()}, []) 

    async function getProduct() {
        try {
            const response = await axios.get('http://localhost:8888/products/getProducts')
            response.status === 200 ? setProducts(response.data) : setProducts(temp01)
        }catch (e: any) {
            setProducts(temp01)
            console.log(e)
        }
    }

    async function addCart(productId: number) {
        setLoadingProductId(productId)
        if(cookies.token!=undefined) {
            try {
                const response = await axios.put('http://localhost:8888/user/updateCart/'+userInformation+'/'+productId, {}, {headers: {'Authorization': 'Bearer '+cookies.token}})
                if(response.status === 200) 
                    appDispatch(setCart(response.data.products))
            }catch (e: any) {
                console.log(e)
            }
        }
        setLoadingProductId(0)
    }

    const removeCartItem = async(productId: number) => {
        setLoadingProductId(productId)
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
        setLoadingProductId(0)
      }

    return (
        <div className='Content'>
            <h1>Template</h1>
            <div className='ContentOuter'>
                {products.map(product =>(
                    <div className='Content01' key={product.id}>
                        <img src={img} alt={product.name} />
                        <h2 className='ProductName'>{product.name}</h2>
                        <div className='ContentInner'>
                            <p><span className='productTag'>Price : </span><span>$ </span>{product.price}.00</p>
                            {cart.some((item) => item.id === product.id) ? <button className='RemoveButton Effect' type='button' onClick={()=>removeCartItem(product.id)}><GoIssueClosed/> Cart <TbShoppingCartFilled/></button>:<button className='Effect' type='button' onClick={()=>addCart(product.id)} >{loadingProductId === product.id ? 'Please Wait ...' : 'Add to Cart'}</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Content

