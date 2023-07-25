import React from 'react'
import { Link } from "react-router-dom";
export default function Navabar() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-info">
      <Link className="navbar-brand" to="/">
        <img
          src="https://www.cdc.gov/dotw/covid-19/images/main_928px.jpg?_=48481"
          width="70"
          height="40"
          alt=""
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="/navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link active" to="/">
              Home{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              IndiaStatewiseAnalysis
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/statewisedeaths">
              IndiaStatewiseDeaths
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vaccination">
              VaccinationData
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/awareness">
              Awareness
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
