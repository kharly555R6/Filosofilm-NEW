import React from "react";
import '../styles/Components/Nosotros.css';
import sample from '../assets/img/EH.webp';

const Nosotros: React.FC = () => {
  return (
    <div className="nosotros-container">
      <div className="nosotros-content">
        <h1 className="nosotros-title text-center">¡Conoce al equipo de Filosofilm!</h1>

        <div className="container">
          <div className="row">
            {/* --- Greco Rodríguez --- */}
            <div className="col-md-5 nosotros-section ">
              <h4 className="text-center">Greco Rodríguez</h4>
              <div className="mb-3 text-center">
                <img src={sample} className="img-fluid rounded imgNosotros" alt="Greco Rodríguez" style={{ maxWidth: '200px' }} />
              </div>
              <p className="justityText">
                Hola como estan no he dormido como en 9 horas, mañana tengo
                examen de probabilidad y algoritmos, acabo toda mi pagina y ya
                me voy a dormir unas 9 horas que me las merezco completamente. <br /><br />
                ACTUALIZACION: PASAMOS PWEB GRACIAS A GRECO ASI QUE DEJARE ESTO
                COMO RECUERDO.
              </p>
            </div>

            <div className="col-2"></div>

            {/* --- Carlos Borjas --- */}
            <div className="col-md-5 nosotros-section">
              <h4 className="text-center">Carlos Borjas</h4>
              <div className="mb-3 text-center">
                <img src={sample} className="img-fluid rounded imgNosotros" alt="Carlos Borjas" style={{ maxWidth: '200px' }} />
              </div>
              <p className="justityText">Borjas mi amigo borjas el mejor diseñando cosas curiosas. <br /><br />
                ACTUALIZACION: ESTOY REDISEÑANDO TODO AAAAAA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
