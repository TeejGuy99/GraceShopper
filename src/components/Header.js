import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsPersonFill, BsFillCartFill, BsBoxArrowLeft } from "react-icons/bs";
import { FaBars, FaWindowClose } from "react-icons/fa";
import styles from "../style/Header.scss";
import { getUserCart, logOut } from "../api"

function Header(props) {
  const { isUserAdmin, isLoggedIn, getUserCartItems, userId, guestId, getUserToken, setUserCartItems, setUserToken, setLoggedIn, setUserAdmin, setUserId } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggler = () => setMenuOpen((p) => !p);
  let navigate = useNavigate()

  const handleRoutines = () => {
    getUserCart({token: getUserToken, userID: userId, guestID: guestId }).then((results) => {
        setUserCartItems(results);
    });
  };
 

  useEffect(() => {
    handleRoutines();
  }, [guestId, userId]);

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
                    <button onClick={async (event) => {
                      event.preventDefault();
                      logOut();
                      setUserToken("");
                      setLoggedIn(false);
                      setUserAdmin(false);
                      setUserId(null);
                      navigate("/login")
                    }}>
                    <BsBoxArrowLeft size={25} />
                    </button>
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
                  {getUserCartItems.length>0 ? 
                  (<i style={{ 
                    fontSize: '10px',
                    color: 'white',
                    margin: '0px -5px',
                    padding: '0px 5px',
                    backgroundColor: 'red',
                    borderRadius: '50%' }}>
                      {getUserCartItems.length}
                  </i>)
                  : null
                }

                </NavLink>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <div className="button-container">
            <div className="user-icons">
              {isLoggedIn ? (
                <>
                  <button onClick={async (event) => {
                    event.preventDefault();
                    logOut();
                    setUserToken("");
                    setLoggedIn(false);
                    setUserAdmin(false);
                    setUserId(null);
                    navigate("/login")
                  }}>
                  <BsBoxArrowLeft size={25} />
                  </button>
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
                style={{textDecoration: 'none'}}
              >
                <BsFillCartFill size={25} />
                {getUserCartItems.length>0 ? 
                  (<i style={{ 
                    fontSize: '10px',
                    color: 'white',
                    margin: '0px -5px',
                    padding: '0px 5px',
                    backgroundColor: 'red',
                    borderRadius: '50%' }}>
                      {getUserCartItems.total}
                  </i>)
                  : null
                }
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
