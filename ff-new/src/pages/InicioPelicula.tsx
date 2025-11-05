import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";

const PeliculaPantalla: React.FC = () => {
  const navigate = useNavigate();

  // 🔹 Funciones de navegación para el Navbar
  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/Perfil");
  const handleLogout = () => navigate("/");

  return (
    <div>
      {/* 🔹 Navbar funcional */}
      <NavbarIn
        onInicioClick={handleInicio}
        onPeliculasClick={handlePeliculas}
        onPerfilClick={handlePerfil}
        onLogoutClick={handleLogout}
      />

      {/* 🔹 CONTENEDOR PRINCIPAL DE PELÍCULA */}
      <div className="PeliculaBG container mt-3">
        <div className="row">
          {/* Imagen + Botón Reseña */}
          <div className="col-lg-3 pt-3">
            <div className="d-flex align-items-center justify-content-center flex-column">
              <img
                src="https://via.placeholder.com/300x450?text=Poster+Pelicula"
                className="imgpelicula card-img-top border border-white"
                alt="Imagen de la película"
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
                <h2 id="TituloPelicula">Título de Ejemplo</h2>
              </div>

              <div className="col-lg-3 estrellas text-center" data-calificacion="">
                ⭐⭐⭐⭐☆
              </div>

              <div className="col-lg-3 text-center">
                <div className="row d-flex align-items-center text-center">
                  <div id="Favoritos" className="col-lg-6">
                    <img
                      className="Iconos2"
                      src="/img/Favoritos.png"
                      alt="Ícono Favorita"
                    />
                    <div className="text-light mb-0 mt-2 h6">Favorita</div>
                  </div>
                  <div id="Visto" className="col-lg-6">
                    <img
                      className="Iconos2"
                      src="/img/Visto.png"
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
                >
                  Aquí iría la sinopsis de la película. Puedes rellenarla con datos desde una API o archivo JSON.
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de datos */}
          <div className="col-12">
            <div className="mt-3 text-center">
              <h2 className="text-center text-light">Datos Generales</h2>
              <div className="table-responsive">
                <table className="table table-bordered text-light">
                  <tbody>
                    <tr>
                      <th>Presupuesto</th>
                      <td>$30,000,000</td>
                    </tr>
                    <tr>
                      <th>Recaudación</th>
                      <td>$200,000,000</td>
                    </tr>
                    <tr>
                      <th>Duración</th>
                      <td>2h 15min</td>
                    </tr>
                    <tr>
                      <th>Año de Estreno</th>
                      <td>2023</td>
                    </tr>
                    <tr>
                      <th>Género</th>
                      <td>Terror, Suspenso</td>
                    </tr>
                    <tr>
                      <th>Clasificación</th>
                      <td>B15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 ACTORES */}
      <div className="container">
        <h3 className="text-center text-light py-3">ACTORES</h3>
        <div className="row ContenedorActores text-light">
          <div className="col-md-3 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Actor"
              className="rounded-circle mb-2"
            />
            <p>Josh Hutcherson</p>
          </div>
          <div className="col-md-3 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Actor"
              className="rounded-circle mb-2"
            />
            <p>Elizabeth Lail</p>
          </div>
        </div>
      </div>

      <hr />

      {/* 🔹 RESEÑAS */}
      <div className="container text-light">
        <h3 className="text-center py-3">Reseñas de Usuarios</h3>
        <div id="ContenedorReseñas">
          <div className="card bg-dark text-light mb-3 p-3">
            <h5>@Usuario123</h5>
            <p>Excelente película, muy fiel al juego original.</p>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>

      {/* 🔹 MODAL RESEÑA */}
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
                data-bs-dismiss="modal"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeliculaPantalla;
