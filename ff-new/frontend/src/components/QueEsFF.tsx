import React from "react";
import cine from '../assets/img/cine.jpg';
import logo from '../assets/img/logo.png';
import '../styles/Components/QueEsFF.css';

const QueEsFF: React.FC = () => {
  return (
    <div>

      <div className="container fondoLogo">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="h1QueEsFF">Información sobre la página</h1>
            <br /><br />
            <p>
              Bienvenido a Filosofilm, un espacio cinematográfico donde la pasión por el cine se combina con la
              profundidad de las críticas. Filosofilm es un sitio en donde cada película es una oportunidad para
              expandir horizontes y sumergirse en la maravilla del cine.
              <br /><br />
              Surgimos de la convicción de que las películas no solo entretienen, sino que también nos invitan a
              reflexionar sobre la vida, la sociedad y la condición humana. En Filosofilm, nos dedicamos a explorar
              el arte del cine de una manera que va más allá de la superficie, desentrañando las capas narrativas y
              artísticas para ofrecer reseñas que te invitan a pensar.
              <br /><br />
              Nuestro equipo, compuesto por apasionados amantes del cine, aporta una diversidad de enfoques y
              experiencias que enriquecen nuestra misión colectiva. Valoramos la multiplicidad de voces y celebramos
              la magia que se encuentra en cada película, independientemente de su género, época o estilo.
              <br /><br />
              Además, nos enorgullece ser un espacio inclusivo que fomenta la creatividad y aprecia la expresión
              artística en todas sus formas. Adéntrate con nosotros en este fascinante viaje donde la crítica se
              entrelaza con la admiración, el aprendizaje y la comprensión profunda del séptimo arte. Descubre el
              poder transformador de cada historia, la habilidad del cine para conmover y cuestionar, y únete a
              una comunidad que comparte la fascinación por la riqueza y diversidad del universo cinematográfico.
              <br /><br />
              ¡Sé parte de nosotros en este viaje donde la crítica se encuentra con la admiración, el aprendizaje
              y descubre el poder transformador del séptimo arte!
            </p>

            <div className="container">
              <h1 className="h1QueEsFF">Nuestro Logo</h1>
              <div className="text-center">
                <img src={logo} alt="Logo Filosofilm" className="Logo img-fluid my-6" />
              </div>
              <br /><br />
              <p>
                El logo representa el nombre de nuestra idea y fue diseñado con cuidado y estilo. 
                Busca transmitir de manera sencilla la identidad de Filosofilm, mostrando desde el primer vistazo que 
                somos un espacio dedicado al cine con una perspectiva reflexiva. Es un símbolo que identifica nuestro 
                proyecto y ayuda a que pueda recordarse quiénes somos. Su diseño inspirado en el nombre pretende transmitir la pasión 
                por las películas y en compartir una experiencia cinematográfica que invita a pensar y disfrutar del arte del cine.
              </p>
            </div>
          </div>
        </div>
      </div>

      <br /><br />

      <div className="container text-center">
        <img src={cine} alt="Cine" className="img-fluid imgQueEsFF" />
      </div>

      <div className="container">
        <h1>"Una ventana a la reflexión cinematográfica"</h1>
      </div>
    </div>
  );
};

export default QueEsFF;
