import React from 'react';
import sample from '../assets/sample.svg';

const InicioDelUsuario: React.FC = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div className="container">
        <div className="navbar-nav ml-auto">
          <a className="nav-item nav-link text-white" href="#"><strong>Inicio</strong></a>
          <a className="nav-item nav-link text-white" href="#"><strong>@Usuario</strong></a>
          <a className="nav-item nav-link text-white" href="#"><strong>Cerrar Sesión</strong></a>
        </div>
      </div>
    </nav>

    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Películas</h1>
      <div className="row">
        <div className="col-md-4 text-center">
          <img src={sample} alt="sample" style={{ maxWidth: '100%' }} />
          <h5>Película ejemplo</h5>
        </div>
        <div className="col-md-4 text-center">
          <img src={sample} alt="sample" style={{ maxWidth: '100%' }} />
          <h5>Película ejemplo</h5>
        </div>
        <div className="col-md-4 text-center">
          <img src={sample} alt="sample" style={{ maxWidth: '100%' }} />
          <h5>Película ejemplo</h5>
        </div>
      </div>
    </div>
  </div>
);

export default InicioDelUsuario;
