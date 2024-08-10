import {FC, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDiscount, deleteProduct, getOneProduct } from '../../API/productsAPI/productAPI'
import { productItem } from '../../store/slices/productSlice'
import './productPage.css'
import { RotateLoader } from 'react-spinners'
import { addCartProduct, addLastView } from '../../API/usersAPI/usersApi'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useActions } from '../../hooks/useActions'
import AdminProductModal from '../../components/adminProductModal/AdminProductModal'
import ErrorPage from '../errorPage/ErrorPage'
import PopUp from '../../components/pop-upWindow/PopUp'

const ProductPage:FC = () => {

    const navigate = useNavigate()

    const {addProductToCart} = useActions()

    const [product, setProduct] = useState<productItem>()
    const [RAM, setRAM] = useState('')
    const [loading, setLoading] = useState(true)
    const [modalState, setModalState] = useState(false)
    const [popUpStatus, setPopUpStatus] = useState<{show: boolean, success?: boolean, text?: string}>({show: false, success: true, text: ''})

    const Close = () => setModalState(false)

    const {id} = useParams()

    const {user} = useAppSelector(state => state.userReducer)
    const {cart} = useAppSelector(state => state.productReducer)

    useEffect(() => {
        getOneProduct(Number(id)).then(data => setProduct(data)).then(data => setLoading(false))
    }, [])

    console.log('qwe')

    if(product) {
        addLastView(user.id!, product)
    }

    if(loading){
        return <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><RotateLoader /></div>
    }

    if(!product){
        return <ErrorPage message="Product does not exist" />
    }

    if(popUpStatus.show){
        setTimeout(() => setPopUpStatus({show: false}), 4000)
    }

    const {description, price, title, image, memory, discount} = product!

    const cartButtonHandler = () => {
        addCartProduct(user.id!, {...product, amount: 1})
        let isExist = false;
        if(cart) cart.forEach((el) => { if(el.id == product.id) isExist = true })
        if(!isExist) {
            addProductToCart({...product, amount: 1}) 
            setPopUpStatus({show: true, success: true, text: 'Added to cart'})
        }
        else setPopUpStatus({show: true, success: false, text: 'Already in cart'})
    }

    const discountClickHandler = () => {
       const price = +prompt('enter new price')!
       addDiscount(Number(id), price)
    }

    const removeDiscount = () => {
        addDiscount(Number(id), 0)
    }

    const deleteProductHandler = () => {
        deleteProduct(Number(id))
        navigate('/', {replace: false})
    }

    const modalFooter = <button className='credit-button'>Save</button>

    const modalBody = <div>
        <button className='discount-button' onClick={discountClickHandler}>discount</button>
        { product?.discount ? <button className='delete-button' onClick={removeDiscount}>remove discount</button> : <></>}
        <button className='delete-button' onClick={deleteProductHandler}>delete product</button>
    </div>

    return(
        <div className='productPageContainer'>
        {popUpStatus.show ? <PopUp text={popUpStatus.text!} isSucces={popUpStatus.success!} /> : <></>}
            <div className='productPageContainer-leftSide'>
                <img src={'http://localhost:5000/' + image} />
            </div>
            <div className='info'>
                <h1 className='title'>{title}</h1>
                { product?.memory ? 
                    <div className='memoryButtons'>
                        {JSON.parse(memory!).map((el:string) => <button key={el} onClick={() => setRAM(el)}>{el}</button>)}
                    </div>
                :
                    <></>
                }
                 <p className='description'>{description}</p>
                <div className='buyOptions'>
                   {/* {RAM ? 
                    <p className='price'>{RAM == '128GB' ? price : RAM == '256GB' ? Math.round(Number(price)+ Number(price)*0.1) : Math.round(Number(price)+ Number(price)*0.2)}<span>$</span></p>
                   :
                    <p className='price'>{price}<span>$</span></p> 
                   } */}
                   {
                    discount ? <div><span className='previous-price'>{price}</span><span className='current-price'>{discount}$</span></div> : <p className='price'>{price}<span>$</span></p>
                   }
                    <button className='cart-button' onClick={cartButtonHandler}>Add to cart</button>
                    <button className='credit-button'>buy in credit</button>
                    {user.role == 'ADMIN' ? <button onClick={() => setModalState(true)} className='discount-button'>ADMIN PANEL</button> : <></>}
                    <AdminProductModal 
                        visible={modalState}
                        title ='ADMIN PANEL'
                        body = {modalBody}
                        footer = {modalFooter}
                        Close ={Close}
                    />
                </div>
                <div className='delivery-info'>
                    <p>Delivery</p>
                    <ul>
                        <li>
                            <span>Pick up from our store</span><span>Free</span>
                        </li>
                        <li>
                            <span>Courier delivery</span><span>20$</span>
                        </li>
                        <li>
                            <span>Delivery to the post office</span><span>8-10$</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductPage