import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsPersonFill, BsFillCartFill } from "react-icons/bs";
import { FaBars, FaWindowClose } from "react-icons/fa";
import styles from "../style/Header.scss";

function Header(props) {
  const { isUserAdmin, isLoggedIn } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggler = () => setMenuOpen((p) => !p);

  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";
  return (
    <div id="header-container">
      <div className="header__content">
        <div className="logo-brand">
          <p>KASHYYYK CANDLES</p>
        </div>
        <div>
          <nav className={`${menuOpen ? `activated` : `close `}`}>
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
                  ADMIN
                </NavLink>
              </>
            ) : null}

            <div className="nav-button-container">
              <div className="user-icon">
                {isLoggedIn ? (
                  <>
                    <NavLink to="/profile">
                      <BsPersonFill size={25} />
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? activeClassName : undefined
                    }
                  >
                    <BsPersonFill size={25} />
                  </NavLink>
                )}
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  }
                >
                  <BsFillCartFill size={25} />
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <div className="button-container">
            <div className="user-icons">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                <BsPersonFill size={25} />
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                <BsFillCartFill size={25} />
              </NavLink>
            </div>
          </div>
          <button className="header-toggler" onClick={menuToggler}>
            {!menuOpen ? <FaBars /> : <FaWindowClose />}
          </button>
        </div>
      </div>
    </div>
  );
}

// const Button = () => {
//   return <button className="button">click me</button>;
// };

export default Header;
