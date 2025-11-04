import React from "react";
import "../styles/Components/FormR.css";

interface FormRProps {
  onBack: () => void;
}

const FormR: React.FC<FormRProps> = ({ onBack }) => {
  return (
    <div className="containerFormR">
      <form id="FormRegistrarse">
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="InputName" className="form-label labelR">
              Nombres
            </label>
            <input type="text" className="form-control" id="InputName" required />
          </div>

          <div className="col-6">
            <label htmlFor="InputApellidos" className="form-label labelR">
              Apellidos
            </label>
            <input type="text" className="form-control" id="InputApellidos" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <label htmlFor="InputNickname" className="form-label labelR">
              Nickname
            </label>
            <input type="text" className="form-control" id="InputNickname" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-6">
            <label htmlFor="InputEmail" className="form-label labelR">
              Correo Electrónico
            </label>
            <input type="email" className="form-control" id="InputEmail" required />
          </div>

          <div className="col-lg-6">
            <label htmlFor="InputPhone" className="form-label labelR">
              Teléfono
            </label>
            <input type="tel" className="form-control" id="InputPhone" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-6">
            <label htmlFor="InputPassword" className="form-label labelR">
              Contraseña
            </label>
            <input type="password" className="form-control" id="InputPassword" required />
          </div>

          <div className="col-lg-6">
            <label htmlFor="InputConfirmPassword" className="form-label labelR">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="InputConfirmPassword"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-1"></div>

          <div className="col-1">
            <br />
            <label className="form-label labelR">Género</label>

            <div>
              <label className="form-check-label labelR">
                <input className="form-check-input" type="radio" name="gender" value="male" /> Hombre
              </label>
            </div>

            <div>
              <label className="form-check-label labelR">
                <input className="form-check-input" type="radio" name="gender" value="female" /> Mujer
              </label>
            </div>

            <div>
              <label className="form-check-label labelR">
                <input className="form-check-input" type="radio" name="gender" value="other" /> Otro
              </label>
            </div>
          </div>

          <div className="col-1"></div>

          <div className="col-5 d-flex flex-column justify-content-between">
            <div>
              <label htmlFor="InputBirthDate" className="form-label labelR">
                Fecha de Nacimiento
              </label>
              <input type="date" className="form-control" id="InputBirthDate" required />
            </div>

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-warning w-100 fw-bold">
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
