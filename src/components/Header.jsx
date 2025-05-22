import React from 'react';
import '../styles/header.css'; // CSS global

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbarCustom">
      <div className="container-fluid">
        <a className="navbar-brand navbarBrand" href="/">
          apishowcats
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link navbarLink" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link navbarLink" href="/gatos">Gatos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link navbarLink" href="/sobre">Sobre</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
