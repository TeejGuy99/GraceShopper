import React, { useEffect, useState } from "react";
import { getUserInfo, getUserOrders } from "../api";
import "../style/UserProfile.scss";

function UserProfile(props) {
  const { userId } = props;

  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);

  const handleRoutines = () => {
    getUserInfo(userId).then((result) => {
      setUser(result);
    });
    getUserOrders(userId).then((result) => {
      setOrders(result);
    });
  };

  useEffect(() => {
    handleRoutines();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <h3 className="user-title">USER INFORMATION</h3>
        <div className="user-info">
          <div className="info">
            <p>{`User ID: ${user.userId}`}</p>
            <p>{`Email: ${user.email}`}</p>
          </div>
        </div>

        <h3 className="purchase-title">PURCHASE HISTORY</h3>
        <div className="purchase-history">
          <div className="item-history">
            {orders.map((order, index) => {
              return (
                <div key={index}>
                  <p>{`Order: ${order.id}`}</p>
                  {order.products.map((product, index) => {
                    return (
                      <div key={index}>
                        <img className="candle-img"
                          src={product.link}
                          alt={product.description}
                        />
                        <p>
                          {product.name}
                        </p>
                        <p>
                          {`Qty: ${product.productQty}`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
