import React, { useEffect } from "react";

const ModeradorPanel: React.FC = () => {

  useEffect(() => {
    // Aquí puedes incluir la lógica que antes estaba en js/Moderador.js
    // Ejemplo:
    // fetch('/api/resenas-pendientes')
    //   .then(res => res.json())
    //   .then(data => setResenas(data));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="list-group">
            <div className="text-center list-group-item list-group-item-action mb-3">
              <h3>Reseñas Pendientes</h3>
            </div>

            <div
              id="ContenedorReseñas"
              className="col-12 d-flex flex-column align-items-start"
            >
              {/* Aquí puedes renderizar reseñas dinámicamente */}
              {/* {resenas.map(resena => (
                  <div key={resena.id} className="card mb-2 p-3">
                    <h5>{resena.titulo}</h5>
                    <p>{resena.contenido}</p>
                    <div>
                      <button className="btn btn-success btn-sm mr-2">Aprobar</button>
                      <button className="btn btn-danger btn-sm">Rechazar</button>
                    </div>
                  </div>
              ))} */}
            </div>

            <div className="col-12">
              <a
                href="/"
                className="bg-dark list-group-item list-group-item-action mb-3 text-center text-light"
              >
                Inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeradorPanel;
