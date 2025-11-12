import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavbarIn from "../components/NavbarIn";
import CarruselActores from "../components/CarruselActores";
import "../styles/Pages/InicioPelicula.css";

import visto0 from "../assets/img/visto0.png";
import visto1 from "../assets/img/visto1.png";
import Fav0 from "../assets/img/Like0.png";
import Fav1 from "../assets/img/Like1.png";

interface Genero {
  id_Genero: number;
  nombre: string;
}

interface Pelicula {
  id_Pelicula: number;
  titulo: string;
  imagen: string;
  sinopsis: string;
  fecha_Lanzamiento: string;
  genero: string[];
  duracion: string;
  presupuesto: number;
  recaudacion: number;
  clasificacion: string;
}

interface Resena {
  id_Reseña: number;
  contenido: string;
  calificacion: number;
  usuario: {
    id_Usuario: number;
    nickname: string;
  };
}

const PeliculaPantalla: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [favorito, setFavorito] = useState(false);
  const [visto, setVisto] = useState(false);
  const [resenas, setResenas] = useState<Resena[]>([]);

  useEffect(() => {
    if (!id) return;

    // 🔹 Cargar datos de la película
    fetch(`https://localhost:5001/api/peliculas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const generosNombres: string[] = (data.genero ?? []).map((g: Genero) => g.nombre);
        setPelicula({ ...data, genero: generosNombres });
      })
      .catch((err) => console.error("Error al cargar película:", err));

    // 🔹 Cargar reseñas automáticamente (como el carrusel)
    fetch(`https://localhost:5001/api/resenas/pelicula/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No hay reseñas disponibles");
        return res.json();
      })
      .then((data) => setResenas(data))
      .catch(() => setResenas([]));
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
                      <td>
                        {pelicula.duracion
                          ? `${pelicula.duracion} min`
                          : "No disponible"}
                      </td>
                    </tr>
                    <tr>
                      <th>Fecha de Estreno</th>
                      <td>
                        {pelicula.fecha_Lanzamiento
                          ? new Date(pelicula.fecha_Lanzamiento)
                              .toISOString()
                              .split("T")[0]
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

      <br />
      <hr />

      {/* 🔹 Carrusel de actores */}
      <div className="container text-center mt-5">
        <h2 className="text-light DG RepartoH2">REPARTO</h2>
        {id && (
          <CarruselActores
            endpoint={`https://localhost:5001/api/ActorPeliculas/pelicula/${id}`}
          />
        )}
      </div>

      <hr id="br_mb" />

      {/* 🔹 Bloque de reseñas (automático como carrusel) */}
      <div className="container text-light">
        <h2 className="text-center pt-3 DG">Reseñas de Usuarios</h2>
        <div id="ContenedorReseñas">
          {resenas.length === 0 && (
            <p className="text-center">No hay reseñas aún.</p>
          )}

          <div className="reviews-list">
            {resenas.map((resena, index) => (
              <div className="card review-card bg-dark text-light mb-4 pr-4 pl-4 d-flex" key={index}>
                <div className="review-body card_m">
                  <div className="review-user-name text-warning mb-1">{resena.usuario?.nickname || 'Usuario'}</div>
                  <div className="review-content text-justify mb-1">{resena.contenido}</div>
                  <div className="review-stars">{"⭐".repeat(resena.calificacion)}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PeliculaPantalla;
