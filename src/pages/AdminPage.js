import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`/admin/users`}>Users</Link>
        </li>
        <li>
          <Link to={`/admin/orders`}>Orders</Link>
        </li>
        <li>
          <Link to={`/admin/products`}>Products</Link>
        </li>
      </ul>
      <span>
        <h3>Welcome to Admin Page, Scrubs</h3>
      </span>
    </div>
  );
};
export default AdminPage;
