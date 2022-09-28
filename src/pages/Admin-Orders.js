import React, { useState, useEffect } from "react";
import { AdminNav } from "../components";
import { getAllOrders, getUserInfo, getGuest } from "../api";

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

  console.log(orders);
  return (
    <div
    // style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="dashboard-container">
        <AdminNav />
      </div>
      <div
        style={{
          display: "flex",
          width: "80vw",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ width: "10vw", textAlign: "center" }}>ORDER ID</h4>
        <h4 style={{ width: "20vw", textAlign: "center" }}>CUSTOMER</h4>
        <h4 style={{ width: "30vw", textAlign: "center" }}>ORDER</h4>
        <h4 style={{ width: "10vw", textAlign: "center" }}>DELIVERY DATE</h4>
        <h4 style={{ width: "15vw", textAlign: "center" }}>DELIVERY STATUS</h4>
        <h4 style={{ width: "10vw", textAlign: "center" }}>PAYMENT TYPE</h4>
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
                  margin: "20px",
                }}
              >
                <p style={{ width: "10vw", textAlign: "center" }}>{order.id}</p>
                <p style={{ width: "20vw", textAlign: "center" }}>
                  {order.isUserId ? order.email : `Guest ${order.isGuestId}`}
                </p>
                <div
                  className="orderProductMap"
                  style={{ width: "30vw", textAlign: "center" }}
                >
                  {order.products.map((product) => {
                    return (
                      <p style={{ display: "inline" }} key={product.id}>
                        {product.id < order.products.length + 1
                          ? `${product.name} (${product.productQty}),`
                          : `${product.name} (${product.productQty})`}
                      </p>
                    );
                  })}
                </div>
                <p style={{ width: "10vw", textAlign: "center" }}>
                  Placeholder
                </p>
                <p style={{ width: "15vw", textAlign: "center" }}>
                  Placeholder
                </p>
                <p style={{ width: "10vw", textAlign: "center" }}>
                  Placeholder
                </p>
              </div>
              <hr style={{ borderTop: "1px solid black" }}></hr>
            </div>
          );
        })}
    </div>
  );
};

export default AdminOrders;
