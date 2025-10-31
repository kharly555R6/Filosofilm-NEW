import React from "react";
import NavbarOut from "../components/NavbarOut";
import cine from '../assets/img/cine.jpg';
import logo from '../assets/img/logo.png';

const QueEsFF: React.FC = () => {
  return (
    <div>
      
      <NavbarOut/>

      {/* Frase principal */}
      <div className="container">
        <h1 id="frase">"Una ventana a la reflexión cinematográfica"</h1>
      </div>

      {/* Imagen principal */}
      <div className="container text-center my-4">
        <img src={cine} alt="Cine" className="img-fluid" />
      </div>

      {/* Sección de información */}
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12 mb-5">
            <h1>Información sobre la página</h1>
            <p>
              Bienvenido a Filosofilm, un espacio cinematográfico donde la pasión por el cine se combina con la
              profundidad de las críticas.
              <br />
              <br />
              Filosofilm es un sitio en donde cada película es una oportunidad para expandir horizontes y sumergirse en
              la maravilla del cine.
              <br />
              <br />
              Surgimos de la convicción de que las películas no solo entretienen, sino que también nos invitan a
              reflexionar sobre la vida, la sociedad y la condición humana. En Filosofilm, nos dedicamos a explorar el
              arte del cine de una manera que va más allá de la superficie, desentrañando las capas narrativas y
              artísticas para ofrecer reseñas que te invitan a pensar.
              <br />
              <br />
              Nuestro equipo, compuesto por apasionados amantes del cine, aporta una diversidad de enfoques y
              experiencias que enriquecen nuestra misión colectiva. Valoramos la multiplicidad de voces y celebramos la
              magia que se encuentra en cada película, independientemente de su género, época o estilo.
              <br />
              <br />
              Además, nos enorgullece ser un espacio inclusivo que fomenta la creatividad y aprecia la expresión
              artística en todas sus formas. Adéntrate con nosotros en este fascinante viaje donde la crítica se
              entrelaza con la admiración, el aprendizaje y la comprensión profunda del séptimo arte. Descubre el poder
              transformador de cada historia, la habilidad del cine para conmover y cuestionar, y únete a una comunidad
              que comparte la fascinación por la riqueza y diversidad del universo cinematográfico.
              <br />
              <br />
              ¡Sé parte de nosotros en este viaje donde la crítica se encuentra con la admiración, el aprendizaje y
              descubre el poder transformador del séptimo arte!
            </p>

            <div className="container mt-5" id="SobreLogo">
              <h1>Nuestro Logo</h1>
              <img src={logo} alt="Logo Filosofilm" className="Logo img-fluid my-3" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi beatae culpa, suscipit quas voluptatem
                debitis praesentium impedit, amet qui, mollitia incidunt nisi explicabo sed ab itaque ea minima. Unde
                magnam ipsa provident ex, vitae quis alias nihil porro, molestias debitis sapiente laborum perspiciatis,
                quibusdam officiis libero! Voluptatem voluptates doloribus possimus.
              </p>
            </div>
          </div>

          {/* Sección de equipo */}
          <div className="col-lg-5 col-md-12">
            <h1>Conoce a nuestro equipo</h1>

            <div className="container my-4">
              <h3>Greco</h3>
              <img className="Integrantes img-fluid" src="img/A.jpg" alt="Greco" />
            </div>

            <div className="container my-4">
              <h3>Carlos</h3>
              <img className="Integrantes img-fluid" src="img/A.jpg" alt="Carlos" />
            </div>

            <div className="container my-4">
              <h3>Karol</h3>
              <img className="Integrantes img-fluid" src="img/A.jpg" alt="Karol" />
            </div>

            <div className="container my-4">
              <h3>Alejandro</h3>
              <img className="Integrantes img-fluid" src="img/A.jpg" alt="Alejandro" />
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
};

export default QueEsFF;
