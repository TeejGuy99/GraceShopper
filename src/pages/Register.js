import React from "react";
import { RegisterForm } from "../components";

function Register(props) {
<<<<<<< Updated upstream
  const {
    setLoggedIn,
    setUserToken
  } = props;
=======
  const { setLoggedIn, setUserToken } = props; 
>>>>>>> Stashed changes
  return (
    <>
      <div>Register</div>
      <RegisterForm 
        setLoggedIn={setLoggedIn}
        setUserToken={setUserToken}
      />
    </>
  );
}

export default Register;
