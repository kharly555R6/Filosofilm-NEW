import React, { useState } from "react";
import "../styles/Components/FormR.css";
import API_URL from "../api/config";

interface FormRProps {
  onBack: () => void;
}

const FormR: React.FC<FormRProps> = ({ onBack }) => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [nickname, setNickname] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contraseña !== confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/Usuarios/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
          nombre: nombres,
          apellido: apellidos,
          correo_Electronico: correo,
          contraseña,
          telefono,
          sexo: genero,
          fecha_Nacimiento: fechaNacimiento,
        }),
      });

      if (response.ok) {
        alert("Usuario registrado correctamente ✅");
        onBack();
      } else {
        const errorText = await response.text();
        console.error("Error en el registro:", errorText);
        alert("Error al registrar el usuario. Verifica los datos.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="containerFormR">
      <form id="FormRegistrarse" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="InputName" className="form-label labelR">
              Nombres
            </label>
            <input
              type="text"
              className="form-control"
              id="InputName"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="InputApellidos" className="form-label labelR">
              Apellidos
            </label>
            <input
              type="text"
              className="form-control"
              id="InputApellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <label htmlFor="InputNickname" className="form-label labelR">
              Nickname
            </label>
            <input
              type="text"
              className="form-control"
              id="InputNickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-6">
            <label htmlFor="InputEmail" className="form-label labelR">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="InputEmail"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="col-lg-6">
            <label htmlFor="InputPhone" className="form-label labelR">
              Teléfono
            </label>
            <input
              type="tel"
              className="form-control"
              id="InputPhone"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-6">
            <label htmlFor="InputPassword" className="form-label labelR">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="InputPassword"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          <div className="col-lg-6">
            <label htmlFor="InputConfirmPassword" className="form-label labelR">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="InputConfirmPassword"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-1"></div>

          <div className="col-2">
            <br />
            <label className="form-label labelR">Género</label>

            <div>
              <label className="form-check-label labelR">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Hombre"
                  onChange={(e) => setGenero(e.target.value)}
                />{" "}
                Hombre
              </label>
            </div>

            <div>
              <label className="form-check-label labelR">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Mujer"
                  onChange={(e) => setGenero(e.target.value)}
                />{" "}
                Mujer
              </label>
            </div>

            <div>
              <label className="form-check-label labelR">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Otro"
                  onChange={(e) => setGenero(e.target.value)}
                />{" "}
                Otro
              </label>
            </div>
          </div>

          <div className="col-5 d-flex flex-column justify-content-between">
            <div>
              <label htmlFor="InputBirthDate" className="form-label labelR">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="InputBirthDate"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
              />
            </div>

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-warning w-100 buttonRS">
                Registrarse
              </button>
            </div>

            <div className="text-center mt-2">
              <button
                type="button"
                className="btn btn-link buttonRegister-Back"
                onClick={onBack}
              >
                Volver al inicio de sesión
              </button>
            </div>
          </div>

          <div className="col-3 palomitas-div"></div>
        </div>
      </form>
    </div>
  );
};

export default FormR;
