import React, { useState, useEffect } from "react";

import logo from "../assets/img/logo.png";
import logoFN from "../assets/img/logoFN.jpg";

import NavbarOut from "../components/NavbarOut";
import FormIS from "../components/FormIniciarSesion";
import FormR from "../components/FormRegistrarse";
import QueEsFF from "../components/QueEsFF";
import Nosotros from "../components/Nosotros";

import "../styles/Pages/Index.css";
import { motion, AnimatePresence } from "framer-motion";

type Vista = "login" | "registro" | "nosotros" | "queEsFF";

const Login: React.FC = () => {
  const [vistaActual, setVistaActual] = useState<Vista>("login");
  const [animacionInicial, setAnimacionInicial] = useState(true);
  const [mostrarContenido, setMostrarContenido] = useState(false);

  useEffect(() => {
    // Animación inicial
    const timer1 = setTimeout(() => setAnimacionInicial(false), 1500);
    const timer2 = setTimeout(() => setMostrarContenido(true), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <NavbarOut
        onLoginClick={() => setVistaActual("login")}
        onRegisterClick={() => setVistaActual("registro")}
        onNosotrosClick={() => setVistaActual("nosotros")}
        onQueEsFFClick={() => setVistaActual("queEsFF")}
      />

      <div className="container">
        {/* Animación inicial */}
        <AnimatePresence>
          {animacionInicial && (
            <motion.div
              className="initial-animation"
              key="initial-load"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="text-center py-5">
                <h1 className="fw-bold">
                  Analizando películas, inspirando pensamientos
                </h1>
              </div>

              <div className="row text-center">
                <div className="col p-3">
                  <div className="p-2">
                    <img
                      id="LogoFilosofilmN"
                      src={logoFN}
                      className="img-fluid"
                      alt="Logo Filosofilm"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido principal */}
        {mostrarContenido && (
          <AnimatePresence mode="wait">
            {/* LOGIN */}
            {vistaActual === "login" && (
              <motion.div
                key="login-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="row text-center frase-div">
                  <div className="col py-5 bg-secondary fw-bold">
                    <h1>Analizando películas, inspirando pensamientos</h1>
                  </div>
                </div>

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

                <br />

                <div className="row text-center containerLogin">
                  <div className="col-sm-12 col-md-10 col-lg-8 foto"></div>

                  <div className="col-lg-4 bg-warning p-3 containerForm">
                    <h2 className="fw-bold text-center py-5">
                      Bienvenido a Filosofilm
                    </h2>
                    <FormIS />

                    <p className="mt-3">
                      ¿No tienes cuenta? <br />
                      <button
                        type="button"
                        className="btn btn-link buttonRegister-Back"
                        onClick={() => setVistaActual("registro")}
                      >
                        Registrarse
                      </button>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* REGISTRO */}
            {vistaActual === "registro" && (
              <motion.div
                key="register-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <FormR onBack={() => setVistaActual("login")} />
              </motion.div>
            )}

            {/* NOSOTROS */}
            {vistaActual === "nosotros" && (
              <motion.div
                key="nosotros-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Nosotros />
              </motion.div>
            )}

            {/* QUE ES FILMOSFILM */}
            {vistaActual === "queEsFF" && (
              <motion.div
                key="queEsFF-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <QueEsFF />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  );
};

export default Login;
