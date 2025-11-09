import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api/config"; // URL base del backend

const FormIS: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Verificar si ya hay sesión guardada
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      navigate("/InicioDelUsuario");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/Usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo_Electronico: email, // 👈 Debe coincidir con tu DTO del backend
          contraseña: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Inicio de sesión exitoso:", data);

        // 🔹 Guardamos el usuario y token para mantener la sesión
        localStorage.setItem(
          "usuario",
          JSON.stringify({
            token: data.token,
            nickname: data.nickname,
            id: data.id_Usuario,
            correo: data.correo_Electronico,
            rol: data.id_Rol,
          })
        );

        navigate("/InicioDelUsuario");
      } else if (response.status === 401) {
        alert("Correo o contraseña incorrectos.");
      } else {
        alert("Error al iniciar sesión. Intenta más tarde.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div>
      <form id="UsuarioForm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            <i className="bx bx-envelope"></i> Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            name="email"
            placeholder="e.g. email@address.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            <i className="bx bx-lock-alt"></i> Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            name="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn font-weight-bold w-100 buttonIS"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormIS;
