import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavbarIn from "../components/NavbarIn";
import CarruselActores from "../components/CarruselActores";
import "../styles/Pages/InicioPelicula.css";

import actor from "../assets/img/Elizabeth_Lail.jpg";
import visto0 from "../assets/img/visto0.png";
import visto1 from "../assets/img/visto1.png";
import Fav0 from "../assets/img/Like0.png";
import Fav1 from "../assets/img/Like1.png";

interface Genero {
  id_Genero: number;
  nombre: string;
  descripcion: string;
}

interface Pelicula {
  id_Pelicula: number;
  titulo: string;
  imagen: string;
  sinopsis: string;
  fecha_Lanzamiento: string;
  genero: string[]; // Solo los nombres de los géneros
  duracion: string;
  presupuesto: number;
  recaudacion: number;
  clasificacion: string;
}

interface Resena {
  usuario: string;
  calificacion: number;
  contenido: string;
}

const PeliculaPantalla: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [favorito, setFavorito] = useState(false);
  const [visto, setVisto] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [calificacionModal, setCalificacionModal] = useState(5);
  const [contenidoModal, setContenidoModal] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`https://localhost:5001/api/peliculas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const generosNombres: string[] = (data.genero ?? []).map((g: Genero) => g.nombre);
        setPelicula({ ...data, genero: generosNombres });
      })
      .catch((err) => console.error("Error al cargar la película:", err));
  }, [id]);

  if (!pelicula) {
    return (
      <div className="text-center text-light mt-5">
        <h2>Cargando información de la película...</h2>
      </div>
    );
  }

  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/MiInformacion");
  const handleLogout = () => navigate("/");

  const toggleFavorito = () => setFavorito(!favorito);
  const toggleVisto = () => setVisto(!visto);

  const handleGuardarResena = () => {
    const nuevaResena: Resena = {
      usuario: "UsuarioRandom",
      calificacion: calificacionModal,
      contenido: contenidoModal,
    };
    setResenas([...resenas, nuevaResena]);
    setContenidoModal("");
    setCalificacionModal(5);
    setShowModal(false);

    // Aquí puedes hacer fetch POST a tu backend para guardar la reseña
  };

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
              <img
                src={pelicula.imagen}
                className="imgPeli my-1"
                alt={pelicula.titulo}
              />
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-warning BTNRES"
                  onClick={() => setShowModal(true)}
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
                <h2>{pelicula.titulo}</h2>
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
                  {pelicula.sinopsis || "Sin sinopsis disponible."}
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <hr />

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
                      <td>
                        {pelicula.presupuesto
                          ? `$${pelicula.presupuesto.toLocaleString()}`
                          : "No disponible"}
                      </td>
                    </tr>
                    <tr>
                      <th>Recaudación</th>
                      <td>
                        {pelicula.recaudacion
                          ? `$${pelicula.recaudacion.toLocaleString()}`
                          : "No disponible"}
                      </td>
                    </tr>
                    <tr>
                      <th>Duración</th>
                      <td>{pelicula.duracion ? `${pelicula.duracion} min` : "No disponible"}</td>
                    </tr>
                    <tr>
                      <th>Fecha de Estreno</th>
                      <td>
                        {pelicula.fecha_Lanzamiento
                          ? new Date(pelicula.fecha_Lanzamiento).toISOString().split("T")[0]
                          : "No disponible"}
                      </td>
                    </tr>

                    <tr>
                      <th>Género</th>
                      <td>
                        {pelicula.genero && pelicula.genero.length > 0
                          ? pelicula.genero.join(", ")
                          : "No disponible"}
                      </td>
                    </tr>

                    <tr>
                      <th>Clasificación</th>
                      <td>{pelicula.clasificacion || "No disponible"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actores */}
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

      <CarruselActores />

      <hr />

      {/* Reseñas */}
      <div className="container text-light">
        <h2 className="text-center py-3 DG">Reseñas de Usuarios</h2>
        <div id="ContenedorReseñas">
          {resenas.length === 0 && (
            <p className="text-center">No hay reseñas aún.</p>
          )}
          {resenas.map((resena, index) => (
            <div className="card bg-dark text-light mb-3 p-4 text-justify" key={index}>
              <h4>@{resena.usuario}</h4>
              <p>{resena.contenido}</p>
              <p>{"⭐".repeat(resena.calificacion)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Hacer Reseña</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Calificación</label>
                  <select
                    className="form-select"
                    value={calificacionModal}
                    onChange={(e) => setCalificacionModal(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} estrella{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Contenido de la reseña</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={contenidoModal}
                    onChange={(e) => setContenidoModal(e.target.value)}
                    placeholder="Escribe tu reseña aquí"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGuardarResena}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PeliculaPantalla;
