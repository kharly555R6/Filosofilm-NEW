import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";
import NavbarInInferior from "../components/NavbarInInferior";

const MisLikes: React.FC = () => {
  const navigate = useNavigate();

  // 🔹 Funciones para Navbar superior
  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/Perfil");
  const handleLogout = () => {
    alert("Sesión cerrada");
    navigate("/");
  };

  // 🔹 Funciones para Navbar inferior
  const handleInformacion = () => navigate("/MiInformacion");
  const handleActividad = () => navigate("/Perfil");
  const handleResenas = () => navigate("/MisResenas");
  const handleLikes = () => navigate("/MisLikes");
  const handleConfig = () => navigate("/Configuracion");

  useEffect(() => {
    // Aquí puedes cargar tu script MisLikes.js si lo necesitas portar
    // o hacer fetch de los datos que llenarían el contenedor
    // Ejemplo:
    // fetch('/api/likes')
    //   .then(res => res.json())
    //   .then(data => setLikes(data));
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
      <div id="ContenedorPrincipal">
        <div className="container">
          <div className="row text-light py-3">
            <div className="col">
              <h3 className="reseñas">Likes dados por @Usuario</h3>
            </div>
          </div>

          {/* 🔸 Contenedor dinámico de likes */}
          <div className="row" id="ContenedorReseñas">
            {/* Ejemplo:
              {likes.map((like) => (
                <div key={like.id} className="col-md-3 mb-3">
                  <div className="card text-dark">
                    <img src={like.imagen} alt={like.titulo} className="card-img-top" />
                    <div className="card-body text-center">
                      <h5>{like.titulo}</h5>
                    </div>
                  </div>
                </div>
              ))}
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisLikes;
