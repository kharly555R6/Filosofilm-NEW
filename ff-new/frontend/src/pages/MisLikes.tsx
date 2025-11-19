import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";
import NavbarInInferior from "../components/NavbarInInferior";
import API_URL from "../api/config";
import "../styles/Pages/MisResenas.css";

interface Resena {
  id_Reseña: number;
  contenido: string;
  calificacion: number;
  usuario: {
    id_Usuario: number;
    nickname: string;
  };
  id_Pelicula: number;
  titulo?: string;
}

const MisLikes: React.FC = () => {
  const navigate = useNavigate();
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Obtener usuario desde token
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navigate("/");
      return;
    }

    const { token } = JSON.parse(usuarioGuardado);

    fetch(`${API_URL}/Usuarios/perfil`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudo obtener el perfil");
        const data = await res.json();
        setIdUsuario(data.iD_Usuario || data.id_Usuario);
      })
      .catch(() => navigate("/"));
  }, [navigate]);

  // 🔹 Obtener reseñas con LIKE
  useEffect(() => {
    if (!idUsuario) return;

    const usuarioGuardado = localStorage.getItem("usuario");
    const { token } = usuarioGuardado ? JSON.parse(usuarioGuardado) : { token: "" };

    fetch(`${API_URL}/Likes/mis-likes`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Error obteniendo likes");

        const data = await res.json();

        // 🔥 LA CORRECCIÓN IMPORTANTE:
        const likesFormateados: Resena[] = data.map((like: any) => ({
          id_Reseña: like.reseña.id_Reseña,
          contenido: like.reseña.contenido,
          calificacion: like.reseña.calificacion,
          usuario: {
            id_Usuario: like.reseña.usuario.iD_Usuario,
            nickname: like.reseña.usuario.nickname,
          },
          id_Pelicula: like.reseña.pelicula.iD_Pelicula,
          titulo: like.reseña.pelicula.titulo,
        }));

        setResenas(likesFormateados);
      })
      .catch(() => setResenas([]))
      .finally(() => setLoading(false));
  }, [idUsuario]);

  // 🔹 Navegación
  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/Perfil");
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada");
    navigate("/");
  };

  const handleInformacion = () => navigate("/MiInformacion");
  const handleActividad = () => navigate("/Perfil");
  const handleResenas = () => navigate("/MisResenas");
  const handleLikes = () => navigate("/MisLikes");
  const handleConfig = () => navigate("/Configuracion");

  return (
    <div>
      {/* 🔹 Navbar superior */}
      <NavbarIn
        onInicioClick={handleInicio}
        onPeliculasClick={handlePeliculas}
        onPerfilClick={handlePerfil}
        onLogoutClick={handleLogout}
      />

      <hr />

      {/* 🔸 Navbar inferior */}
      <NavbarInInferior
        onInformacionClick={handleInformacion}
        onActividadClick={handleActividad}
        onResenasClick={handleResenas}
        onLikesClick={handleLikes}
        onConfigClick={handleConfig}
      />

      {/* 🔹 Contenido principal */}
      <div id="ContenedorPrincipal" className="container">
        <div className="row text-light py-3">
          <div className="col">
            <h1 className="reseñas">Estas son las reseñas que te gustaron</h1>
          </div>
        </div>

        {loading ? (
          <p className="text-light text-center">Cargando likes...</p>
        ) : resenas.length === 0 ? (
          <p className="text-light text-center">Aún no has dado like a ninguna reseña.</p>
        ) : (
          <div className="row">
            {resenas.map((resena) => (
              <div key={resena.id_Reseña} className="col-12">
                <article className="resena-card">
                  <header className="resena-header">
                    <h5 className="resena-username">{resena.usuario.nickname}</h5>
                  </header>

                  <br />

                  <section className="resena-body p-3 text-justify">
                    <p className="resena-text">{resena.contenido}</p>
                    <div
                      className="resena-rating"
                      aria-label={`Calificación: ${resena.calificacion} de 5`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < resena.calificacion ? "star on" : "star"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </section>

                  <footer className="resena-footer p-3">
                    <div className="pelicula-info">
                      <span className="pelicula-label">Película:</span>
                      <span className="pelicula-title">{resena.titulo || "Desconocida"}</span>
                    </div>
                  </footer>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisLikes;
