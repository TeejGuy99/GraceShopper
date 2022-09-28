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
  
console.log(user);
console.log(orders);

  return (
    <div className="userProfile" style={{display: 'flex', flexDirection: 'column', position: 'fixed', top: '20%', right: '0%'}}>
    <div className="userProfileInfo" >
      <h1>USER INFORMATION</h1>
      <p>{`User ID: ${user.userId}`}</p>
      <p>{`Email: ${user.email}`}</p>
    </div>
    <div className="userPurchaseHistory" >
      <h1>PURCHASE HISTORY</h1>
      <div>{orders
        .map((order, index) => {
          return (
              <div className="orders" key={index} style={{display: 'flex', width: '80vw', justifyContent: 'space-between', alignItems: 'center', margin: '10px'}}>
                <p>{`Order: ${order.id}`}</p>
                {order.products.map((product, index) => {
                  return (<div key={index} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <img src={product.link} alt={product.description} style={{width: '100px'}}/>
                    <p style={{display: 'inline'}}>{product.name}</p>
                    <p style={{display: 'inline'}}>{`Qty: ${product.productQty}`}</p>
                  </div>)
                })}
              </div>
          );
        })
      }</div>
    </div>
  </div>
  );
}

export default UserProfile;
