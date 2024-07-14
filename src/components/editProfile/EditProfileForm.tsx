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

    const additionalDataHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        additionalData(user.id!, name, bio, location, telegram)
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
                  <button type="submit">save changes</button>
            </form>
        </div>
    )
}

export default EditProfileForm