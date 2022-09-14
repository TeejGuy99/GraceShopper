import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
  const { isUserAdmin } = props;
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";
  return (
    <>
      <div id="header-container">
        <h1>Kashyyyk Candles</h1>
        <ul>
          <li>
            {" "}
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/candles"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              CANDLES
            </NavLink>
          </li>
          <li>
            <NavLink to="/wax-melts">
              {({ isActive }) => (
                <span className={isActive ? activeClassName : undefined}>
                  WAX MELTS
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-products"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              ALL PRODUCTS
            </NavLink>
          </li>
          {isUserAdmin ? (
            <>
              {" "}
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  }
                >
                  Admin
                </NavLink>
              </li>
            </>
          ) : null}
        </ul>
        <ul id="header-right">
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              profile image
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              cart image
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
