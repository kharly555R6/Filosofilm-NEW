import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Components/Navbar.css";

interface NavbarInProps {
  onPerfilClick?: () => void;
  onInicioClick?: () => void;
  onPeliculasClick?: () => void;
  onLogoutClick?: () => void;
}

const NavbarIn: React.FC<NavbarInProps> = ({
  onPerfilClick,
  onInicioClick,
}) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      setNickname(user.nickname || "");
    } else {
      // Si no hay sesión, regresamos al login
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

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
              fontFamily: "Montserrat, Arial, sans-serif",
            }}
          >
            ¡Hola {nickname || "Usuario"}!
          </strong>
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
            onClick={onPerfilClick}
          >
            <strong>Mi perfil</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <strong>Cerrar sesión</strong>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarIn;
