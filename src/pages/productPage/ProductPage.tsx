import {FC, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDiscount, deleteProduct, getAllProducts, getOneProduct } from '../../API/productsAPI/productsAPI'
import { productItem, productProps } from '../../store/slices/productSlice'
import './productPage.css'
import { RotateLoader } from 'react-spinners'
import { addCartProduct, addLastView } from '../../API/usersAPI/usersApi'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useActions } from '../../hooks/useActions'
import AdminProductModal from '../../components/adminProductModal/AdminProductModal'
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

    const {addProductToCart, addLastViewProduct} = useActions()

    const [product, setProduct] = useState<productItem>()
    const [RAMvolume, setRAMvolume] = useState('')
    const [RAMprice, setRAMprice] = useState(0)
    const [loading, setLoading] = useState(true)
    const [modalState, setModalState] = useState(false)
    const [modalChangeState, setModalChangeState] = useState(false)
    const [popUpStatus, setPopUpStatus] = useState<{show: boolean, success?: boolean, text?: string}>({show: false, success: true, text: ''})
    const [similarOffers, setSimilarOffers] = useState<productProps>()

    const Close = () => setModalState(false)

    const {id} = useParams()

    const {user} = useAppSelector(state => state.userReducer)
    const {cart} = useAppSelector(state => state.productReducer)
    const {currency} = useAppSelector(state => state.productReducer)

    const initialFetch = async() => {
        const productData: productItem = await getOneProduct(Number(id))
        if(productData){
            setProduct(productData)
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

    let parsedDetailedDescription: {display: string | null, camera: string | null, os: string | null, processor: string | null, size: string | null, materials: string | null, manufacturer: string | null}; 
    if(detailedDescription) parsedDetailedDescription = JSON.parse(detailedDescription)

    const cartButtonHandler = () => {
        !user.id ? 
            setPopUpStatus({show: true, success: false, text: "Login or create the account first"})
        :
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
        <button className='discount-button' onClick={() => setModalChangeState(!modalChangeState)}>change product</button>
        {modalChangeState ? <ChangeProductForm product={product} /> : <></>}
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
                    <AdminProductModal 
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
                            {parsedDetailedDescription!.display ? <li><span className='characteristic'><p>Display</p></span> {parsedDetailedDescription!.display}</li> : <></>}
                            {parsedDetailedDescription!.camera ? <li><span className='characteristic'><p>Camera</p></span>  {parsedDetailedDescription!.camera}</li> : <></>}
                            {parsedDetailedDescription!.os ? <li><span className='characteristic'><p>OS</p></span>  {parsedDetailedDescription!.os}</li> : <></>}
                            {parsedDetailedDescription!.processor ? <li><span className='characteristic'><p>Processor</p></span>  {parsedDetailedDescription!.processor}</li> : <></>}
                            {parsedDetailedDescription!.size ? <li><span className='characteristic'><p>Size</p></span>  {parsedDetailedDescription!.size}</li> : <></>}
                            {parsedDetailedDescription!.materials ? <li><span className='characteristic'><p>Materials</p></span>  {parsedDetailedDescription!.materials}</li> : <></>}
                            {parsedDetailedDescription!.manufacturer ? <li><span className='characteristic'><p>Manufacturer</p></span>  {parsedDetailedDescription!.manufacturer}</li> : <></>}
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