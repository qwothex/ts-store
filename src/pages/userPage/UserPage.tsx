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
      <div className="userPage-container">
        <a className="changeLink" onClick={() => setChanging(!changing)}>{changing ? 'Back to profile' : 'Edit profile'}</a>
      {changing 
        ? 
          <EditProfileForm /> 
        : 
          <div className="profile-container">
            <div>
              <img className="profile_picture" style={{backgroundImage: `url(${'http://localhost:5000/' + user.additional?.image})`}} />
              <h3>{user.username}</h3>
              <div className="additional-data">
                <p>name: {user.additional?.name}</p>
                <p>About: {user.additional?.bio}</p>
                <p>location: {user.additional?.location}</p>
                <p>telegram: {user.additional?.telegram}</p>
              </div>
            </div>
            <div className="profile-container__rightSide">
              <div className="profile-container__about">
                <p>About</p>
                <div className="product-list">No data found</div>
              </div>
              <div className="profile-container__products">
                <h2>Products</h2>
                <div className="product-list">No data found</div>
              </div>
            </div>
          </div>
      }   
      </div>
    </NavLayout>
  )
}


export default UserPage