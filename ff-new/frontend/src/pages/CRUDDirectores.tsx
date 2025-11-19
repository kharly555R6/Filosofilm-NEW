import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import "../styles/Pages/Administrador.css";
import CarruselDirectores from "../components/CarruselActores";

const CRUDDirectores: React.FC = () => {
  const [nombreDirector, setNombreDirector] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [pais, setPais] = useState("");
  const [biografia, setBiografia] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal de modificar
  const [showModalModificar, setShowModalModificar] = useState(false);
  const [directorIdModificar, setDirectorIdModificar] = useState("");
  const [directorData, setDirectorData] = useState<any>(null);
  const [cargandoDirector, setCargandoDirector] = useState(false);
  const [errorDirector, setErrorDirector] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  const [reload, setReload] = useState(0);
  
const handleAgregar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nombreDirector.trim() === "") return;

    setLoading(true);

    const nuevoDirector = {
      nombre: nombreDirector,
      fecha_Nacimiento: fechaNacimiento,
      pais_Nacimiento: Number(pais),
      biografia: biografia,
      foto_Director: urlFoto
    };

    try {
      const response = await fetch("https://localhost:5001/api/Directores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoDirector)
      });

      if (!response.ok) {
        console.error("Error al crear director");
        return;
      }

      setNombreDirector("");
      setFechaNacimiento("");
      setPais("");
      setBiografia("");
      setUrlFoto("");

      alert("Director creado exitosamente");

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }

  };

  const obtenerDirector = async () => {
    if (!directorIdModificar) return;

    setCargandoDirector(true);
    setErrorDirector("");
    setModoEdicion(false);
    setDirectorData(null);

    try {
      const response = await fetch(`https://localhost:5001/api/Directores/${directorIdModificar}`);
      if (!response.ok) {
        setErrorDirector("No se encontró un director con ese ID.");
        return;
      }

      const data = await response.json();
      setDirectorData(data);
      setModoEdicion(true);

    } catch (err) {
      setErrorDirector("Error al obtener datos del director.");
    } finally {
      setCargandoDirector(false);
    }
  };

  const guardarCambios = async () => {
    if (!directorData || !directorData.iD_Director) {
      alert("No hay datos del director para actualizar.");
      return;
    }

    try {
      const response = await fetch(`https://localhost:5001/api/Directores/${directorData.iD_Director}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(directorData)
      });

      if (!response.ok) {
        alert("Error al actualizar director ❌");
        return;
      }

      alert("Director actualizado correctamente ✔️");

      setShowModalModificar(false);
      setModoEdicion(false);
      setDirectorData(null);

    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al actualizar.");
    }
  };

  const eliminarDirector = async () => {
    if (!directorData || !directorData.iD_Director) {
      alert("No hay director para eliminar.");
      return;
    }

    if (!window.confirm("¿Seguro que deseas eliminar este actor? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const response = await fetch(`https://localhost:5001/api/Directores/${directorData.iD_Director}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        alert("Error al eliminar director ❌");
        return;
      }

      alert("Director eliminado correctamente ✔️");

      setShowModalModificar(false);
      setModoEdicion(false);
      setDirectorData(null);

    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al eliminar.");
    }
  };

  return (
    <div>
      <div className="container adminPageBody">
        <div className="row text-center">
          <div className="col p-3">
            <div className="p-2">
              <img
                id="LogoFilosofilm"
                src={logo}
                alt="Logo Filosofilm"
                className="img-fluid logo-admin"
              />
            </div>
          </div>
        </div>
      </div>

      <br />
      <hr />
      <br />

      <div className="container bg-warning p-4 rounded">
        <h1 className="text-center mb-4">CRUD de Directores</h1>

        {/* FORMULARIO */}
        <form onSubmit={handleAgregar}>
          <div className="form-group">
            <label htmlFor="nombreDirector">Nombre del Director</label>
            <input
              type="text"
              className="form-control"
              id="nombreDirector"
              placeholder="Ingrese el nombre"
              value={nombreDirector}
              onChange={(e) => setNombreDirector(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="selectPais">País de Origen:</label>
            <select
              className="form-control"
              id="selectPais"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            >
              <option value="">Seleccione un país</option>
              <option value="1">México</option>
              <option value="2">Estados Unidos</option>
              <option value="3">Japón</option>
              <option value="4">Reino Unido</option>
              <option value="5">Canadá</option>
              <option value="6">Australia</option>
              <option value="7">Francia</option>
              <option value="8">Alemania</option>
              <option value="9">Italia</option>
              <option value="10">España</option>
              <option value="11">India</option>
              <option value="12">Brasil</option>
              <option value="13">Argentina</option>
              <option value="14">Suecia</option>
              <option value="15">China</option>
              <option value="16">Rusia</option>
              <option value="17">Noruega</option>
              <option value="18">Países Bajos</option>
              <option value="19">Irlanda</option>
              <option value="20">Bélgica</option>
              <option value="21">Suiza</option>
              <option value="22">Nueva Zelanda</option>
              <option value="23">Corea del Sur</option>
              <option value="24">Turquía</option>
              <option value="25">Polonia</option>
              <option value="26">Grecia</option>
              <option value="27">Dinamarca</option>
              <option value="28">Finlandia</option>
              <option value="29">Portugal</option>
              <option value="30">Hungría</option>
              <option value="31">Chile</option>
              <option value="32">Colombia</option>
              <option value="33">Perú</option>
              <option value="34">Venezuela</option>
              <option value="35">Egipto</option>
              <option value="36">Sudáfrica</option>
              <option value="37">Nigeria</option>
              <option value="38">Pakistán</option>
              <option value="39">Tailandia</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="biografia">Biografía</label>
            <textarea
              className="form-control"
              id="biografia"
              rows={3}
              placeholder="Ingrese la biografía"
              value={biografia}
              onChange={(e) => setBiografia(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="urlFoto">Url de la foto</label>
            <input
              type="text"
              className="form-control"
              id="urlFoto"
              placeholder="Ingrese la URL de la foto"
              value={urlFoto}
              onChange={(e) => setUrlFoto(e.target.value)}
            />
          </div>

          <div className="form-group text-center">
            <button
              type="submit"
              disabled={loading}
              className="crudBtn mb-3 text-center"
            >
              {loading ? "Guardando..." : "AGREGAR"}
            </button>
          </div>
        </form>

        <hr />

        <div className="text-center">
          <h1 className="text-light DG RepartoH2">Directores disponibles</h1>
        </div>

        <div className="container text-center">
          <CarruselDirectores key={reload} endpoint={`https://localhost:5001/api/Directores`} />
        </div>

        {/* BOTONES MODALES */}
        <div className="text-center col-12">
          <button
            className="crudBtn mb-3 text-center"
            onClick={() => setShowModalModificar(true)}
          >
            MODIFICAR
          </button>
        </div>

        {showModalModificar && (
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">
                    {modoEdicion ? "Editar Actor" : "Modificar Actor"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                    onClick={() => {
                      setShowModalModificar(false);
                      setModoEdicion(false);
                      setDirectorData(null);
                    }}
                  ></button>
                </div>

                <div className="modal-body">

                  {!modoEdicion && (
                    <>
                      <label>ID del director a modificar:</label>
                      <input
                        type="number"
                        className="form-control mb-3"
                        value={directorIdModificar}
                        onChange={(e) => setDirectorIdModificar(e.target.value)}
                      />

                      {errorDirector && (
                        <p className="text-danger fw-bold">{errorDirector}</p>
                      )}

                      {cargandoDirector && (
                        <p className="text-primary">Cargando datos...</p>
                      )}
                    </>
                  )}

                  {modoEdicion && directorData && (
                    <>
                      <label>Nombre:</label>
                      <input
                        className="form-control mb-2"
                        value={directorData.nombre}
                        onChange={(e) =>
                          setDirectorData({ ...directorData, nombre: e.target.value })
                        }
                      />

                      <label>Fecha de Nacimiento:</label>
                      <input
                        type="date"
                        className="form-control mb-2"
                        value={directorData.fecha_Nacimiento?.split("T")[0]}
                        onChange={(e) =>
                          setDirectorData({ ...directorData, fecha_Nacimiento: e.target.value })
                        }
                      />

                      <label>País de Nacimiento:</label>
                      <input
                        type="number"
                        className="form-control mb-2"
                        value={directorData.pais_Nacimiento}
                        onChange={(e) =>
                          setDirectorData({ ...directorData, pais_Nacimiento: Number(e.target.value) })
                        }
                      />

                      <label>Biografía:</label>
                      <textarea
                        className="form-control mb-2"
                        rows={3}
                        value={directorData.biografia}
                        onChange={(e) =>
                          setDirectorData({ ...directorData, biografia: e.target.value })
                        }
                      />

                      <label>Foto (URL):</label>
                      <input
                        className="form-control mb-2"
                        value={directorData.foto_Director}
                        onChange={(e) =>
                          setDirectorData({ ...directorData, foto_Director: e.target.value })
                        }
                      />

                      <div className="text-center mt-3">
                        <img
                          src={directorData.foto_Director}
                          alt="Foto"
                          className="img-fluid rounded"
                          style={{ maxHeight: "180px" }}
                        />
                      </div>
                    </>
                  )}

                </div>

                <div className="modal-footer">

                  {!modoEdicion && (
                    <button className="btn btn-primary" onClick={obtenerDirector}>
                      Continuar
                    </button>
                  )}

                  {modoEdicion && (
                    <button className="btn btn-success" onClick={() => {guardarCambios(); setReload(reload + 1);}}>
                      Guardar Cambios
                    </button>
                    
                  )}

                  {modoEdicion && (
                    <button className="btn btn-danger" onClick={() => {eliminarDirector(); setReload(prev => prev + 1);}}>
                      Eliminar Director
                    </button>
                  )}

                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      setShowModalModificar(false);
                      setModoEdicion(false);
                      setDirectorData(null);
                    }}
                  >
                    Cerrar
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        <div className="col-12 text-center mt-4">
          <a
            href="Administrador"
            className="crudBtn mb-3 text-center"
          >
            REGRESAR
          </a>
        </div>

      </div>
    </div>
  );
};

export default CRUDDirectores;