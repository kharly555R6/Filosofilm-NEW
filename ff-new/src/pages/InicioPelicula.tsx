import React from "react";

const PeliculaPantalla: React.FC = () => {
  return (
    <div>
      {/* NAVBAR */}
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

      {/* CONTENEDOR PRINCIPAL DE PELÍCULA */}
      <div className="PeliculaBG container mt-3">
        <div className="row">
          {/* Imagen + Botón Reseña */}
          <div className="col-lg-3 pt-3">
            <div className="d-flex align-items-center justify-content-center flex-column">
              <img
                src=""
                className="imgpelicula card-img-top border border-white"
                alt="Imagen de la película FNAF"
              />

              <div className="text-center mt-3 w-100">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#modalResena"
                  className="btn btn-primary BotonResena"
                  id="botonHacerResena"
                >
                  Hacer Reseña
                </button>
              </div>
            </div>
          </div>

          {/* Sinopsis y Datos */}
          <div className="col-lg-9 mt-4 mb-3 ContenedorSinopsis">
            <div className="row align-items-center">
              <div className="col-lg-6 text-center text-light">
                <h2 id="TituloPelicula"></h2>
              </div>

              <div
                className="col-lg-3 estrellas text-center"
                data-calificacion=""
              ></div>

              <div className="col-lg-3 text-center">
                <div className="row d-flex align-items-center text-center">
                  <div id="Favoritos" className="col-lg-6">
                    <img
                      className="Iconos2"
                      src="img/Favoritos.png"
                      alt="Ícono Favorita"
                    />
                    <div className="text-light mb-0 mt-2 h6">Favorita</div>
                  </div>
                  <div id="Visto" className="col-lg-6">
                    <img
                      className="Iconos2"
                      src="img/Visto.png"
                      alt="Ícono Vista"
                    />
                    <div className="text-light mb-0 mt-2 h6">Vista</div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-12 d-flex align-items-center">
                <div
                  className="text-light p-2 text-justify"
                  id="Sinopsis"
                ></div>
              </div>
            </div>
          </div>

          {/* Tabla de datos */}
          <div className="col-12">
            <div className="mt-3 text-center">
              <h2 className="text-center text-light">Datos Generales</h2>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row" className="text-light">
                        Presupuesto
                      </th>
                      <td className="text-light" id="Presupuesto"></td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-light">
                        Recaudación
                      </th>
                      <td className="text-light" id="Recaudacion"></td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-light">
                        Duración
                      </th>
                      <td className="text-light" id="Duracion"></td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-light">
                        Año de Estreno
                      </th>
                      <td className="text-light" id="AñoEstreno"></td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-light">
                        Género
                      </th>
                      <td className="text-light" id="Generos"></td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-light">
                        Clasificación
                      </th>
                      <td className="text-light" id="Clasificacion"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTORES */}
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row text-light py-3">
              <div className="col">
                <h3 className="text-center">ACTORES</h3>
              </div>
            </div>

            <div className="container">
              <div className="row ContenedorActores">
                {/* Tarjetas de actores */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DIRECTOR Y EQUIPO */}
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row text-light py-3">
              <div className="col">
                <h3 className="text-center">DIRECTOR Y OTRAS PERSONAS</h3>
              </div>
            </div>

            <div className="container">
              <div className="row ContenedorDirectores">
                {/* Tarjetas de directores */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* RESEÑAS DE USUARIOS */}
      <div>
        <div className="row text-light py-3">
          <div className="col">
            <h3 className="text-right">RESEÑAS DE USUARIOS NORMALES</h3>
          </div>
        </div>

        <div id="ContenedorReseñas">
          <div className="container Reseña">{/* Reseñas */}</div>
        </div>
      </div>

      {/* MODAL RESEÑA */}
      <div
        className="modal fade"
        id="modalResena"
        tabIndex={-1}
        aria-labelledby="modalResenaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalResenaLabel">
                Hacer Reseña
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="formResena">
                <div className="mb-3 contenedornickname"></div>
                <div className="mb-3">
                  <label htmlFor="calificacion" className="form-label">
                    Calificación
                  </label>
                  <select className="form-select" id="calificacion">
                    <option value="1">1 estrella</option>
                    <option value="2">2 estrellas</option>
                    <option value="3">3 estrellas</option>
                    <option value="4">4 estrellas</option>
                    <option value="5">5 estrellas</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="contenidoResena" className="form-label">
                    Contenido de la reseña
                  </label>
                  <textarea
                    className="form-control"
                    id="contenidoResena"
                    rows={4}
                    placeholder="Escribe tu reseña aquí"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                id="guardarResena"
                data-bs-dismiss="modal"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ERROR */}
      <div
        className="modal fade"
        id="errorModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Notificar Error
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="mensajeError" className="form-label">
                    Mensaje de Error
                  </label>
                  <textarea
                    className="form-control"
                    id="mensajeError"
                    rows={3}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" className="btn btn-primary" id="enviarError">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeliculaPantalla;
