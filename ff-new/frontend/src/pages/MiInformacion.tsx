import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarIn from "../components/NavbarIn";
import NavbarInInferior from "../components/NavbarInInferior";
import API_URL from "../api/config";
import "../styles/Pages/MiInformacion.css";

interface Usuario {
  nickname: string;
  nombre: string;
  apellido: string;
  correo_Electronico: string; 
  fecha_Registro?: string;
  descripcion?: string;
  fecha_Nacimiento?: string;
  sexo?: string;
}


const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // 🔹 Cargar información del usuario al montar el componente
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      alert("Debes iniciar sesión primero.");
      navigate("/");
      return;
    }

    const { token } = JSON.parse(usuarioGuardado);

    // 🔹 Petición al backend
    fetch(`${API_URL}/Usuarios/perfil`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Error al obtener la información del usuario");
        }
        const data = await res.json();
        setUsuario(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al cargar tu perfil. Intenta iniciar sesión nuevamente.");
        navigate("/");
      });
  }, [navigate]);

  // 🔹 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada.");
    navigate("/");
  };

  // 🔹 Funciones Navbar superior
  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/Perfil");

  // 🔹 Navbar inferior
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

      {/* 🔹 Navbar inferior */}
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

          {usuario ? (
            <div className="miinfo-row">
              <div className="miinfo-field">
                <span className="miinfo-label">Nickname:</span>
                <span className="miinfo-value">{usuario.nickname}</span>
              </div>

              <div className="miinfo-field">
                <span className="miinfo-label">Nombre:</span>
                <span className="miinfo-value">{usuario.nombre || "—"}</span>
              </div>

              <div className="miinfo-field">
                <span className="miinfo-label">Apellidos:</span>
                <span className="miinfo-value">{usuario.apellido || "—"}</span>
              </div>

              <div className="miinfo-field">
                <span className="miinfo-label">Correo Electrónico:</span>
                <span className="miinfo-value">{usuario.correo_Electronico}</span>
              </div>

              <div className="miinfo-field">
                <span className="miinfo-label">Fecha de creación:</span>
                <span className="miinfo-value">{usuario.fecha_Registro || "—"}</span>
              </div>

              <div className="miinfo-field">
                <span className="miinfo-label">Descripción:</span> <br /><br />
                <span className="miinfo-value">{usuario.descripcion || "—"}</span>
              </div>

              <div className="miinfo-field">
                <span className="miinfo-label">Fecha de nacimiento:</span>
                <span className="miinfo-value">{usuario.fecha_Nacimiento || "—"}</span>
              </div>

              <div className="miinfo-field">
                <span className="miinfo-label">Género:</span>
                <span className="miinfo-value">{usuario.sexo || "—"}</span>
              </div>

              <div className="miinfo-field">
                <span className="miinfo-label">Fecha de registro:</span>
                <span className="miinfo-value">{usuario.fecha_Registro || "—"}</span>
              </div>
            </div>
          ) : (
            <p className="text-center mt-3">Cargando información...</p>
          )}

          <a href="/Configuracion" className="miinfo-submit w-100 text-center">
            Editar
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default Perfil;
