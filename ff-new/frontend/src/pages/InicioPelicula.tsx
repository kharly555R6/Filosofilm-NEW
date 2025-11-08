import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";
import "../styles/Pages/InicioPelicula.css";
import sample from "../assets/sample.svg";
import actor from "../assets/img/Elizabeth_Lail.jpg";
import visto0 from "../assets/img/visto0.png";
import visto1 from "../assets/img/visto1.png";
import Fav0 from "../assets/img/Like0.png";
import Fav1 from "../assets/img/Like1.png";

const PeliculaPantalla: React.FC = () => {
  const navigate = useNavigate();

  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/MiInformacion");
  const handleLogout = () => navigate("/");

  const [favorito, setFavorito] = useState(false);
  const [visto, setVisto] = useState(false);

  const toggleFavorito = () => setFavorito(!favorito);
  const toggleVisto = () => setVisto(!visto);

  return (
    <div>
      <NavbarIn
        onInicioClick={handleInicio}
        onPeliculasClick={handlePeliculas}
        onPerfilClick={handlePerfil}
        onLogoutClick={handleLogout}
      />

      <div className="PeliculaBG container mt-4">
        <div className="row justify-content-center">

          <div className="col-5 my-5">
            <div className="d-flex align-items-center justify-content-center flex-column">
              <img src={sample} className="imgPeli my-1" alt="Imagen de la película" />
              <div className="text-center mt-3">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#modalResena"
                  className="btn btn-warning BTNRES"
                >
                  Hacer Reseña
                </button>
              </div>
            </div>
          </div>

          <div className="col-1"></div>

          <div className="col-5 ContenedorSinopsis">
            <div className="row align-items-center">
              <div className="col-12 text-center">
                <h2>Título de Ejemplo</h2>
              </div>

              <div className="col-lg-12 estrellas text-center" data-calificacion="">
                ☆☆☆☆☆
              </div>

              <div className="col-lg-12 text-center IconosDiv">
                <div className="row d-flex align-items-center text-center">
                  <div
                    className="col-lg-6"
                    onClick={toggleFavorito}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="Iconos"
                      src={favorito ? Fav1 : Fav0}
                      alt="Ícono Favorita"
                    />
                    <div>Favorita</div>
                  </div>

                  <div
                    id="Visto"
                    className="col-lg-6"
                    onClick={toggleVisto}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="Iconos"
                      src={visto ? visto1 : visto0}
                      alt="Ícono Vista"
                    />
                    <div>Vista</div>
                  </div>
                </div>
              </div>

            </div>

            <hr />

            <div className="row">
              <div className="col-12 d-flex align-items-center">
                <div className="p-2 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto ex consequuntur voluptatum soluta ullam dolorum,
                  recusandae consectetur suscipit dolorem tempore laudantium
                  culpa sequi sunt eligendi! Modi numquam hic iure unde, eos
                  dicta accusantium, doloremque non enim in nesciunt beatae
                  veniam quibusdam corporis quaerat laboriosam pariatur,
                  est aliquid qui possimus culpa sit. Ullam odio iste tempore
                  possimus. Dicta, a! Rerum, assumenda.
                </div>
              </div>
            </div>
          </div>
        </div>

        <br /><hr />

        <div className="row">
          <div className="col-1"></div>

          <div className="col-10 tablaDatos">
            <div className="mt-3 text-center">
              <h2 className="text-center text-light DG DGM">Datos Generales</h2>

              <div className="my-3"></div>
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

      <div className="container text-center">
        <h2 className="text-light py-3 DG">ACTORES</h2>
        <div className="row ContenedorActores text-light">
          {[1, 2, 3].map((i) => (
            <div className="col-md-4 text-center" key={i}>
              <img src={actor} alt="Actor" className="rounded-circle mb-4 actorImage" />
              <h4>@actor</h4>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="container text-light">
        <h2 className="text-center py-3 DG">Reseñas de Usuarios</h2>
        <div id="ContenedorReseñas">
          <div className="card bg-dark text-light mb-3 p-4 text-justify">
            <h4>@UsuarioRandom</h4>
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Cum ex labore ab minima est accusamus error, animi tenetur 
              soluta aspernatur officia quisquam. Magni consectetur iusto 
              facere, temporibus quod eum quisquam nobis sapiente voluptatibus 
              tempora accusantium praesentium qui itaque voluptates, provident 
              ipsam quos consequatur illo amet!</p>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>

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
