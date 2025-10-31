import React from "react";
import '../styles/Pages/Administrador.css';
import logo from '../assets/img/logo.png';

const AdminPanel: React.FC = () => {
  return (
    <div className="admin-page-body">
      <div className="container">
        <div className="row text-center">
          <div className="col p-3">
            <div className="p-2">
              <img
                id="LogoFilosofilm"
                src={logo}
                alt="Logo Filosofilm"
                className="img-fluid logo-admin"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Panel principal */}
      <div id="Panel" className="container bg-warning py-4">
        <h1 className="text-center mb-4">Panel de Administración</h1>

        <div className="row justify-content-center">
          <div className="col-md-11">
            <div className="list-group">
              <div className="row g-3">
                <div className="col-6 col-md-2">
                  <a href="/CRUDUsuarios" className="admin-panel-btn">CRUD Usuarios</a>
                </div>
                <div className="col-6 col-md-2">
                  <a href="/CRUDActores" className="admin-panel-btn">CRUD Actores</a>
                </div>
                <div className="col-6 col-md-2">
                  <a href="/CRUDPaises" className="admin-panel-btn">CRUD Países</a>
                </div>
                <div className="col-6 col-md-2">
                  <a href="/CRUDDirectores" className="admin-panel-btn">CRUD Directores</a>
                </div>
                <div className="col-6 col-md-2">
                  <a href="/PropuestasDeCambio" className="admin-panel-btn">Propuestas de Cambio</a>
                </div>
                <div className="col-6 col-md-2">
                  <a href="/CRUDPeliculas" className="admin-panel-btn">CRUD Películas</a>
                </div>
              </div>

              <div className="col-12 mt-4">
                <a
                  href="/"
                  className="bg-dark list-group-item list-group-item-action mb-3 text-center text-light"
                >
                  INICIO
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminPanel;
