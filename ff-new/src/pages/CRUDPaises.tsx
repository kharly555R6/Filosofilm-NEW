import React, { useState, useEffect } from "react";

const CRUDPaises: React.FC = () => {
  const [nombrePais, setNombrePais] = useState("");
  const [paises, setPaises] = useState<string[]>([]);
  const [modoEditar, setModoEditar] = useState(false);
  const [paisSeleccionado, setPaisSeleccionado] = useState<number | null>(null);

  // Simulación de carga inicial (puedes reemplazar con fetch a tu backend)
  useEffect(() => {
    const paisesIniciales = ["México", "España", "Argentina"];
    setPaises(paisesIniciales);
  }, []);

  const agregarPais = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombrePais.trim()) return;
    if (modoEditar && paisSeleccionado !== null) {
      const nuevosPaises = [...paises];
      nuevosPaises[paisSeleccionado] = nombrePais;
      setPaises(nuevosPaises);
      setModoEditar(false);
      setPaisSeleccionado(null);
    } else {
      setPaises([...paises, nombrePais]);
    }
    setNombrePais("");
  };

  const editarPais = (index: number) => {
    setModoEditar(true);
    setPaisSeleccionado(index);
    setNombrePais(paises[index]);
  };

  const eliminarPais = (index: number) => {
    setPaises(paises.filter((_, i) => i !== index));
  };

  return (
    <div className="container my-5">
      {/* Logo */}
      <div className="row text-center">
        <div className="col p-5">
          <div className="p-2">
            <img id="LogoFilosofilm" src="img/logo.png" className="img-fluid" alt="Logo Filosofilm" />
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="container my-5 bg-warning p-4 rounded">
        <h1 className="text-center mb-4">
          <strong>CRUD de Países</strong>
        </h1>

        <form onSubmit={agregarPais}>
          <div className="form-group">
            <label htmlFor="nombrePais" className="form-label">
              Nombre del País
            </label>
            <input
              type="text"
              className="form-control"
              id="nombrePais"
              value={nombrePais}
              onChange={(e) => setNombrePais(e.target.value)}
              placeholder="Ingrese el nombre del país"
            />
          </div>

          <div className="form-group text-center mt-3">
            <button type="submit" className="btn btn-secondary mr-2">
              {modoEditar ? "Actualizar" : "Agregar"}
            </button>
            {modoEditar && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setModoEditar(false);
                  setNombrePais("");
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <hr />
        <h2 className="text-center">Países</h2>

        <div className="row mt-3" id="ListadePaises">
          {paises.length === 0 ? (
            <p className="text-center w-100 text-muted">No hay países registrados</p>
          ) : (
            paises.map((pais, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">{pais}</h5>
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => editarPais(index)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarPais(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Botón volver */}
      <div className="d-flex justify-content-center align-items-center">
        <a href="/Admin" className="btn btn-secondary mb-3">
          Ir a Pantalla Admin
        </a>
      </div>
    </div>
  );
};

export default CRUDPaises;
