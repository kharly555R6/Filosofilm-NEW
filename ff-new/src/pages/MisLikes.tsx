import React, { useEffect } from "react";

const MisLikes: React.FC = () => {

  useEffect(() => {
    // Aquí puedes cargar tu script MisLikes.js si lo necesitas portar
    // o hacer fetch de los datos que llenarían el contenedor
    // Ejemplo:
    // fetch('/api/likes').then(...)
  }, []);

  return (
    <div>
      {/* Barra superior */}
      <div className="bg-secondary">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link" href="/Inicio">
              <strong>Inicio</strong>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/Perfil" id="nombreUsuario">
              <strong>@Usuario</strong>
            </a>
          </li>

          <li className="nav-item">
            <a id="cerrarSesionLink" className="nav-link" href="#">
              <strong>Cerrar Sesión</strong>
            </a>
          </li>
        </ul>
      </div>

      {/* Submenú de perfil */}
      <div className="bg-secondary">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <a className="nav-link" href="/Perfil">
              Actividad
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/MisResenas">
              Mis Reseñas
            </a>
          </li>
          <li className="nav-item bgactivo">
            <a className="nav-link" href="/MisLikes">
              Likes
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/MiInformacion">
              Información
            </a>
          </li>
        </ul>
      </div>

      {/* Contenedor principal */}
      <div id="ContenedorPrincipal">
        <div className="container">
          <div className="row text-light py-3">
            <div className="col">
              <h3 className="reseñas">Likes dados por @Usuario</h3>
            </div>
          </div>

          <div className="row" id="ContenedorReseñas">
            {/* Aquí irán los elementos dinámicos (tarjetas de likes, etc.) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisLikes;
