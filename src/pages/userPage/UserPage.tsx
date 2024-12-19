import React, {FC, useState} from "react";
import EditProfileForm from "../../components/editProfileForm/EditProfileForm";
import { useAppSelector } from "../../hooks/useAppSelector";
import './userPage.css'
import NavLayout from "../../components/navLayout/NavLayout";

const UserPage:FC = () => {
    
  const {user} = useAppSelector(state => state.userReducer)

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
            <div className="profile-container__leftSide">
              <img className="profile_picture" style={{backgroundImage: `url(${'http://localhost:5000/' + user.additional?.image})`}} />
                <div className="additional-data">
                  <h3>{user.username}</h3>
                  <ul>
                    <li>name: {user.additional?.name || <span>no data</span>}</li>
                    <li>About: {user.additional?.bio || <span>no data</span>}</li>
                    <li>location: {user.additional?.location || <span>no data</span>}</li>
                    <li>telegram: {user.additional?.telegram || <span>no data</span>}</li>
                  </ul>
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