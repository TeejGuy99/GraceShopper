import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser, logIn } from "../api";

function RegisterForm(props) {
  const {
    setLoggedIn,
    setUserToken,
  } = props;

  const [userNameString, setUserNameString] = useState('')
  const [passwordString, setPasswordString] = useState('')

  return (
    <div className="form-container">
      <div className="title2">CREATE ACCOUNT</div>
      <form className="form-wrapper" onSubmit={async (event) => {
        try {
          event.preventDefault()
          const response = await registerUser(userNameString, passwordString)
          const token = response.token
          console.log(response, "response")
          if (token) {
            window.location='./'
          } else {
            alert('IDK something is wrong')
          }
        } catch (error) {
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
