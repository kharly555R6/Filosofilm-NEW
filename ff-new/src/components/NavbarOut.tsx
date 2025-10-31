import React from "react";
import '../styles/Components/NavbarOut.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbarout-bg">
      <ul className="navbarout-list">
        <li className="navbarout-item">
          <a className="navbarout-link" href="/">
            <strong>Login</strong>
          </a>
        </li>
        <li className="navbarout-item">
          <a className="navbarout-link" href="/registrarse">
            <strong>Registrarse</strong>
          </a>
        </li>
        <li className="navbarout-item">
          <a className="navbarout-link" href="/Nosotros">
            <strong>Nosotros</strong>
          </a>
        </li>
        <li className="navbarout-item">
          <a className="navbarout-link" href="/QueEsFF">
            <strong>Sobre Filosofilm</strong>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
