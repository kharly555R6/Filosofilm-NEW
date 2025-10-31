import React from "react";

const FormR: React.FC = () => {
  return (
    <div>
      <form id="FormRegistrarse">
        {/* Nombres y apellidos */}
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="InputName" className="form-label">
              Nombres
            </label>
            <input
              type="text"
              className="form-control"
              id="InputName"
              required
            />
          </div>

          <div className="col-6">
            <label htmlFor="InputApellidos" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className="form-control"
              id="InputApellidos"
              required
            />
          </div>
        </div>

        {/* Nickname */}
        <div className="row mb-3">
          <div className="col-12">
            <label htmlFor="InputNickname" className="form-label">
              Nickname
            </label>
            <input
              type="text"
              className="form-control"
              id="InputNickname"
              required
            />
          </div>
        </div>

        {/* Correo y teléfono */}
        <div className="row mb-3">
          <div className="col-lg-6">
            <label htmlFor="InputEmail" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="InputEmail"
              required
            />
          </div>

          <div className="col-lg-6">
            <label htmlFor="InputPhone" className="form-label">
              Teléfono
            </label>
            <input
              type="tel"
              className="form-control"
              id="InputPhone"
            />
          </div>
        </div>

        {/* Contraseña y confirmación */}
        <div className="row mb-3">
          <div className="col-lg-6">
            <label htmlFor="InputPassword" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="InputPassword"
              required
            />
          </div>

          <div className="col-lg-6">
            <label htmlFor="InputConfirmPassword" className="form-label">
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

        {/* Fecha de nacimiento y género */}
        <div className="row mb-3">
          <div className="col-8">
            <label htmlFor="InputBirthDate" className="form-label">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              className="form-control"
              id="InputBirthDate"
              required
            />
          </div>

          <div className="col-1"></div>

          <div className="col-3">
            <label className="form-label">Género</label>

            <div>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                />{" "}
                Hombre
              </label>
            </div>

            <div>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                />{" "}
                Mujer
              </label>
            </div>

            <div>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="other"
                />{" "}
                Otro
              </label>
            </div>
          </div>
        </div>

        {/* Botón de registro */}
        <div className="row text-center">
          <div className="col-4"></div>

          <div className="col-4">
            <button type="submit" className="btn btn-warning">
              Registrarse
            </button>
          </div>

          <div className="col-4"></div>
        </div>
      </form>
    </div>
  );
};

export default FormR;
