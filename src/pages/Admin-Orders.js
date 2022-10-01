import React, { useState, useEffect } from "react";
import { AdminNav } from "../components";
import { getAllOrders, getUserInfo, getGuest } from "../api";
import { BsChatRight } from "react-icons/bs";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState("");
  const [guest, setGuest] = useState("");
  const handleRoutines = () => {
    getAllOrders().then((result) => {
      setOrders(result);
    });
  };

  useEffect(() => {
    handleRoutines();
  }, []);

  return (
    <div>
      <div className="dashboard-container">
        <AdminNav />
      </div>
      <div
        style={{
          display: "flex",
          width: "80vw",
          justifyContent: "space-between",
          margin: 'auto',
          flexWrap: 'wrap'
        }}
      >
        <h4 style={{ width: "10vw", textAlign: "center", minWidth: 'min-content'}}>ORDER ID</h4>
        <h4 style={{ width: "20vw", textAlign: "center", minWidth: "min-content" }}>CUSTOMER</h4>
        <h4 style={{ width: "30vw", textAlign: "center", minWidth: 'min-content' }}>ORDER</h4>
      </div>
      {orders
        .sort(function (a, b) {
          var keyA = a.id,
            keyB = b.id;
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        })
        .map((order) => {
          return (
            <div key={order.id}>
              <div
                className="orders"
                style={{
                  display: "flex",
                  width: "80vw",
                  justifyContent: "space-between",
                  margin: "auto",
                  flexWrap: 'wrap'
                }}
              >
                <p style={{ width: "10vw", textAlign: "center", minWidth: 'min-content' }}>{order.id}</p>
                <p style={{ width: "20vw", textAlign: "center", minWidth: 'min-content' }}>
                  {order.isUserId ? order.email : `Guest ${order.isGuestId}`}
                </p>
                <div
                  className="orderProductMap"
                  style={{ width: "30vw", textAlign: "center", display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}
                >
                  {order.products.map((product, index) => {
                    return (
                      <p style={{ display: "inline" }} key={index}>
                        {index < order.products.length - 1
                          ? `${product.name} (${product.productQty}), `
                          : `${product.name} (${product.productQty})`}
                      </p>
                    );
                  })}
                </div>
              </div>
              <hr style={{ borderTop: "1px solid black", width: '80vw', margin: '15px auto' }}></hr>
            </div>
          );
        })}
    </div>
  );
};

export default AdminOrders;
