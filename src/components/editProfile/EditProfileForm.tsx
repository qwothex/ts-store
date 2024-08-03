import React, {FC, useState} from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { additionalData } from "../../API/usersAPI/usersApi";
import "./editProfileForm.css"

const EditProfileForm:FC = () => {

    const user = useAppSelector(state => state.userReducer.user)

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [telegram, setTelegram] = useState('')
    const [image, setImage] = useState<File | null>(null)

    const additionalDataHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('id', `${user.id!}`)
        formData.append('name', name || user.additional?.name!)
        formData.append('bio', bio || user.additional?.bio!)
        formData.append('location', location || user.additional?.location!)
        formData.append('telegram', telegram || user.additional?.telegram!)
        formData.append('image', image || user.additional?.image!)
        additionalData(formData)
        setName('')
        setBio('')
        setLocation('')
        setTelegram('')
        setImage(null)
    }

    const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const changeBioHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(e.target.value)
    }

    const changeLocationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value)
    }

    const changeTelegramHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelegram(e.target.value)
    }

    const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.currentTarget.files![0])
    }

    return(
        <div>
            <form className="editProfileForm" onSubmit={additionalDataHandler}>
                <span>Name</span>
                <input placeholder='Josh Doe' value={name} onChange={changeNameHandler} />
                <span>Bio</span>
                <textarea placeholder='About you' value={bio} onChange={changeBioHandler} />
                <span>Location</span>
                <input placeholder='Ukraine' value={location} onChange={changeLocationHandler} />
                <span>Telegram</span>
                <input placeholder='@qwothex' value={telegram} onChange={changeTelegramHandler} />
                <input style={{display: 'none'}} type={'file'} id='file_input' placeholder='image' onChange={changeImageHandler} />
                <label htmlFor='file_input'>
                        <span>Add file<> </>{image?.name}</span>
                </label>
                  <button type="submit">save changes</button>
            </form>
        </div>
    )
}

export default EditProfileForm