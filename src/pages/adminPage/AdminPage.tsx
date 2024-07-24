import React, {FC, useEffect, useState} from 'react'
import { createProduct } from '../../API/productsAPI/productAPI'
import './adminPage.css'
import { useNavigate } from 'react-router-dom'

const Admin:FC = () => {

    const navigate = useNavigate()
    
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
                <h1>Create new product</h1>
                <input type={'text'} placeholder='title' onChange={titleHandler} />
                <input type={'text'} placeholder='descripion' onChange={descriptionHandler} />
                <input type={'text'} placeholder='brand' onChange={brandHandler} />
                <input type={'text'} placeholder='type' onChange={typeHandler} />
                <input type={'number'} placeholder='price' onChange={priceHandler} />

                <input style={{display: 'none'}} type={'file'} id='file_input' placeholder='image' onChange={imageHandler} />
                <label htmlFor='file_input'>
                        <span>Add file 500px2 {image?.name}</span>
                </label>

                <button type='submit'>Create device</button>
            </form>
        </div>
    )
}

export default Admin