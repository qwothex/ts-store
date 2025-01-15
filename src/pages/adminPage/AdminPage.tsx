import React, {FC, useState} from 'react'
import { createProduct } from '../../API/productsAPI/productsAPI'
import './adminPage.css'
import NavBar from '../../components/navBar/NavBar'
import { brands } from '../../utils/types & brands/brands'
import { IconType } from 'react-icons'
import { types } from '../../utils/types & brands/types'
import { FORM_FIELDS } from '../../utils/formFields/formFields'


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

    const [productFormData, setProductFormData] = useState<FormField>({});

    type FormField = {
      [key: string]: string;
    };
    

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
            value: productFormData['display'],
            enumerable: true
          },
          "camera":{
            value: productFormData['camera'],
            enumerable: true
          },
          "os":{
            value: productFormData['os'],
            enumerable: true
          },
          "processor":{
            value: productFormData['processor'],
            enumerable: true
          },
          "size":{
            value: productFormData['size'],
            enumerable: true
          },
          "materials":{
            value: productFormData['materials'],
            enumerable: true
          },
          "manufacturer":{
            value: productFormData['manufacturer'],
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

    const handleInputChange = (name: string, value: string) => {
      setProductFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  

    const renderFields = (fields: typeof FORM_FIELDS.common) => {
      return fields.map(field => (
        <input
          key={field.name}
          className='formInput'
          type='text'
          placeholder={field.placeholder}
          value={productFormData[field.name] || ''}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
        />
      ));
  
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
                <select required onChange={brandHandler}>
                  <option value="">Select brand</option>
                  {brands.map((el: {name: string, logo: IconType}) => {
                    return <option value={el.name} key={el.name}>{el.name}</option>
                  })}
                </select>
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
                {renderFields(FORM_FIELDS.common)}
                {type && renderFields(FORM_FIELDS[type as keyof typeof FORM_FIELDS] || [])}
              </form>
            </div>
        </>
    )
}

export default Admin