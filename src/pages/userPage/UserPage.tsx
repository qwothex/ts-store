import React, {FC, useState} from "react";
import EditProfileForm from "../../components/editProfile/EditProfileForm";
import { useAppSelector } from "../../hooks/useAppSelector";
import './userPage.css'

const UserPage:FC = () => {
    
    const user = useAppSelector(state => state.userReducer.user)

    const [changing, setChanging] = useState(false)

    return(
      <>
      <button onClick={() => setChanging(!changing)}>Edit profile</button>
        {changing 
          ? 
            <EditProfileForm /> 
          : 
        <div className="user_container">
            <img className="profile_picture" />
            <h3>{user.username}</h3>
            <br />
            <div>
              <p>{user.additional?.name}</p>
              <p>{user.additional?.bio}</p>
              <p>{user.additional?.location}</p>
              <p>{user.additional?.telegram}</p>
            </div>
        </div>}
      </>
    )
}

export default UserPage