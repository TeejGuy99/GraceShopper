import React from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    return null;
  };

  return (
    <div className="form-container">
      <div className="title2">CREATE ACCOUNT</div>
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
        <input className="submit-btn" type="submit" value="CREATE" />
        <Link to="/login">Returning Customer? Sign in</Link>
      </form>
    </div>
  );
}

export default RegisterForm;
