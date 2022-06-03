import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = (props) => {

  // Using this hook to redirect to the notes page.
  let navigate = useNavigate();

  const handleSignUpSubmit = async (e) => {

    e.preventDefault();
    // Destructuring from credentials state.
    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });

    const responseJSON = await response.json();
    if (responseJSON.success === true) {
      // Save the authToken and redirecting to notes page.
      localStorage.setItem("token", responseJSON.authToken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else { props.showAlert("Unable to Create Account email already present in database...", "danger"); }
  };

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  return (
    <div className='container my-5'>
      <form onSubmit={handleSignUpSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label"> Name </label>
          <input type="text" className="form-control" id="name" name="name" placeholder='Enter your name here' onChange={onChange} required minLength={5} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label"> Email address </label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder='Enter your email here' onChange={onChange} required minLength={5} />
          <div id="emailHelp" className="form-text"> We'll never share your email with anyone else. </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label"> Password </label>
          <input type="password" className="form-control" id="password" name="password" placeholder='Enter password here' onChange={onChange} required minLength={5} />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"> Confirm Password </label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder='Confirm password here' onChange={onChange} required minLength={5} />
        </div>

        <button type="submit" className="btn btn-primary"> Sign Up </button>

      </form>

    </div>
  )
}

export default SignUp
