import React from "react";
import "../styles/Components/NavbarOut.css";

interface NavbarOutProps {
  onRegisterClick?: () => void;
  onLoginClick?: () => void;
  onNosotrosClick?: () => void;
  onQueEsFFClick?: () => void;
}

const NavbarOut: React.FC<NavbarOutProps> = ({
  onRegisterClick,
  onLoginClick,
  onNosotrosClick,
  onQueEsFFClick,
}) => {
  return (
    <nav className="navbarout-bg">
      <ul className="navbarout-list">
        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onLoginClick}
          >
            <strong>Login</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onRegisterClick}
          >
            <strong>Registrarse</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onNosotrosClick}
          >
            <strong>Nosotros</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onQueEsFFClick}
          >
            <strong>Sobre Filosofilm</strong>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarOut;
