import React from "react";
import { useNavigate } from "react-router-dom";
import sample from "../assets/sample.svg";

import NavbarIn from "../components/NavbarIn";

const InicioDelUsuario: React.FC = () => {
  const navigate = useNavigate();

  // 🔹 Funciones para manejar la navegación
  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/Perfil");
  const handleLogout = () => navigate("/");

  return (
    <div>
      {/* 🔹 Navbar con funciones */}
      <NavbarIn
        onInicioClick={handleInicio}
        onPeliculasClick={handlePeliculas}
        onPerfilClick={handlePerfil}
        onLogoutClick={handleLogout}
      />

      {/* 🔹 Contenido principal */}
      <div className="container mt-4">
        <h1 className="text-center mb-4">Lista de Películas</h1>
        <div className="row">
          <div className="col-md-4 text-center">
            <img src={sample} alt="sample" style={{ maxWidth: "100%" }} />
            <h5>Película ejemplo</h5>
          </div>
          <div className="col-md-4 text-center">
            <img src={sample} alt="sample" style={{ maxWidth: "100%" }} />
            <h5>Película ejemplo</h5>
          </div>
          <div className="col-md-4 text-center">
            <img src={sample} alt="sample" style={{ maxWidth: "100%" }} />
            <h5>Película ejemplo</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioDelUsuario;
