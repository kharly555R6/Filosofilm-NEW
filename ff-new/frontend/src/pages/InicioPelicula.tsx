import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";
import CarruselActores from "../components/CarruselActores";
import "../styles/Pages/InicioPelicula.css";
import "../styles/Pages/MisResenas.css";
import API_URL from "../api/config";
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
  const [like, setLike] = useState(false);
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [nuevoRating, setNuevoRating] = useState<number>(0);
  const [publicando, setPublicando] = useState(false);
  const [cargandoFavorito, setCargandoFavorito] = useState(false);
  const [cargandoVisto, setCargandoVisto] = useState(false);
  const [cargandoLike, setCargandoLike] = useState(false);

  const promedioCalificacion = useMemo(() => {
    if (!Array.isArray(resenas) || resenas.length === 0) return 0;
    const validas = resenas.filter(r => r && typeof r.calificacion === 'number');
    if (validas.length === 0) return 0;
    const suma = validas.reduce((acc, r) => acc + r.calificacion, 0);
    return suma / validas.length;
  }, [resenas]);

  const promedioRedondeado = Math.round(promedioCalificacion);

  useEffect(() => {
    if (!id) return;

    fetch(`https://localhost:5001/api/peliculas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const generosNombres: string[] = (data.genero ?? []).map(
          (g: Genero) => g.nombre
        );
        setPelicula({ ...data, genero: generosNombres });
      })
      .catch((err) => console.error("Error al cargar película:", err));

    fetch(`https://localhost:5001/api/resenas/pelicula/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No hay reseñas disponibles");
        return res.json();
      })
      .then((data) => setResenas(data))
      .catch(() => setResenas([]));

    cargarEstadoFavorito();
    cargarEstadoVisto();
    cargarEstadoLike();
  }, [id]);

  const cargarEstadoFavorito = async () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado || !id) return;

    try {
      const parsed = JSON.parse(usuarioGuardado);
      const token = parsed?.token;
      
      if (!token) return;

      const res = await fetch(`${API_URL}/favoritos/pelicula/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setFavorito(data.esFavorito);
      }
    } catch (error) {
      console.error("Error al cargar estado de favorito:", error);
    }
  };

  const cargarEstadoLike = async () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado || !id) return;

    try {
      const parsed = JSON.parse(usuarioGuardado);
      const token = parsed?.token;

      if (!token) return;

      const res = await fetch(`${API_URL}/Likes/resena/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setLike(data.dioLike);
      }
    } catch (error) {
      console.error("Error al cargar estado de like:", error);
    }
  };

  const cargarEstadoVisto = async () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado || !id) return;

    try {
      const parsed = JSON.parse(usuarioGuardado);
      const token = parsed?.token;
      
      if (!token) return;

      const res = await fetch(`${API_URL}/vistos/pelicula/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setVisto(data.fueVista);
      }
    } catch (error) {
      console.error("Error al cargar estado de visto:", error);
    }
  };

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

  const toggleFavorito = async () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado || !id) {
      alert("Debes iniciar sesión para gestionar favoritos.");
      navigate("/");
      return;
    }

    setCargandoFavorito(true);

    try {
      const parsed = JSON.parse(usuarioGuardado);
      const token = parsed?.token;

      if (!token) {
        alert("Token de autenticación no encontrado.");
        return;
      }

      if (favorito) {
        const res = await fetch(`${API_URL}/favoritos/pelicula/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setFavorito(false);
          const data = await res.json();
        } else {
          throw new Error("Error al eliminar de favoritos");
        }
      } else {
        const res = await fetch(`${API_URL}/favoritos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ID_Pelicula: Number(id),
          }),
        });

        if (res.ok) {
          setFavorito(true);
          const data = await res.json();
        } else {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.mensaje || "Error al agregar a favoritos");
        }
      }
    } catch (error: any) {
      console.error("Error en favoritos:", error);
      alert(error.message || "Error al gestionar favoritos");
    } finally {
      setCargandoFavorito(false);
    }
  };

  const toggleVisto = async () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado || !id) {
      alert("Debes iniciar sesión para gestionar películas vistas.");
      navigate("/");
      return;
    }

    setCargandoVisto(true);

    try {
      const parsed = JSON.parse(usuarioGuardado);
      const token = parsed?.token;

      if (!token) {
        alert("Token de autenticación no encontrado.");
        return;
      }

      if (visto) {
        const res = await fetch(`${API_URL}/vistos/pelicula/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setVisto(false);
          const data = await res.json();
        } else {
          throw new Error("Error al eliminar de vistas");
        }
      } else {
        const res = await fetch(`${API_URL}/vistos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ID_Pelicula: Number(id),
          }),
        });

        if (res.ok) {
          setVisto(true);
          const data = await res.json();
        } else {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.mensaje || "Error al marcar como vista");
        }
      }
    } catch (error: any) {
      console.error("Error en vistos:", error);
      alert(error.message || "Error al gestionar películas vistas");
    } finally {
      setCargandoVisto(false);
    }
  };

  const toggleLike = async () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado || !id) {
      alert("Debes iniciar sesión para gestionar likes.");
      navigate("/");
      return;
    }

    setCargandoLike(true);

    try {
      const parsed = JSON.parse(usuarioGuardado);
      const token = parsed?.token;

      if (!token) {
        alert("Token de autenticación no encontrado.");
        return;
      }

      if (like) {
        const res = await fetch(`${API_URL}/Likes/resena/${id}`, {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setLike(false);
          const data = await res.json();
        } else {
          throw new Error("Error al eliminar el like");
        }

      } else {
        const res = await fetch(`${API_URL}/Likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ID_Resena: Number(id),
          }),
        });

        if (res.ok) {
          setLike(true);
          const data = await res.json();
        } else {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.mensaje || "Error al agregar el like");
        }
      }
    } catch (error: any) {
      console.error("Error en likes:", error);
      alert(error.message || "Error al gestionar likes");
    } finally {
      setCargandoLike(false);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setNuevoContenido("");
    setNuevoRating(0);
  };

  const handleStarClick = (value: number) => setNuevoRating(value);

  const handlePublicar = async () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      alert("Debes iniciar sesión para publicar una reseña.");
      navigate("/");
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(usuarioGuardado);
    } catch (error) {
      alert("Error en los datos de sesión. Inicia sesión nuevamente.");
      navigate("/");
      return;
    }

    const token = parsed?.token;

    if (!token) {
      alert("Token de autenticación no encontrado. Inicia sesión nuevamente.");
      navigate("/");
      return;
    }

    if (!nuevoContenido.trim()) {
      alert("La reseña no puede estar vacía.");
      return;
    }

    if (nuevoContenido.trim().length < 10) {
      alert("La reseña debe tener al menos 10 caracteres.");
      return;
    }

    if (nuevoRating <= 0 || nuevoRating > 5) {
      alert("Selecciona una calificación válida entre 1 y 5 estrellas.");
      return;
    }

    setPublicando(true);

    try {
      const res = await fetch(`${API_URL}/resenas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Contenido: nuevoContenido.trim(),
          Calificacion: nuevoRating,
          ID_Pelicula: Number(id),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.mensaje || `Error ${res.status}`);
      }

      const response = await res.json();
      setResenas((prev) => [response.resena, ...prev]);
      alert(response.mensaje || "¡Reseña publicada exitosamente!");
      closeModal();
      
    } catch (error: any) {
      console.error("Error al publicar reseña:", error);
      
      if(error.message.includes("Ya has publicado")) {
        alert(error.message);
        fetch(`https://localhost:5001/api/resenas/pelicula/${id}`)
          .then((res) => {
            if (!res.ok) throw new Error("No hay reseñas disponibles");
            return res.json();
          })
          .then((data) => setResenas(data))
          .catch(() => setResenas([]));
      } else {
        alert(error.message || "No se pudo publicar la reseña. Intenta más tarde.");
      }
    } finally {
      setPublicando(false);
    }
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
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-warning BTNRES"
                onClick={openModal}
              >
                Hacer Reseña
              </button>
            </div>
          </div>

          <div className="col-1"></div>

          <div className="col-5 ContenedorSinopsis">
            <div className="row align-items-center">
              <div className="col-12 text-center">
                <h2>{pelicula.titulo}</h2>
              </div>

              <div
                className="col-lg-12 estrellas text-center"
                data-calificacion={promedioRedondeado}
              >
                <div className="avg-stars" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < promedioRedondeado ? "star on" : "star"}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {resenas.length > 0 && (
                  <div className="text-muted conteoRes">
                    {promedioCalificacion.toFixed(1)} / 5 ({resenas.length}{" "}
                    reseña{resenas.length > 1 ? "s" : ""})
                  </div>
                )}
              </div>

              <div className="col-lg-12 text-center IconosDiv">
                <div className="row d-flex align-items-center text-center">
                  <div
                    className="col-lg-6"
                    onClick={toggleFavorito}
                    style={{ cursor: cargandoFavorito ? "not-allowed" : "pointer" }}
                  >
                    <img
                      className="Iconos"
                      src={favorito ? Fav1 : Fav0}
                      alt="Ícono Favorita"
                    />
                  </div>

                  <div
                    id="Visto"
                    className="col-lg-6"
                    onClick={toggleVisto}
                    style={{ cursor: cargandoVisto ? "not-allowed" : "pointer" }}
                  >
                    <img
                      className="Iconos"
                      src={visto ? visto1 : visto0}
                      alt="Ícono Vista"
                    />
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
              <h2 className="text-center text-light DG DGM">
                Datos Generales
              </h2>
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

      <div className="container text-center mt-5">
        <h2 className="text-light DG RepartoH2">REPARTO</h2>
        {id && (
          <CarruselActores
            endpoint={`https://localhost:5001/api/ActorPeliculas/pelicula/${id}`}
          />
        )}
      </div>

      <hr id="br_mb" />

      <div className="container text-light">
        <h2 className="text-center pt-3 DG">Reseñas de Usuarios</h2>

        <div id="ContenedorReseñas">
          {resenas.length === 0 && (
            <p className="text-center">No hay reseñas aún.</p>
          )}

          <div className="reviews-list">
            {resenas.filter(r => r && r.usuario && typeof r.calificacion === 'number').map((resena, index) => (
              <div className="mb-4" key={index}>
                <article className="resena-card">
                  <header className="resena-header">
                    <h5 className="resena-username">
                      {resena.usuario.nickname || "Usuario"}
                    </h5>
                  </header>

                  <br />

                  <section className="resena-body text-justify p-3">
                    <p className="resena-text">{resena.contenido}</p>

                    <div
                      className="resena-rating"
                      aria-label={`Calificación: ${resena.calificacion} de 5`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < resena.calificacion ? "star on" : "star"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </section>

                  <button
                    className="resena-like"
                    type="button"
                    aria-label="Me gusta"
                    title="Me gusta"
                    onClick={toggleLike}
                    style={{ cursor: cargandoLike ? "not-allowed" : "pointer" }}
                  >
                    <span aria-hidden>♥</span>
                  </button>

                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title text-warning">Nueva Reseña</div>
              <button
                onClick={closeModal}
                aria-label="Cerrar"
                className="btn-cancel"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <label htmlFor="contenido">Contenido</label>
              <textarea
                id="contenido"
                value={nuevoContenido}
                onChange={(e) => setNuevoContenido(e.target.value)}
              />

              <div className="modal-stars">
                <label>Calificación</label>
                <div>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const val = i + 1;
                    return (
                      <span
                        key={i}
                        className={val <= nuevoRating ? "star on" : "star"}
                        onClick={() => handleStarClick(val)}
                        style={{ marginRight: 8 }}
                      >
                        ★
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-publish"
                  onClick={handlePublicar}
                  disabled={!nuevoContenido.trim() || nuevoRating === 0 || publicando}
                >
                  {publicando ? "Publicando..." : "Publicar"}
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