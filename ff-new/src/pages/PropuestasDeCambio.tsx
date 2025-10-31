import React from "react";

const PropuestasCambio: React.FC = () => {
  return (
    <div className="container">
      <div className="row col-12 justify-content-center align-items-center">
        <div className="col-md-8">
          <div className="list-group text-center">
            <div className="list-group-item list-group-item-action mb-3">
              <h3>Propuestas de Cambio Pendientes</h3>
            </div>

            <div className="col-12">
              {/* Aquí se agregarán las tarjetas de propuestas de cambio dinámicamente */}
              <div id="ContenedorPropuestas" className="d-flex flex-column align-items-start">
                {/* Ejemplo estático — puedes reemplazar esto por datos dinámicos */}
                <div className="list-group-item list-group-item-action mb-2">
                  <h5>Título de ejemplo</h5>
                  <p>Descripción de la propuesta...</p>
                  <small className="text-muted">Fecha: 2025-10-31</small>
                </div>
              </div>
            </div>

            <div className="col-12">
              <a href="/" className="bg-dark list-group-item list-group-item-action mb-3 text-center text-light">
                Inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropuestasCambio;
