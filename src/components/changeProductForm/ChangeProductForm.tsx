import React, {FC, useState} from 'react'
import './changeProductForm.css'
import { productItem } from '../../store/slices/productSlice'
import { changeProduct } from '../../API/productsAPI/productAPI'

interface changeProductFormProps {
    product: productItem
}

const ChangeProductForm:FC<changeProductFormProps> = ({product}) => {

    const [title, setTitle] = useState(product.title)
    const [descripion, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)

    const submitHandler = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', descripion)
        formData.append('price', `${price}`)
        changeProduct(product.id, formData)
    }

    return(
        <form className='changeProduct-form' onSubmit={submitHandler}>
            <input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type='text' placeholder='description' value={descripion} onChange={(e) => setDescription(e.target.value)}/>
            <input type='number' placeholder='price' value={price} onChange={(e) => setPrice(+e.target.value)}/>
            <button type='submit'>Save changes</button>
        </form>
    )
}

export default ChangeProductForm