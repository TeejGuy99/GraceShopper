import React, { useEffect, useState } from "react";
import { getUserInfo, 
  getUserOrders 
} from "../api";
import "../style/UserProfile.scss";

function UserProfile(props) {
  const {
    userId
  } = props;

  const [user, setUser] = useState('');
  const [orders, setOrders] = useState([]);

  const handleRoutines = () => {
    getUserInfo(userId).then((result) => {
      setUser(result)
    })
    getUserOrders(userId).then((result) => {
      setOrders(result)
    })
  }

  useEffect(() => {
    handleRoutines()
  }, [])

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <p className="user-title">USER INFORMATION</p>
        <div className="user-info">
          <div className="info">
            <ul>
              <li>Email</li>
              <li>UserID?</li>
            </ul>
          </div>
        </div>
        <p className="purchase-title">PURCHASE HISTORY</p>
        <div className="purchase-history">
          <div className="item-history">
          <ul>
              <li>Items Purchased</li>
              <li>Purchase Date</li>
              <li>Order status</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
