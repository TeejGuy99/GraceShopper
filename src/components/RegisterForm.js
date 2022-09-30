import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, logIn } from "../api";

function RegisterForm(props) {
  const {
    setLoggedIn,
    setUserToken,
    setGuestId,
    setUserId
  } = props;

  const [userNameString, setUserNameString] = useState('')
  const [passwordString, setPasswordString] = useState('')

  let navigate = useNavigate();

  return (
    <div className="form-container">
      <div className="title2">CREATE ACCOUNT</div>
      <form className="form-wrapper" onSubmit={async (event) => {
        try {
          event.preventDefault()
           const response = await registerUser(userNameString, passwordString)
          if (response.error) {
              alert('Username already exists')
          } else {
              const token = response.token
              logIn(JSON.stringify(token), userNameString)
              setLoggedIn(true)
              setUserToken(token)
              setUserId(response.user.id)
              setGuestId(0)

              navigate("/profile");
              
          }
        }
        catch (error) {
            console.error(error)
        }
      }}>
        <label className="input-label">
          <input
            className="input-box"
            type="text"
            autoComplete="off"
            required={true}
            placeholder="Email"
            value={userNameString}
            onChange={(event) => {setUserNameString(event.target.value)}}
          />
        </label>
        <label className="input-label">
          <input
            className="input-box"
            type="password"
            autoComplete="off"
            required={true}
            placeholder="Password"
            value={passwordString}
            onChange={(event) => {setPasswordString(event.target.value)}}
          />
        </label>
        <input className="submit-btn" type="submit" value="CREATE" />
        <Link to="/login">Returning Customer? Sign in</Link>
      </form>
    </div>
  );
}

export default RegisterForm;
