import React from "react";
import logo from "../assets/img/logo.png";
import "../styles/Pages/Administrador.css";

const PropuestasCambio: React.FC = () => {
  return (
    <div>
      <div className="container adminPageBody">
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

      <br />
      <hr />
      <br />

      <div className="container bg-warning py-4 p-4 rounded">
        <div className="col-12">

          <h1 className="text-center mb-4">
              Propuestas de Cambio Pendientes
          </h1>

          <div className="text-center">

            <div className="col-12">
              <div id="ContenedorPropuestas" className="d-flex flex-column align-items-start">
                <div className="list-group-item list-group-item-action mb-2">
                  <h5>Título de ejemplo</h5>
                  <p>Descripción de la propuesta...</p>
                  <small className="text-muted">Fecha: 2025-10-31</small>
                </div>
              </div>
            </div>

            <div className="col-12">
              <a
                href="Administrador"
                className="bg-dark list-group-item list-group-item-action mb-3 text-center text-light"
              >
                REGRESAR
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropuestasCambio;
