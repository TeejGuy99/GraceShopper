import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Login-Register.scss";
import { logInUser, logIn } from "../api";

const LoginForm = (props) => {
  const {
    setLoggedIn,
    setUserToken,
    setUserAdmin,
    setUserId,
    setGuestId,
    isUserAdmin,
  } = props;
  const [userNameString, setUserNameString] = useState("");
  const [passwordString, setPasswordString] = useState("");

  let navigate = useNavigate();

  return (
    <div className="form-container">
      <div className="title">LOGIN</div>
      <form
        className="form-wrapper"
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const response = await logInUser(userNameString, passwordString);
            const token = response.token;

            if (token) {
              logIn(JSON.stringify(token), userNameString);
              setUserToken(token);
              setLoggedIn(true);
              setUserAdmin(response.user.isAdmin);
              setUserId(response.user.id);
              localStorage.setItem('userid', response.user.id)
              setGuestId(0);
      
                if (response.user.isAdmin || isUserAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
           

            } else {        
              alert("Username or Password is incorrect");
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <label className="input-label">
          <input
            className="input-box"
            type="text"
            required={true}
            placeholder="Email"
            value={userNameString}
            onChange={(event) => {
              setUserNameString(event.target.value);
            }}
          />
        </label>
        <label className="input-label">
          <input
            className="input-box"
            type="password"
            required={true}
            placeholder="Password"
            value={passwordString}
            onChange={(event) => {
              setPasswordString(event.target.value);
            }}
          />
        </label>
        <input className="submit-btn" type="submit" value="SIGN IN" />
        <Link to="/register">New Customer? Create an Account</Link>
      </form>
    </div>
  );
};

export default LoginForm;
