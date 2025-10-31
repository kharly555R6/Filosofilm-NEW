import React from "react";
import '../styles/Pages/Nosotros.css';
import sample from '../assets/sample.svg';
import NavbarOut from "../components/NavbarOut";

const Nosotros: React.FC = () => {
  return (
    <div className="nosotros-container">

      <NavbarOut/>

      <div className="nosotros-content text-center">
        <h1 className="nosotros-title">¡Conoce al equipo de Filosofilm!</h1>

        <div className="container">
          <div className="row">
            {/* --- Greco Rodríguez --- */}
            <div className="col-md-6 nosotros-section">
              <h4>Greco Rodríguez</h4>
              <div className="mb-3">
                <img src={sample} className="img-fluid rounded" alt="Greco Rodríguez" style={{ maxWidth: '200px' }} />
              </div>
              <p>
                Hola como estan no he dormido como en 9 horas, mañana tengo
                examen de probabilidad y algoritmos, acabo toda mi pagina y ya
                me voy a dormir unas 9 horas que me las merezco completamente
              </p>
            </div>

            {/* --- Carlos Borjas --- */}
            <div className="col-md-6 nosotros-section">
              <h4>Carlos Borjas</h4>
              <div className="mb-3">
                <img src={sample} className="img-fluid rounded" alt="Carlos Borjas" style={{ maxWidth: '200px' }} />
              </div>
              <p>Borjas mi amigo borjas el mejor diseñando cosas curiosas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
