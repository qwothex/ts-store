import React, {ChangeEvent, FC, useState} from 'react'
import { createProduct } from '../../API/productsAPI/productsAPI'
import './adminPage.css'
import NavBar from '../../components/navBar/NavBar'
import { brands } from '../../utils/types & brands/brands'
import { IconType } from 'react-icons'
import { types } from '../../utils/types & brands/types'


const Admin:FC = () => {
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [price, setPrice] = useState(0)
    const [memory, setMemory] = useState<{}[]>([])
    const [currentMemoryOption, setcurrentMemoryOption] = useState("")
    const [currentMemoryPrice, setcurrentMemoryPrice] = useState("")
    const [isMemoryOption, setIsMemoryOption] = useState<boolean>(false)

    const [display, setDisplay] = useState('')
    const [camera, setCamera] = useState('')
    const [os, setOs] = useState('')
    const [processor, setProcessor] = useState('')
    const [size, setSize] = useState('')
    const [materials, setMaterials] = useState('')
    const [manufacturer, setManufacturer] = useState('')

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('brand', brand)
        formData.append('type', type)
        formData.append('image', image!)
        formData.append('price', '' + price)
        formData.append('memory', JSON.stringify(memory))
        formData.append('detailedDescription', JSON.stringify(Object.defineProperties({}, {
          "display":{
            value: display,
            enumerable: true
          },
          "camera":{
            value: camera,
            enumerable: true
          },
          "os":{
            value: os,
            enumerable: true
          },
          "processor":{
            value: processor,
            enumerable: true
          },
          "size":{
            value: size,
            enumerable: true
          },
          "materials":{
            value: materials,
            enumerable: true
          },
          "manufacturer":{
            value: manufacturer,
            enumerable: true
          }
        })))
        createProduct(formData)
    }

    const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const brandHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      let value: string;
      switch(e.target.selectedIndex){
        case 1: 
          value = brands[0].name
          break;

        case 2:
          value = brands[1].name
          break;

        case 3: 
          value = brands[2].name
          break;

        case 4:
          value = brands[3].name
          break;
      }
        setBrand(value!)
    }

    const typeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      let value: string;
      switch(e.target.selectedIndex){
        case 1: 
          value = types[0].name
          break;

        case 2:
          value = types[1].name
          break;

        case 3: 
          value = types[2].name
          break;

        case 4:
          value = types[3].name
          break;
        }
      setType(value!)
    }

    const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value))
    }

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.currentTarget.files![0])
    }

    const memoryHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setMemory([...memory, Object.defineProperties({}, {
            "volume": {
                value: currentMemoryOption,
                enumerable: true
            },
            "price": {
                value: currentMemoryPrice,
                enumerable: true
            }
        })])
        setcurrentMemoryOption("")
        setcurrentMemoryPrice("")
    }

    return(
        <>
        <NavBar/>
            <div className='adminContainer'>
              <form onSubmit={formSubmitHandler} className='main-data'>
                <h1>Create new product</h1>
                <input className='formInput' type={'text'} placeholder='title' onChange={titleHandler} />
                <input className='formInput' type={'text'} placeholder='short descripion' onChange={descriptionHandler} />
                <div className='memory'>
                    <p>Add memory option</p>
                    <button type="button" onClick={() => setIsMemoryOption(!isMemoryOption)} className='addMemoryOption'>{isMemoryOption ? '-' : '+'}</button>
                </div>
                {isMemoryOption ? 
                <div className='memoryOption-container'> 
                    <div>
                        <input className='memoryInput' type={'text'} value={currentMemoryOption} placeholder='Memory option' onChange={(e) => setcurrentMemoryOption(e.target.value)}/>
                        <input className='memoryInput' type={'text'} value={currentMemoryPrice} placeholder='price' onChange={(e) => setcurrentMemoryPrice(e.target.value)}/>
                        <button className='memoryButton' onClick={memoryHandler} type='button'>save</button>
                    </div>
                </div>
                :
                <></>
                }
                {/* <input className='formInput' type={'text'} placeholder='brand (Apple, Samsung, etc.)' onChange={brandHandler} /> */}
                <select required onChange={brandHandler}>
                  <option value="">Select brand</option>
                  {brands.map((el: {name: string, logo: IconType}) => {
                    return <option value={el.name} key={el.name}>{el.name}</option>
                  })}
                </select>
                {/* <input className='formInput' type={'text'} placeholder='type (Phone, Laptop, etc.)' onChange={typeHandler} /> */}
                <select required onChange={typeHandler}>
                  <option value="">Select type</option>
                  {types.map((el: {name: string, logo: IconType}) => {
                    return <option value={el.name} key={el.name}>{el.name}</option>
                  })}
                </select>



                <input className='formInput' type={'number'} placeholder='price $' onChange={priceHandler} min={1}/>

                <input style={{display: 'none'}} type={'file'} id='file_input' placeholder='image' onChange={imageHandler} />
                <label htmlFor='file_input'>
                        <span>Add file<> </>{image?.name}</span>
                </label>

                <button className='submit-button' type='submit'>Create device</button>
              </form>
              <form className='detailed-description'>
                <h2>Detailed description</h2>
                  {type == 'Laptop' ? 
                  <>
                    <input className='formInput' type='text' placeholder='Display' value={display} onChange={(e) => setDisplay(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Camera' value={camera} onChange={(e) => setCamera(e.target.value)} />
                    <input className='formInput' type='text' placeholder='OS' value={os} onChange={(e) => setOs(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Processor' value={processor} onChange={(e) => setProcessor(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Size' value={size} onChange={(e) => setSize(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Materials' value={materials} onChange={(e) => setMaterials(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Country of origin of the product' value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                  </>
                    :
                  type == 'Phone' ?
                  <>
                    <input className='formInput' type='text' placeholder='Display' value={display} onChange={(e) => setDisplay(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Camera' value={camera} onChange={(e) => setCamera(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Size' value={size} onChange={(e) => setSize(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Materials' value={materials} onChange={(e) => setMaterials(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Country of origin of the product' value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                  </>
                    :
                  <>
                    <input className='formInput' type='text' placeholder='Display' value={display} onChange={(e) => setDisplay(e.target.value)} />
                    <input className='formInput' type='text' placeholder='OS' value={os} onChange={(e) => setOs(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Size' value={size} onChange={(e) => setSize(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Materials' value={materials} onChange={(e) => setMaterials(e.target.value)} />
                    <input className='formInput' type='text' placeholder='Country of origin of the product' value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                  </>
                }
              </form>
            </div>
        </>
    )
}

export default Admin