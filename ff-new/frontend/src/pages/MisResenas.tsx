import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";
import NavbarInInferior from "../components/NavbarInInferior";
import API_URL from "../api/config"; // Asegúrate que aquí esté la URL de tu API
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
  titulo?: string; // Nombre de la película
}

const MisResenas: React.FC = () => {
  const navigate = useNavigate();
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [loading, setLoading] = useState(true);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  // 🔹 Obtener ID de usuario desde el backend usando token Bearer
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navigate("/"); // redirige si no hay sesión
      return;
    }

    const { token } = JSON.parse(usuarioGuardado);

    fetch(`${API_URL}/Usuarios/perfil`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudo obtener el perfil");
        const data = await res.json();
        setIdUsuario(data.iD_Usuario || data.id_Usuario);
      })
      .catch((err) => {
        console.error(err);
        alert("Error al obtener el usuario. Inicia sesión nuevamente.");
        navigate("/");
      });
  }, [navigate]);

  // 🔹 Cargar reseñas cuando tengamos el ID
  useEffect(() => {
    if (!idUsuario) return; // Esperamos a tener el ID

    const usuarioGuardado = localStorage.getItem("usuario");
    const { token } = usuarioGuardado ? JSON.parse(usuarioGuardado) : { token: "" };

    fetch(`${API_URL}/resenas/usuario/${idUsuario}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudieron cargar las reseñas.");
        const data = await res.json();

        const resenasFormateadas: Resena[] = data.map((r: any) => ({
          id_Reseña: r.iD_Reseña,
          contenido: r.contenido,
          calificacion: r.calificacion,
          usuario: {
            id_Usuario: r.usuario.iD_Usuario,
            nickname: r.usuario.nickname,
          },
          id_Pelicula: r.iD_Pelicula,
          titulo: r.pelicula.titulo,
        }));

        setResenas(resenasFormateadas);
      })
      .catch((err) => {
        console.error(err);
        setResenas([]);
      })
      .finally(() => setLoading(false));
  }, [idUsuario]);

  const handleModificar = (idResena: number) => {
    navigate(`/ModificarResena/${idResena}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada.");
    navigate("/");
  };

  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/Perfil");
  const handleInformacion = () => navigate("/MiInformacion");
  const handleActividad = () => navigate("/Perfil");
  const handleResenas = () => navigate("/MisResenas");
  const handleLikes = () => navigate("/MisLikes");
  const handleConfig = () => navigate("/Configuracion");

  return (
    <div>
      <NavbarIn
        onInicioClick={handleInicio}
        onPeliculasClick={handlePeliculas}
        onPerfilClick={handlePerfil}
        onLogoutClick={handleLogout}
      />
      <hr />
      <NavbarInInferior
        onInformacionClick={handleInformacion}
        onActividadClick={handleActividad}
        onResenasClick={handleResenas}
        onLikesClick={handleLikes}
        onConfigClick={handleConfig}
      />

      <div id="ContenedorPrincipal" className="container">
        <div className="row text-light py-3">
          <div className="col">
            <h1 className="reseñas">Esto es lo que tengo que decir</h1>
          </div>
        </div>

        {loading ? (
          <p className="text-light text-center">Cargando reseñas...</p>
        ) : resenas.length === 0 ? (
          <p className="text-light text-center">No has publicado ninguna reseña aún.</p>
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
                    <div className="resena-rating" aria-label={`Calificación: ${resena.calificacion} de 5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < resena.calificacion ? "star on" : "star"}>★</span>
                      ))}
                    </div>
                  </section>

                  <footer className="resena-footer p-3">
                    <div className="pelicula-info">
                      <span className="pelicula-label">Película:</span>
                      <span className="pelicula-title">{resena.titulo || "Desconocida"}</span>
                    </div>
                    <div>
                      <button className="btn-modificar" onClick={() => handleModificar(resena.id_Reseña)}>Modificar</button>
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

export default MisResenas;
