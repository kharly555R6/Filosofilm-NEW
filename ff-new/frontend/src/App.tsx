import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas
import Administrador from './pages/Administrador';
import Configuracion from './pages/Configuracion';
import CRUDActores from './pages/CRUDActores';
import CRUDDirectores from './pages/CRUDDirectores';
import CRUDPaises from './pages/CRUDPaises';
import CRUDPeliculas from './pages/CRUDPeliculas';
import CRUDUsuarios from './pages/CRUDUsuarios';
import IndexPage from './pages/IndexPage';
import InicioDelUsuario from './pages/InicioDelUsuario';
import InicioPelicula from './pages/InicioPelicula';
import MiInformacion from './pages/MiInformacion';
import MisLikes from './pages/MisLikes';
import MisResenas from './pages/MisResenas';
import Moderador from './pages/Moderador';
import Perfil from './pages/Perfil';
import PropuestasDeCambio from './pages/PropuestasDeCambio';

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<IndexPage />} />

          {/* Rutas del administrador */}
          <Route path="/Administrador" element={<Administrador />} />
          <Route path="/Configuracion" element={<Configuracion />} />
          <Route path="/CRUDActores" element={<CRUDActores />} />
          <Route path="/CRUDDirectores" element={<CRUDDirectores />} />
          <Route path="/CRUDPaises" element={<CRUDPaises />} />
          <Route path="/CRUDPeliculas" element={<CRUDPeliculas />} />
          <Route path="/CRUDUsuarios" element={<CRUDUsuarios />} />

          {/* Rutas del usuario */}
          <Route path="/InicioDelUsuario" element={<InicioDelUsuario />} />

          {/* 🔹 Ruta dinámica para mostrar película por ID */}
          <Route path="/InicioPelicula/:id" element={<InicioPelicula />} />
          
          <Route path="/InicioPelicula" element={<InicioPelicula />} />
          <Route path="/MiInformacion" element={<MiInformacion />} />
          <Route path="/MisLikes" element={<MisLikes />} />
          <Route path="/MisResenas" element={<MisResenas />} />
          <Route path="/Moderador" element={<Moderador />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/PropuestasDeCambio" element={<PropuestasDeCambio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
