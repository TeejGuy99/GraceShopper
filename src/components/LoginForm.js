import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    return null;
  };

  return (
    <div>
      <div>Login</div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your email:
          <input type="text" required={true} />
        </label>
        <label>
          Enter your password:
          <input type="password" required={true} />
        </label>
        <input type="submit" />
        <Link to="/register">Need an account? Click here to register</Link>
      </form>
    </div>
  );
};

export default LoginForm;
