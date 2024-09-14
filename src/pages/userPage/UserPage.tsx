import React, {FC, useState} from "react";
import EditProfileForm from "../../components/editProfile/EditProfileForm";
import { useAppSelector } from "../../hooks/useAppSelector";
import './userPage.css'
import NavLayout from "../../components/navLayout/NavLayout";

const UserPage:FC = () => {
    
    const user = useAppSelector(state => state.userReducer.user)

    const [changing, setChanging] = useState(false)

    return(
      <NavLayout>
        <div className="user_container">
          <a className="changeLink" onClick={() => setChanging(!changing)}>{changing ? 'Back to profile' : 'Edit profile'}</a>
        {changing 
          ? 
            <EditProfileForm /> 
          : 
            <div>
              <img className="profile_picture" style={{backgroundImage: `url(${'http://localhost:5000/' + user.additional?.image})`}} />
            <h3>{user.username}</h3>
            <br />
            <div>
              <p>{user.additional?.name}</p>
              <p>{user.additional?.bio}</p>
              <p>{user.additional?.location}</p>
              <p>{user.additional?.telegram}</p>
            </div>
            </div>
        }   
        </div>
      </NavLayout>
    )
}

export default UserPage