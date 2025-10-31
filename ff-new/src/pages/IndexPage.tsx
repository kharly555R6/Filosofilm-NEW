import React from "react";
import NavbarOut from "../components/NavbarOut";
import logo from '../assets/img/logo.png';
import FormIS from "../components/FormIniciarSesion";
import '../styles/Pages/Index.css';

const Login: React.FC = () => {
  return (
    <>

      <NavbarOut />

      <div className="container">
        {/* Logo */}
        <div className="row text-center containerLogo">
          <div className="col p-5">
            <div className="p-2">
              <img
                id="LogoFilosofilm"
                src={logo}
                className="img-fluid"
                alt="Logo Filosofilm"
              />
            </div>
          </div>
        </div>

        {/* Frase */}
        <div className="row text-center">
          <div className="col p-5 bg-secondary">
            <h1>Analizando peliculas, inspirando pensamientos</h1>
          </div>
        </div>

        {/* Formulario */}
        <div className="row text-center containerLogin">
          <div className="col-sm-12 col-md-10 col-lg-8 foto">
                {/* Imagen decorativa o ilustrativa en el css*/}
          </div>

          <div className="col-lg-4 bg-warning p-3 containerForm">
            <h2 className="fw-bold text-center py-5">Bienvenido a Filosofilm</h2>
            <FormIS />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
