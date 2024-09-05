import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/">
            Home
          </a>
          <a className="nav-item nav-link active" href="/add-payment">
            Add Payment
          </a>
          <a className="nav-item nav-link" href="/sponsors">
            Sponsors
          </a>
          <a className="nav-item nav-link" href="/matches">
            Matches          
          </a>
          <a className="nav-item nav-link" href="/sponsored-matches">
            Sponsored Matches          
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
