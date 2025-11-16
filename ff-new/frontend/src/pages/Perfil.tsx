import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";
import NavbarInInferior from "../components/NavbarInInferior";
import CarruselPelis from "../components/CarruselPelis";
import API_URL from "../api/config";

interface Pelicula {
  iD_Pelicula: number;
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

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState<Pelicula[]>([]);
  const [vistos, setVistos] = useState<Pelicula[]>([]);

  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/Perfil");
  const handleLogout = () => {
    alert("Sesión cerrada");
    navigate("/");
  };

  const handleInformacion = () => navigate("/MiInformacion");
  const handleActividad = () => navigate("/Perfil");
  const handleResenas = () => navigate("/MisResenas");
  const handleLikes = () => navigate("/MisLikes");
  const handleConfig = () => navigate("/Configuracion");

  // Fetch de favoritos
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    
    if (!usuarioGuardado) {
      navigate("/");
      return;
    }

    const parsed = JSON.parse(usuarioGuardado);
    const token = parsed?.token;

    if (!token) {
      navigate("/");
      return;
    }

    console.log("Cargando favoritos...");
    
    fetch(`${API_URL}/favoritos/mis-favoritos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("Respuesta de favoritos:", res);
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Datos crudos de favoritos:", data);

        if (!Array.isArray(data)) {
          console.error("La respuesta de favoritos no es un array:", data);
          return;
        }

        const candidateIds = data
          .map((item: any) => {
            const peli = item.pelicula || item;
            return peli?.iD_Pelicula ?? peli?.ID_Pelicula ?? peli?.id_Pelicula ?? peli?.id ?? null;
          })
          .filter((id: any) => id != null);

        if (candidateIds.length === 0) {
          console.warn("No se encontraron IDs de película en favoritos:", data);
          setFavoritos([]);
          return;
        }

        Promise.all(
          candidateIds.map((pid: any) =>
            fetch(`${API_URL}/peliculas/${pid}`).then((r) => (r.ok ? r.json() : null)).catch(() => null)
          )
        )
          .then((pelisData) => {
            const peliculasFavoritas = pelisData
              .filter(Boolean)
              .map((p: any) => ({
                iD_Pelicula: p.ID_Pelicula ?? p.iD_Pelicula ?? p.ID ?? p.id,
                titulo: p.Titulo ?? p.titulo ?? p.Nombre ?? p.nombre ?? "Sin título",
                imagen: p.Imagen ?? p.imagen ?? p.ImagenUrl ?? p.imagenUrl ?? "",
                sinopsis: p.Sinopsis ?? p.sinopsis ?? "",
                fecha_Lanzamiento: p.Fecha_Lanzamiento ?? p.fecha_Lanzamiento ?? "",
                genero: (p.Genero || p.genero || []).map((g: any) => g.Nombre ?? g.nombre ?? g.Name ?? ""),
                duracion: p.Duracion ?? p.duracion ?? "",
                presupuesto: p.Presupuesto ?? p.presupuesto ?? 0,
                recaudacion: p.Recaudacion ?? p.recaudacion ?? 0,
                clasificacion: p.Clasificacion ?? p.clasificacion ?? "",
              } as Pelicula));

            setFavoritos(peliculasFavoritas);
          })
          .catch((err) => {
            console.error("Error al obtener detalles de películas favoritas:", err);
            setFavoritos([]);
          });
      })
      .catch((err) => {
        console.error("Error al cargar favoritos:", err);
        alert("Error al cargar favoritos: " + err.message);
      });
  }, []);

  // Fetch de vistos
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    
    if (!usuarioGuardado) return;

    const parsed = JSON.parse(usuarioGuardado);
    const token = parsed?.token;

    if (!token) return;

    console.log("Cargando vistos...");
    
    fetch(`${API_URL}/vistos/mis-vistos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("Respuesta de vistos:", res);
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Datos crudos de vistos:", data);
        
        // Verificar la estructura de la respuesta
        if (Array.isArray(data)) {
          const candidateIds = data.map((item: any) => {
            const peli = item.pelicula || item;
            return (
              peli?.iD_Pelicula ?? peli?.ID_Pelicula ?? peli?.id_Pelicula ?? peli?.id ?? null
            );
          }).filter((id: any) => id != null);

          if (candidateIds.length === 0) {
            console.warn('No se encontraron IDs de película en vistos:', data);
            setVistos([]);
            return;
          }

          Promise.all(
            candidateIds.map((pid: any) =>
              fetch(`${API_URL}/peliculas/${pid}`).then((r) => r.ok ? r.json() : null).catch(() => null)
            )
          )
            .then((pelisData) => {
              const peliculasVistas = pelisData
                .filter(Boolean)
                .map((p: any) => ({
                  iD_Pelicula: p.ID_Pelicula ?? p.iD_Pelicula ?? p.ID ?? p.id,
                  titulo: p.Titulo ?? p.titulo ?? p.Nombre ?? p.nombre ?? 'Sin título',
                  imagen: p.Imagen ?? p.imagen ?? p.ImagenUrl ?? p.imagenUrl ?? '',
                  sinopsis: p.Sinopsis ?? p.sinopsis ?? '',
                  fecha_Lanzamiento: p.Fecha_Lanzamiento ?? p.fecha_Lanzamiento ?? '',
                  genero: (p.Genero || p.genero || []).map((g: any) => g.Nombre ?? g.nombre ?? g.Name ?? ''),
                  duracion: p.Duracion ?? p.duracion ?? '',
                  presupuesto: p.Presupuesto ?? p.presupuesto ?? 0,
                  recaudacion: p.Recaudacion ?? p.recaudacion ?? 0,
                  clasificacion: p.Clasificacion ?? p.clasificacion ?? '',
                } as Pelicula));

              setVistos(peliculasVistas);
            })
            .catch((err) => {
              console.error('Error al obtener detalles de películas vistas:', err);
              setVistos([]);
            });
        } else {
          console.error("La respuesta de vistos no es un array:", data);
        }
      })
      .catch((err) => {
        console.error("Error al cargar vistos:", err);
        alert("Error al cargar vistos: " + err.message);
      });
  }, []);

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

      <div id="ContenedorPrincipal">
        {/* FAVORITOS */}
        <div className="container">
          <div className="row text-light py-3">
            <div className="col">
              <h1>Favoritos</h1>
            </div>
          </div>

          {favoritos.length > 0 ? (
            <CarruselPelis
              titulo=""
              peliculas={favoritos}
              classNameTitulo="catPeli h3 text-left catPeli1"
            />
          ) : (
            <div className="text-center text-light">
              <p>No tienes películas favoritas aún.</p>
            </div>
          )}
        </div>

        {/* VISTAS RECIENTES */}
        <div className="container">
          <div className="row text-light py-3">
            <div className="col">
              <h1>Vistas recientemente</h1>
            </div>
          </div>

          {vistos.length > 0 ? (
            <CarruselPelis
              titulo=""
              peliculas={vistos}
              classNameTitulo="catPeli h3 text-left catPeli1"
            />
          ) : (
            <div className="text-center text-light">
              <p>No tienes películas vistas recientemente.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;