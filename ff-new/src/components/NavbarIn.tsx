import React from "react";
import "../styles/Components/Navbar.css";
import { color } from "framer-motion";

interface NavbarInProps {
  onPerfilClick?: () => void;
  onInicioClick?: () => void;
  onPeliculasClick?: () => void;
  onLogoutClick?: () => void;
}

const NavbarIn: React.FC<NavbarInProps> = ({
  onPerfilClick,
  onInicioClick,
  onLogoutClick,
  onPeliculasClick,
}) => {
  return (
    <nav className="navbarout-bg">
        
      <ul className="navbarout-list">

        <li className="navbarout-item">
            <strong
            style={{
                color: "#FFD700",
                fontWeight: 600,
                letterSpacing: "0.8px",
                fontSize: "1.1rem",
                fontFamily: 'Montserrat, Arial, sans-serif'
            } }
            >!Hola @user!</strong>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onInicioClick}
          >
            <strong>Inicio</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onPeliculasClick}
          >
            <strong>Peliculas</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onPerfilClick}
          >
            <strong>Mi perfil</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onLogoutClick}
          >
            <strong>Cerrar sesión</strong>
          </a>
        </li>
        
      </ul>
    </nav>
  );
};

export default NavbarIn;
