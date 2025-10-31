import React, { useEffect } from "react";

const MisResenas: React.FC = () => {

  useEffect(() => {
    // Aquí puedes agregar la lógica que antes estaba en MisResenas.js
    // Ejemplo: cargar reseñas del usuario con fetch o axios
    // fetch('/api/mis-resenas').then(res => res.json()).then(...)
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

      {/* Submenú */}
      <div className="bg-secondary">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item textbg">
            <a className="nav-link" href="/Perfil">
              Actividad
            </a>
          </li>
          <li className="nav-item bgactivo">
            <a className="nav-link" href="/MisResenas">
              Mis Reseñas
            </a>
          </li>
          <li className="nav-item">
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

      {/* Contenido principal */}
      <div id="ContenedorPrincipal" className="container">
        <div className="row text-light py-3">
          <div className="col">
            <h3 className="reseñas">Todas las Reseñas de @Usuario</h3>
          </div>
        </div>

        {/* Contenedor dinámico de reseñas */}
        <div className="row" id="ContenedorReseñas">
          {/* Aquí puedes renderizar reseñas con .map() */}
        </div>
      </div>
    </div>
  );
};

export default MisResenas;
