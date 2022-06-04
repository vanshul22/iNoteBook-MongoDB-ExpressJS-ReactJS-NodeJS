import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  // To check the current location in url
  let currentLocation = useLocation();
  // To navigate the user to different urls.
  let navigate = useNavigate()

  // Creating Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"> iNoteBook </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${currentLocation.pathname === "/" ? "active" : ""}`} aria-current="page" to="/"> Home </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${currentLocation.pathname === "/about" ? "active" : ""}`} to="/about"> About </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? <form className="d-flex">
              <Link className="btn btn-outline-light mx-2" to="/login" href="/signin" role="button">Login</Link>
              <Link className="btn btn-outline-light mx-2" to="/signup" href="/signup" role="button">Sign Up</Link>
            </form> : <button onClick={handleLogout} className='btn btn-outline-light'>LogOut</button>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;