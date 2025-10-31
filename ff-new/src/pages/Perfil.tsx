import React, { useEffect } from "react";

const Perfil: React.FC = () => {

  useEffect(() => {
    // Aquí puedes agregar la lógica de js/Perfil.js
    // Por ejemplo:
    // fetch('/api/favoritos').then(res => res.json()).then(data => setFavoritos(data));
  }, []);

  return (
    <div>
      {/* Navbar superior */}
      <div className="bg-secondary">
        <ul className="nav justify-content-end AQUI">
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

      {/* Navbar inferior */}
      <div className="bg-secondary">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item bgactivo">
            <a className="nav-link" href="/Perfil">
              Actividad
            </a>
          </li>
          <li className="nav-item">
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
      <div id="ContenedorPrincipal">
        <div className="container">
          <div className="row text-light py-3">
            <div className="col">
              <h3>Favoritos</h3>
            </div>
          </div>

          {/* Contenedor de favoritos */}
          <div id="ContenedorFavoritos" className="row">
            {/* Aquí puedes renderizar dinámicamente tus películas favoritas */}
            {/* Ejemplo:
              {favoritos.map(p => (
                <div key={p.id} className="col-md-3 mb-3">
                  <div className="card">
                    <img src={p.imagen} className="card-img-top" alt={p.titulo} />
                    <div className="card-body text-center">
                      <h5>{p.titulo}</h5>
                    </div>
                  </div>
                </div>
              ))}
            */}
          </div>
        </div>

        <div className="container">
          <div className="row text-light py-3">
            <div className="col">
              <h3>Vistas recientemente</h3>
            </div>
          </div>

          {/* Contenedor de vistas recientes */}
          <div id="ContenedorVistasRecientes" className="row">
            {/* Aquí puedes renderizar dinámicamente tus vistas recientes */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
