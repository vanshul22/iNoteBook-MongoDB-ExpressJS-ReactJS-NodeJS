import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Using this hook to redirect to the notes page.
  let navigate = useNavigate();

  const handleLoginSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ "email": credentials.email, "password": credentials.password }) });

    const responseJSON = await response.json();
    if (responseJSON.success === true) {
      // Save the authToken and redirecting to notes page.
      localStorage.setItem("token", responseJSON.authToken);
      navigate("/");
    } else { alert("Invalid credentials."); }
  };

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className='my-5' onSubmit={handleLoginSubmit}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label"> Email address</label>
          <input onChange={onChange} value={credentials.email} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text"> We'll never share your email with anyone else. </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label"> Password </label>
          <input onChange={onChange} value={credentials.password} type="password" className="form-control" id="password" name="password" />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </>
  );
};

export default Login;
