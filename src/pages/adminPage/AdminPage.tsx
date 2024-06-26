import React, {FC, useEffect, useState} from 'react'
import { createProduct } from '../../API/productsAPI/productAPI'
import './adminPage.css'

const Admin:FC = () => {
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [price, setPrice] = useState(0)

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('brand', brand)
        formData.append('type', type)
        formData.append('image', image!)
        formData.append('price', `${price}`)
        createProduct(formData)
    }

    const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const brandHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(e.target.value)
    }

    const typeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value)
    }

    const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value))
    }

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.currentTarget.files![0])
    }

    return(
        <div className='adminContainer'>
            <form onSubmit={formSubmitHandler}>
                <input type={'text'} placeholder='title' onChange={titleHandler} />
                <input type={'text'} placeholder='descripion' onChange={descriptionHandler} />
                <input type={'text'} placeholder='brand' onChange={brandHandler} />
                <input type={'text'} placeholder='type' onChange={typeHandler} />
                <input type={'file'} placeholder='image' onChange={imageHandler} />
                <input type={'number'} placeholder='price' onChange={priceHandler} />
                <button type='submit'>Create device</button>
            </form>
        </div>
    )
}

export default Admin