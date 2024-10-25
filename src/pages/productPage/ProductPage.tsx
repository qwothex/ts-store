import {FC, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDiscount, deleteProduct, getAllProducts, getOneProduct } from '../../API/productsAPI/productsAPI'
import { DetailedDescription, productItem, productProps } from '../../store/slices/productSlice'
import './productPage.css'
import { RotateLoader } from 'react-spinners'
import { addCartProduct, addLastView } from '../../API/usersAPI/usersApi'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useActions } from '../../hooks/useActions'
import ModalWindow from '../../components/adminProductModal/ModalWindow'
import ErrorPage from '../errorPage/ErrorPage'
import PopUp from '../../components/pop-upWindow/PopUp'
import ChangeProductForm from '../../components/changeProductForm/ChangeProductForm'
import DevileryInfo from '../../components/devileryInfo/DeliveryInfo'
import NavLayout from '../../components/navLayout/NavLayout'
import SliderComponent from '../../components/sliderComponent/SliderComponent'
import USDPrice from '../../components/priceController/USDPrice'
import UAHPrice from '../../components/priceController/UAHPrice'

const ProductPage:FC = () => {

    const navigate = useNavigate()

    const {addProductToCart, addLastViewProduct, addProductToLocalCart} = useActions()

    const [product, setProduct] = useState<productItem>()
    const [RAMprice, setRAMprice] = useState(0)
    const [loading, setLoading] = useState(true)
    const [modalState, setModalState] = useState(false)
    const [changeState, setChangeState] = useState(false)
    const [popUpStatus, setPopUpStatus] = useState<{show: boolean, success?: boolean, text?: string}>({show: false, success: true, text: ''})
    const [similarOffers, setSimilarOffers] = useState<productProps>()

    const Close = () => setModalState(false)

    const {id} = useParams()

    const {user, isUserAuth} = useAppSelector(state => state.userReducer)
    const {cart} = useAppSelector(state => state.productReducer)
    const {currency} = useAppSelector(state => state.productReducer)

    const initialFetch = async() => {
        const productData: productItem = await getOneProduct(Number(id))
        if(productData){
            setProduct({...productData, detailedDescription: typeof productData.detailedDescription === 'string' ? JSON.parse(productData.detailedDescription) : null})
            getAllProducts(productData.type, productData.brand, 20, 1).then((data) => setSimilarOffers(data))
        }
        setLoading(false)
    }

    useEffect(() => {
        initialFetch()
    }, [id])

    if(product && user.id) {
        addLastView(user.id!, product.id)
        // addLastViewProduct(product)
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

    const {description, price, title, image, memory, discount, detailedDescription} = product!

    const cartButtonHandler = () => {
        if(!isUserAuth) {
            setPopUpStatus({show: true, success: false, text: 'Login or create account first'})
        }
        else{
        addCartProduct(user.id!, product.id)
        let isExist = false;
        if(cart) cart.forEach((el) => { if(el.id == product.id) isExist = true })
        if(!isExist) {
            addProductToCart({...product, amount: 1}) 
            addProductToLocalCart(product.id)
            setPopUpStatus({show: true, success: true, text: 'Added to cart'})
        }
        else setPopUpStatus({show: true, success: false, text: 'Already in cart'})
        }
    }


    const discountClickHandler = () => {
       const price = +prompt('enter new price')!
       addDiscount(Number(id), price)
       Close()
    }

    const removeDiscountHandler = () => {
        addDiscount(Number(id), 0)
        Close()
    }

    const deleteProductHandler = () => {
        deleteProduct(Number(id))
        navigate('/', {replace: false})
        Close()
    }

    const modalBody = <div>
        <button className='discount-button' onClick={discountClickHandler}>discount</button>
        { product?.discount ? <button className='delete-button' onClick={removeDiscountHandler}>remove discount</button> : <></>}
        <button className='delete-button' onClick={deleteProductHandler}>delete product</button>
        <button className='discount-button' onClick={() => setChangeState(!changeState)}>change product</button>
        {changeState ? <ChangeProductForm product={product} /> : <></>}
    </div>

    return(
        <NavLayout>
          <div className='productPage-container'>
            <div className='mainContent'>
            {popUpStatus.show ? <PopUp text={popUpStatus.text!} isSucces={popUpStatus.success!} /> : <></>}
            <div className='productPage-container__leftSide'>
                <img src={'http://localhost:5000/' + image} />
            </div>
              <div className='info'>
                <h1 className='title'>{title}</h1>
                { product?.memory ? 
                    <div className='memoryButtons'>
                        {JSON.parse(memory!).map(((el:{volume: string, price: string}) => <button onClick={() => setRAMprice(Number(el.price))}>{el.volume}</button>))}
                    </div>
                :
                    <></>
                }
                <p className='description'>{description}</p>
                <div className='buyOptions'>
                    {currency == "USD" ? <USDPrice price={RAMprice || price} discount={discount} /> : <UAHPrice price={RAMprice || price} discount={discount} />}
                    <div className='buyOptionsButtons'>
                        <button className='cart-button' onClick={cartButtonHandler}>Add to cart</button>
                        <button className='credit-button'>buy in credit</button>
                        {user.role == 'ADMIN' ? <button onClick={() => setModalState(true)} className='discount-button'>ADMIN PANEL</button> : <></>}
                    </div>
                    <ModalWindow 
                        visible={modalState}
                        title ='ADMIN PANEL'
                        body = {modalBody}
                        Close ={Close}
                    />
                </div>
                <DevileryInfo />
              </div>
            </div>
                {product.detailedDescription ? 
                    <div className='detailedDescription'>
                        <h2>Characteristics</h2>
                        <ul className='detailedDescription__list'>
                            {detailedDescription!.display ? <li><span className='characteristic'><p>Display</p></span> {detailedDescription!.display}</li> : <></>}
                            {detailedDescription!.camera ? <li><span className='characteristic'><p>Camera</p></span>  {detailedDescription!.camera}</li> : <></>}
                            {detailedDescription!.os ? <li><span className='characteristic'><p>OS</p></span>  {detailedDescription!.os}</li> : <></>}
                            {detailedDescription!.processor ? <li><span className='characteristic'><p>Processor</p></span>  {detailedDescription!.processor}</li> : <></>}
                            {detailedDescription!.size ? <li><span className='characteristic'><p>Size</p></span>  {detailedDescription!.size}</li> : <></>}
                            {detailedDescription!.materials ? <li><span className='characteristic'><p>Materials</p></span>  {detailedDescription!.materials}</li> : <></>}
                            {detailedDescription!.manufacturer ? <li><span className='characteristic'><p>Manufacturer</p></span>  {detailedDescription!.manufacturer}</li> : <></>}
                        </ul>
                    </div>
                :
                    <></>
                }
            <div className='similar-offers'>
                {similarOffers && <SliderComponent title='You might like it' products={similarOffers.rows} slidesToShow={8} slidesToScroll={4} />}
            </div>
          </div>
        </NavLayout>
    )
}

export default ProductPage