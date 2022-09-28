import React from "react";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { FaArchive } from "react-icons/fa";
import "../style/AdminPage.scss";
import { AdminNav } from "../components";

const AdminPage = () => {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.

  return (
    <div className="dashboard-container">
      <AdminNav />
      <div className="welcome">
        <p>WELCOME TO THE ADMIN DASHBOARD</p>
      </div>
    </div>
  );
};
export default AdminPage;
