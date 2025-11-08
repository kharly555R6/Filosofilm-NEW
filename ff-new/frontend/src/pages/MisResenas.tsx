import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";
import NavbarInInferior from "../components/NavbarInInferior";

const MisResenas: React.FC = () => {
  const navigate = useNavigate();

  // 🔹 Funciones para la Navbar superior
  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/Perfil");
  const handleLogout = () => {
    alert("Sesión cerrada");
    navigate("/");
  };

  // 🔹 Funciones para la Navbar inferior
  const handleInformacion = () => navigate("/MiInformacion");
  const handleActividad = () => navigate("/Perfil");
  const handleResenas = () => navigate("/MisResenas");
  const handleLikes = () => navigate("/MisLikes");
  const handleConfig = () => navigate("/Configuracion");

  useEffect(() => {
    // Aquí puedes agregar la lógica para cargar reseñas del usuario
    // Ejemplo:
    // fetch('/api/mis-resenas')
    //   .then(res => res.json())
    //   .then(data => setResenas(data));
  }, []);

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
            <h3 className="reseñas">Todas las Reseñas de @Usuario</h3>
          </div>
        </div>

        {/* 🔸 Contenedor dinámico de reseñas */}
        <div className="row" id="ContenedorReseñas">
          {/* Ejemplo de cómo podrías renderizar reseñas:
            {resenas.map((r) => (
              <div key={r.id} className="col-md-4 mb-3">
                <div className="card text-dark">
                  <div className="card-body">
                    <h5>{r.titulo}</h5>
                    <p>{r.comentario}</p>
                    <small>{r.fecha}</small>
                  </div>
                </div>
              </div>
            ))}
          */}
        </div>
      </div>
    </div>
  );
};

export default MisResenas;
