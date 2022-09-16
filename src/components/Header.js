import React from "react";
import { NavLink } from "react-router-dom";
import { BsPersonFill, BsFillCartFill } from "react-icons/bs";
import "../style/Header.scss";

function Header(props) {
  const { isUserAdmin } = props;
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";
  return (
    <>
      <div id="header-container">
        <div className="logo-brand">
          <p>Kashyyyk Candles</p>
        </div>
        <nav>
          <div className="nav-links">
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              HOME
            </NavLink>
            <NavLink
              to="/candles"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              CANDLES
            </NavLink>
            <NavLink to="/wax-melts">
              {({ isActive }) => (
                <span className={isActive ? activeClassName : undefined}>
                  WAX MELTS
                </span>
              )}
            </NavLink>
            <NavLink
              to="/all-products"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              ALL PRODUCTS
            </NavLink>
            {isUserAdmin ? (
              <>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  }
                >
                  Admin
                </NavLink>
              </>
            ) : null}
          </div>
          <div className="icon-links">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <BsPersonFill />
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <BsFillCartFill />
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
