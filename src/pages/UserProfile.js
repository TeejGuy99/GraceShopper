import React, { useState, useEffect } from "react";
import { getUserInfo, getUserOrders } from "../api";

const UserProfile = (props) => {
  const { userId } = props
  const [user, setUser] = useState('')
  const [orders, setOrders] = useState([])
  console.log(userId);

  const handleRoutines = () => {
    getUserInfo(userId).then((result) => {
      setUser(result);
    });

    getUserOrders(userId).then((result) => {
      setOrders(result)
    })
  };

  useEffect(() => {
    handleRoutines();
  }, []);
  console.log('User is:', user);
  console.log('User Orders are:', orders);

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
          .sort(function (a, b) {
            var keyA = a.id,
              keyB = b.id;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          })
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
