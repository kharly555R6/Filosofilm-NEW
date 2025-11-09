import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/Administrador.css";
import "../styles/Pages/MiInformacion.css";
import NavbarIn from "../components/NavbarIn";
import NavbarInInferior from "../components/NavbarInInferior";
import API_URL from "../api/config";

const Configuracion: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreVisualizacion: "",
    apellidosVisualizacion: "",
    nuevaContrasena: "",
    contrasena: "",
    telefono: "",
    descripcion: "",
    gender: "",
  });

  // 🔹 Cargar información del usuario desde el backend
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      alert("Debes iniciar sesión primero.");
      navigate("/");
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
        if (!res.ok) throw new Error("Error al obtener datos del usuario");
        const data = await res.json();

        // 🔸 Cargar los valores actuales del usuario
        setFormData({
          nombreVisualizacion: data.nombre || "",
          apellidosVisualizacion: data.apellido || "",
          nuevaContrasena: "",
          contrasena: "",
          telefono: data.telefono || "",
          descripcion: data.descripcion || "",
          gender:
            data.sexo?.toLowerCase() === "masculino"
              ? "male"
              : data.sexo?.toLowerCase() === "femenino"
              ? "female"
              : "otro",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al cargar configuración del usuario.");
      });
  }, [navigate]);

  // 🔹 Enviar actualización al backend
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.nuevaContrasena !== formData.contrasena) {
      alert("⚠️ Las contraseñas no coinciden");
      return;
    }

    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      alert("Sesión expirada.");
      navigate("/");
      return;
    }

    const { token } = JSON.parse(usuarioGuardado);

    const payload = {
      nombre: formData.nombreVisualizacion,
      apellido: formData.apellidosVisualizacion,
      descripcion: formData.descripcion,
      telefono: formData.telefono,
      sexo:
        formData.gender === "male"
          ? "Masculino"
          : formData.gender === "female"
          ? "Femenino"
          : "Otro",
      contrasena: formData.nuevaContrasena || undefined,
    };

    fetch(`${API_URL}/Usuarios/actualizar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al actualizar usuario");
        alert("Configuración guardada correctamente ✅");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("❌ No se pudo guardar la configuración.");
      });
  };

  // 🔹 Manejo de cambios
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Funciones Navbar superior
  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/Perfil");
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada");
    navigate("/");
  };

  // 🔹 Navbar inferior
  const handleInformacion = () => navigate("/MiInformacion");
  const handleActividad = () => navigate("/Perfil");
  const handleResenas = () => navigate("/MisResenas");
  const handleLikes = () => navigate("/MisLikes");
  const handleConfig = () => navigate("/Configuracion");

  return (
    <div>
      {/* 🔸 Navbar superior */}
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

      <div className="miinfo-bg my-4">
        <div className="miinfo-card">
          <h2>Mi configuración</h2>

          <form onSubmit={handleSubmit}>
            <div className="miinfo-row">
              <div className="miinfo-field">
                <label className="miinfo-label" htmlFor="nombreVisualizacion">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombreVisualizacion"
                  name="nombreVisualizacion"
                  value={formData.nombreVisualizacion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="miinfo-field">
                <label className="miinfo-label" htmlFor="apellidosVisualizacion">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="apellidosVisualizacion"
                  name="apellidosVisualizacion"
                  value={formData.apellidosVisualizacion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="miinfo-field">
                <label className="miinfo-label" htmlFor="nuevaContrasena">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  id="nuevaContrasena"
                  name="nuevaContrasena"
                  value={formData.nuevaContrasena}
                  onChange={handleChange}
                />
              </div>

              <div className="miinfo-field">
                <label className="miinfo-label" htmlFor="contrasena">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                />
              </div>

              <div className="miinfo-field">
                <label className="miinfo-label" htmlFor="telefono">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="miinfo-field">
                <label className="miinfo-label" htmlFor="descripcion">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  maxLength={200}
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </div>

              <div
                className="miinfo-field text-center p-4"
                style={{ alignItems: "center" }}
              >
                <label className="miinfo-label">Género</label>
                <div>
                  <label style={{ margin: "0 3rem" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                    />{" "}
                    Hombre
                  </label>
                  <label style={{ margin: "0 3rem" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                    />{" "}
                    Mujer
                  </label>
                  <label style={{ margin: "0 3rem" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="otro"
                      checked={formData.gender === "otro"}
                      onChange={handleChange}
                    />{" "}
                    Otro
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="miinfo-submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
