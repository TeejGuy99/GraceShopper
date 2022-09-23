import React from "react";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { FaArchive } from "react-icons/fa";
import "../style/AdminNav.scss";

function AdminNav() {
  return (
    <div className="admin-container">
      <div className="admin-wrapper">
        <div className="directory">
          <Link to={`/admin/users`}>
            <HiUsers size={50} /> USERS
          </Link>
          <Link to={`/admin/orders`}>
            <BsFillCartFill size={50} /> ORDERS
          </Link>
          <Link to={`/admin/products`}>
            <FaArchive size={50} />
            PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
