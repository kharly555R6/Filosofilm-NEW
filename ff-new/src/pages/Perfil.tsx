import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";
import NavbarInInferior from "../components/NavbarInInferior";

const Perfil: React.FC = () => {
  const navigate = useNavigate(); // ✅ Hook necesario para redirigir

  // 🔹 Funciones de navegación para el Navbar superior
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
    // Aquí puedes agregar la lógica de perfil dinámico, por ejemplo:
    // fetch('/api/favoritos').then(res => res.json()).then(data => setFavoritos(data));
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

      {/* 🔸 Navbar inferior habilitada */}
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
          {/* FAVORITOS */}
          <div className="row text-light py-3">
            <div className="col">
              <h3>Favoritos</h3>
            </div>
          </div>

          <div id="ContenedorFavoritos" className="row">
            {/* Aquí podrías renderizar tus películas favoritas */}
            {/* Ejemplo:
              {favoritos.map((p) => (
                <div key={p.id} className="col-md-3 mb-3">
                  <div className="card">
                    <img src={p.imagen} className="card-img-top" alt={p.titulo} />
                    <div className="card-body text-center">
                      <h5>{p.titulo}</h5>
                    </div>
                  </div>
                </div>
              ))} 
            */}
          </div>
        </div>

        {/* VISTAS RECIENTES */}
        <div className="container">
          <div className="row text-light py-3">
            <div className="col">
              <h3>Vistas recientemente</h3>
            </div>
          </div>

          <div id="ContenedorVistasRecientes" className="row">
            {/* Aquí puedes renderizar dinámicamente tus vistas recientes */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
