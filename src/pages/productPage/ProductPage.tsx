import {FC, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDiscount, deleteProduct, getAllProducts, getOneProduct } from '../../API/productsAPI/productsAPI'
import { productProps } from '../../store/slices/productSlice'
import './productPage.css'
import { RotateLoader } from 'react-spinners'
import { addCartProduct, addLastView } from '../../API/usersAPI/usersApi'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useActions } from '../../hooks/useActions'
import ModalWindow from '../../components/modalWindow/ModalWindow'
import ErrorPage from '../errorPage/ErrorPage'
import PopUp from '../../components/pop-upWindow/PopUp'
import ChangeProductForm from '../../components/changeProductForm/ChangeProductForm'
import DevileryInfo from '../../components/devileryInfo/DeliveryInfo'
import NavLayout from '../../components/navLayout/NavLayout'
import SliderComponent from '../../components/sliderComponent/SliderComponent'
import USDPrice from '../../components/priceController/USDPrice'
import UAHPrice from '../../components/priceController/UAHPrice'
import { productItem } from '../../types/types'
import BankOption from '../../components/bankOption/BankOption'
import { AxiosError } from 'axios'
import isError from '../../utils/isError'

const ProductPage:FC = () => {

    const navigate = useNavigate()

    const {addProductToLocalCart, addLastViewProduct, addProductToLocalUserCart} = useActions()

    const [product, setProduct] = useState<productItem>()
    const [RAMprice, setRAMprice] = useState(0)
    const [RAMvolume, setRAMvolume] = useState('')
    const [loading, setLoading] = useState(true)
    const [adminModalState, setAdminModalState] = useState(false)
    const [creditModalState, setCreditModalState] = useState(false)
    const [changeState, setChangeState] = useState(false)
    const [popUpStatus, setPopUpStatus] = useState<{show: boolean, success?: boolean, text?: string}>({show: false, success: true, text: ''})
    const [similarOffers, setSimilarOffers] = useState<productItem[]>()
    const [errorMessage, setErrorMessage] = useState<string>('')

    const Close = (modal: 'admin' | 'credit') => {modal == 'admin' ? setAdminModalState(false) : setCreditModalState(false)}

    const {id} = useParams()

    const {user, isUserAuth} = useAppSelector(state => state.userReducer)
    const {cart} = useAppSelector(state => state.productReducer)
    const {currency} = useAppSelector(state => state.productReducer)

    const initialFetch = async() => {
        setLoading(true)
        const productData: productItem | AxiosError = await getOneProduct(Number(id))
        if(!isError(productData)){
            setProduct({...productData, detailedDescription: typeof productData.detailedDescription === 'string' ? JSON.parse(productData.detailedDescription) : null})
            getAllProducts(productData.type, productData.brand, 16, 1).then((data: productProps) => {
                setSimilarOffers(data.rows.filter(el => el.id !== +id!))
            })
            if(user.id){
                addLastView(user.id!, productData.id)
                addLastViewProduct(productData)
            }
        }else{
            setErrorMessage(productData.message)
            setLoading(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        initialFetch()
        setRAMprice(0) 
        setRAMvolume("")
    }, [id])

    if(loading){
        return <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><RotateLoader /></div>
    }

    if(!product){
        return <ErrorPage message={errorMessage} />
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
        addCartProduct(user.id!, product.id, RAMvolume, RAMprice || price)
        let isExist = false;
        if(cart) cart.forEach((el) => { if(el.id == product.id) isExist = true })
        if(!isExist) {
            addProductToLocalCart({...product, price: RAMprice || price, memory: RAMvolume || null, amount: 1})
            addProductToLocalUserCart({id: product.id, RAMprice: RAMprice || price, RAMvolume: RAMvolume || null, amount: 1})
            setPopUpStatus({show: true, success: true, text: 'Added to cart'})
        }
        else setPopUpStatus({show: true, success: false, text: 'Already in cart'})
        }
    }


    const discountClickHandler = () => {
       const price = +prompt('Enter discount as percent (1-99%)')!
       if(price > 0 && price < 100) {
            addDiscount(Number(id), price)
       }else{
            alert("Wrong input")
       }
       Close('admin')
    }

    const removeDiscountHandler = () => {
        addDiscount(Number(id), 0)
        Close('admin')
    }

    const deleteProductHandler = () => {
        deleteProduct(Number(id))
        navigate('/', {replace: false})
        Close('admin')
    }

    const adminModalBody = <>
        <button className='discount-button' onClick={discountClickHandler}>discount</button>
        { product?.discount ? <button className='delete-button' onClick={removeDiscountHandler}>remove discount</button> : <></>}
        <button className='delete-button' onClick={deleteProductHandler}>delete product</button>
        <button className='discount-button' onClick={() => setChangeState(!changeState)}>change product</button>
        {changeState ? <ChangeProductForm product={product} /> : <></>}
    </>

    const discountRAMprice = +((RAMprice - (RAMprice * discount/100)).toFixed())
    const discountPrice = +((price - (price * discount/100)).toFixed())

    const creditModalBody = <>

        <BankOption price={
            RAMprice ?
                discount ? discountRAMprice : RAMprice 
                : 
                discount ? discountPrice : price} 

        logoPath='1'
        title='Bank 1'
        onClick={cartButtonHandler}
        />

        <BankOption price={
            RAMprice ?
                discount ? discountRAMprice : RAMprice 
                : 
                discount ? discountPrice : price} 
        logoPath='2'
        title='Bank 2'
        onClick={cartButtonHandler}
        />

        <BankOption price={
            RAMprice ?
                discount ? discountRAMprice : RAMprice 
                : 
                discount ? discountPrice : price} 
        logoPath='3'
        title='Bank 3'
        onClick={cartButtonHandler}
        />
    </>

    return(
        <NavLayout>
          <div className='productPage-container'>
            <div className='mainContent'>
            {popUpStatus.show ? <PopUp text={popUpStatus.text!} isSucces={popUpStatus.success!} /> : <></>}
            <div className='productPage-container__leftSide'>
                <img src={'http://localhost:5000/' + image} />
            </div>
              <div className='info'>
                <h1 className='title'>{RAMvolume ? title.replace(/(128GB|256GB|512GB|1TB)/, RAMvolume) : title}</h1>
                { product?.memory ? 
                    <div className='memoryButtons'>
                        {JSON.parse(memory!).map(((el:{volume: string, price: string}) => 
                        <button onClick={() => {
                            setRAMprice(Number(el.price))
                            setRAMvolume(el.volume)
                        }}>
                            {el.volume}
                        </button>
                        ))}
                    </div>
                :
                    <></>
                }
                <p className='description'>{description}</p>
                <div className='buyOptions'>
                    {currency == "USD" ? <USDPrice price={RAMprice || price} discount={discount} /> : <UAHPrice price={RAMprice || price} discount={discount} />}
                    <div className='buyOptionsButtons'>
                        <button className='cart-button' onClick={cartButtonHandler}>Add to cart</button>
                        <button className='credit-button' onClick={() => setCreditModalState(true)}>buy in credit</button>
                    <ModalWindow 
                        visible={creditModalState}
                        title ='Credit'
                        body = {creditModalBody}
                        Close ={() => Close('credit')}
                        width={900}
                        height={'fit-content'}
                    />
                        {user.role == 'ADMIN' ? <button onClick={() => setAdminModalState(true)} className='discount-button'>ADMIN</button> : <></>}
                    </div>
                    <ModalWindow 
                        visible={adminModalState}
                        title ='ADMIN PANEL'
                        body = {adminModalBody}
                        Close ={() => Close('admin')}
                    />
                </div>
                <DevileryInfo />
              </div>
            </div>
                {product.detailedDescription ? 
                    <div className='detailedDescription'>
                        <h2>Characteristics</h2>
                        <ul className='detailedDescription__list'>
                            {detailedDescription!.display ? <li><span className='characteristic'><p>Display</p></span><span className='characteristic-value'>{detailedDescription!.display}</span></li> : <></>}
                            {detailedDescription!.camera ? <li><span className='characteristic'><p>Camera</p></span> <span className='characteristic-value'>{detailedDescription!.camera}</span></li> : <></>}
                            {detailedDescription!.os ? <li><span className='characteristic'><p>OS</p></span><span className='characteristic-value'>{detailedDescription!.os}</span></li> : <></>}
                            {detailedDescription!.processor ? <li><span className='characteristic'><p>Processor</p></span><span className='characteristic-value'>{detailedDescription!.processor}</span></li> : <></>}
                            {detailedDescription!.size ? <li><span className='characteristic'><p>Size</p></span><span className='characteristic-value'>{detailedDescription!.size}</span></li> : <></>}
                            {detailedDescription!.materials ? <li><span className='characteristic'><p>Materials</p></span><span className='characteristic-value'>{detailedDescription!.materials}</span></li> : <></>}
                            {detailedDescription!.manufacturer ? <li><span className='characteristic'><p>Manufacturer</p></span><span className='characteristic-value'>{detailedDescription!.manufacturer}</span></li> : <></>}
                        </ul>
                    </div>
                :
                    <></>
                }
            <div className='similar-offers'>
                {similarOffers?.length ? <SliderComponent title='You might like it' products={similarOffers} /> : <></>}
            </div>
          </div>
        </NavLayout>
    )
}

export default ProductPage