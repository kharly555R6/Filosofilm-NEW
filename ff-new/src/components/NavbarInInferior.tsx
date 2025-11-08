import React from "react";

interface NavbarInInferiorProps {
  onInformacionClick?: () => void;
  onActividadClick?: () => void;
  onResenasClick?: () => void;
  onLikesClick?: () => void;
  onConfigClick?: () => void;
}

const NavbarInInferior: React.FC<NavbarInInferiorProps> = ({
  onInformacionClick,
  onActividadClick,
  onResenasClick,
  onLikesClick,
  onConfigClick,
}) => {
  return (
    <nav className="navbarout-bg">
      <ul className="navbarout-list">
        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onInformacionClick}
          >
            <strong>Información</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onActividadClick}
          >
            <strong>Actividad</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onResenasClick}
          >
            <strong>Mis Reseñas</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onLikesClick}
          >
            <strong>Likes</strong>
          </a>
        </li>

        <li className="navbarout-item">
          <a
            className="navbarout-link"
            style={{ cursor: "pointer" }}
            onClick={onConfigClick}
          >
            <strong>Configuración</strong>
          </a>
        </li>


      </ul>
    </nav>
  );
};

export default NavbarInInferior;
