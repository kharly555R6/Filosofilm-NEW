import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";
import NavbarInInferior from "../components/NavbarInInferior";
import '../styles/Pages/MiInformacion.css';

const Perfil: React.FC = () => {
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

      {/* 🔹 Navbar inferior habilitada */}
      <NavbarInInferior
        onInformacionClick={handleInformacion}
        onActividadClick={handleActividad}
        onResenasClick={handleResenas}
        onLikesClick={handleLikes}
        onConfigClick={handleConfig}
      />

      {/* 🔸 Información del usuario */}
      <div className="miinfo-bg my-4 rounded">
        <div className="miinfo-card">
          <h2>Información del Usuario</h2>
          <div className="miinfo-row">
            <div className="miinfo-field">
              <span className="miinfo-label">Nickname:</span>
              <span id="nombreVisualizacionSpan" className="miinfo-value"></span>
            </div>

            <div className="miinfo-field">
              <span className="miinfo-label">Nombre:</span>
              <span id="nombreSpan" className="miinfo-value"></span>
            </div>

            <div className="miinfo-field">
              <span className="miinfo-label">Apellidos:</span>
              <span id="Apellidos" className="miinfo-value"></span>
            </div>

            <div className="miinfo-field">
              <span className="miinfo-label">Correo Electrónico:</span>
              <span id="correoElectronicoSpan" className="miinfo-value"></span>
            </div>

            <div className="miinfo-field">
              <span className="miinfo-label">Fecha de creación:</span>
              <span id="fechacreacionSpan" className="miinfo-value"></span>
            </div>

            <div className="miinfo-field">
              <span className="miinfo-label">Descripción:</span>
              <span id="DescripcionCampo" className="miinfo-value"></span>
            </div>

            <div className="miinfo-field">
              <span className="miinfo-label">Fecha de nacimiento:</span>
              <span id="fechaNacimientoSpan" className="miinfo-value"></span>
            </div>

            <div className="miinfo-field">
              <span className="miinfo-label">Género:</span>
              <span id="generoSpan" className="miinfo-value"></span>
            </div>

            <div className="miinfo-field">
              <span className="miinfo-label">Fecha de registro:</span>
              <span id="fechaRegistroSpan" className="miinfo-value"></span>
            </div>
          </div>

          <a href="/Configuracion" className="miinfo-back w-100 text-center">Editar</a>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
