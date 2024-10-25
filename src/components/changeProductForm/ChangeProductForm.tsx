import React, {FC, useState} from 'react'
import './changeProductForm.css'
import { productItem } from '../../store/slices/productSlice'
import { changeProduct } from '../../API/productsAPI/productsAPI'

interface changeProductFormProps {
    product: productItem
}

const ChangeProductForm:FC<changeProductFormProps> = ({product}) => {

    const [title, setTitle] = useState(product.title)
    const [descripion, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    
    const [display, setDisplay] = useState(product.detailedDescription?.display)
    const [camera, setCamera] = useState(product.detailedDescription?.camera)
    const [os, setOs] = useState(product.detailedDescription?.os)
    const [processor, setProcessor] = useState(product.detailedDescription?.processor)
    const [size, setSize] = useState(product.detailedDescription?.size)
    const [materials, setMaterials] = useState(product.detailedDescription?.materials)
    const [manufacturer, setManufacturer] = useState(product.detailedDescription?.manufacturer)


    const submitHandler = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', descripion)
        formData.append('price', `${price}`)
        formData.append('detailedDescription', JSON.stringify({display, camera, os, processor, size,materials, manufacturer}))
        changeProduct(product.id, formData)
    }

    return(
        <form className='changeProduct-form' onSubmit={submitHandler}>
            <input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type='text' placeholder='description' value={descripion} onChange={(e) => setDescription(e.target.value)}/>
            <input type='number' placeholder='price' value={price} onChange={(e) => setPrice(+e.target.value)}/>

            <div className='change-detailedDescription'>
                <input type='text' placeholder='Display' value={display} onChange={(e) => setDisplay(e.target.value)}/>
                <input type='text' placeholder='Camera' value={camera} onChange={(e) => setCamera(e.target.value)}/>
                <input type='text' placeholder='Os' value={os} onChange={(e) => setOs(e.target.value)}/>
                <input type='text' placeholder='Processor' value={processor} onChange={(e) => setProcessor(e.target.value)}/>
                <input type='text' placeholder='Size' value={size} onChange={(e) => setSize(e.target.value)}/>
                <input type='text' placeholder='Materials' value={materials} onChange={(e) => setMaterials(e.target.value)}/>
                <input type='text' placeholder='Manufacturer' value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}/>
            </div>

            <button type='submit'>Save changes</button>
        </form>
    )
}

export default ChangeProductForm