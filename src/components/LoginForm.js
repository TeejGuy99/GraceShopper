import React from "react";
import { Link } from "react-router-dom";
import "../style/Login-Register.scss";

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    return null;
  };

  return (
    <div className="form-container">
      <div className="title">LOGIN</div>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <label className="input-label">
          <input
            className="input-box"
            type="text"
            required={true}
            placeholder="Email"
          />
        </label>
        <label className="input-label">
          <input
            className="input-box"
            type="password"
            required={true}
            placeholder="Password"
          />
        </label>
        <input className="submit-btn" type="submit" value="SIGN IN" />
        <Link to="/register">New Customer? Create an Account</Link>
      </form>
    </div>
  );
};

export default LoginForm;
