import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import '../styles/Pages/Administrador.css';
import CarruselActores from "../components/CarruselActores";

const CRUDActores: React.FC = () => {

  const [nombreActor, setNombreActor] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [pais, setPais] = useState("");
  const [biografia, setBiografia] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModalModificar, setShowModalModificar] = useState(false);
  const [actorIdModificar, setActorIdModificar] = useState("");
  const [actorData, setActorData] = useState<any>(null);
  const [cargandoActor, setCargandoActor] = useState(false);
  const [errorActor, setErrorActor] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  const [reload, setReload] = useState(0);

  const handleAgregar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nombreActor.trim() === "") return;

    setLoading(true);

    const nuevoActor = {
      nombre: nombreActor,
      fecha_Nacimiento: fechaNacimiento,
      pais_Nacimiento: Number(pais),
      biografia: biografia,
      foto_Actor: urlFoto
    };

    try {
      const response = await fetch("https://localhost:5001/api/Actores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoActor)
      });

      if (!response.ok) {
        console.error("Error al crear actor");
        return;
      }

      setNombreActor("");
      setFechaNacimiento("");
      setPais("");
      setBiografia("");
      setUrlFoto("");

      alert("Actor creado exitosamente");

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }

  };

  const obtenerActor = async () => {
    if (!actorIdModificar) return;

    setCargandoActor(true);
    setErrorActor("");
    setModoEdicion(false);
    setActorData(null);

    try {
      const response = await fetch(`https://localhost:5001/api/Actores/${actorIdModificar}`);
      if (!response.ok) {
        setErrorActor("No se encontró un actor con ese ID.");
        return;
      }

      const data = await response.json();
      setActorData(data);
      setModoEdicion(true);

    } catch (err) {
      setErrorActor("Error al obtener datos del actor.");
    } finally {
      setCargandoActor(false);
    }
  };

  const guardarCambios = async () => {
    if (!actorData || !actorData.iD_Actor) {
      alert("No hay datos del actor para actualizar.");
      return;
    }

    try {
      
      const response = await fetch(`https://localhost:5001/api/Actores/${actorData.iD_Actor}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(actorData)
      });

      if (!response.ok) {
        alert("Error al actualizar actor ❌");
        return;
      }

      alert("Actor actualizado correctamente ✔️");

      setShowModalModificar(false);
      setModoEdicion(false);
      setActorData(null);

    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al actualizar.");
    }
  };

  const eliminarActor = async () => {
    if (!actorData || !actorData.iD_Actor) {
      alert("No hay actor para eliminar.");
      return;
    }

    if (!window.confirm("¿Seguro que deseas eliminar este actor? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const response = await fetch(`https://localhost:5001/api/Actores/${actorData.iD_Actor}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        alert("Error al eliminar actor ❌");
        return;
      }

      alert("Actor eliminado correctamente ✔️");

      setShowModalModificar(false);
      setModoEdicion(false);
      setActorData(null);

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
        <h1 className="text-center mb-4">CRUD de Actores</h1>

        {/* FORMULARIO */}
        <form onSubmit={handleAgregar}>
          <div className="form-group">
            <label htmlFor="nombreActor">Nombre del Actor</label>
            <input
              type="text"
              className="form-control"
              id="nombreActor"
              placeholder="Ingrese el nombre"
              value={nombreActor}
              onChange={(e) => setNombreActor(e.target.value)}
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
          <h1 className="text-light DG RepartoH2">Actores disponibles</h1>
        </div>

        <div className="container text-center">
          <CarruselActores key={reload} endpoint={`https://localhost:5001/api/Actores`} />
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
                      setActorData(null);
                    }}
                  ></button>
                </div>

                <div className="modal-body">

                  {!modoEdicion && (
                    <>
                      <label>ID del actor a modificar:</label>
                      <input
                        type="number"
                        className="form-control mb-3"
                        value={actorIdModificar}
                        onChange={(e) => setActorIdModificar(e.target.value)}
                      />

                      {errorActor && (
                        <p className="text-danger fw-bold">{errorActor}</p>
                      )}

                      {cargandoActor && (
                        <p className="text-primary">Cargando datos...</p>
                      )}
                    </>
                  )}

                  {modoEdicion && actorData && (
                    <>
                      <label>Nombre:</label>
                      <input
                        className="form-control mb-2"
                        value={actorData.nombre}
                        onChange={(e) =>
                          setActorData({ ...actorData, nombre: e.target.value })
                        }
                      />

                      <label>Fecha de Nacimiento:</label>
                      <input
                        type="date"
                        className="form-control mb-2"
                        value={actorData.fecha_Nacimiento?.split("T")[0]}
                        onChange={(e) =>
                          setActorData({ ...actorData, fecha_Nacimiento: e.target.value })
                        }
                      />

                      <label>País de Nacimiento:</label>
                      <input
                        type="number"
                        className="form-control mb-2"
                        value={actorData.pais_Nacimiento}
                        onChange={(e) =>
                          setActorData({ ...actorData, pais_Nacimiento: Number(e.target.value) })
                        }
                      />

                      <label>Biografía:</label>
                      <textarea
                        className="form-control mb-2"
                        rows={3}
                        value={actorData.biografia}
                        onChange={(e) =>
                          setActorData({ ...actorData, biografia: e.target.value })
                        }
                      />

                      <label>Foto (URL):</label>
                      <input
                        className="form-control mb-2"
                        value={actorData.foto_Actor}
                        onChange={(e) =>
                          setActorData({ ...actorData, foto_Actor: e.target.value })
                        }
                      />

                      <div className="text-center mt-3">
                        <img
                          src={actorData.foto_Actor}
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
                    <button className="btn btn-primary" onClick={obtenerActor}>
                      Continuar
                    </button>
                  )}

                  {modoEdicion && (
                    <button className="btn btn-success" onClick={() => {guardarCambios(); setReload(reload + 1);}}>
                      Guardar Cambios
                    </button>
                    
                  )}

                  {modoEdicion && (
                    <button className="btn btn-danger" onClick={() => {eliminarActor(); setReload(prev => prev + 1);}}>
                      Eliminar Actor
                    </button>
                  )}

                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      setShowModalModificar(false);
                      setModoEdicion(false);
                      setActorData(null);
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

export default CRUDActores;
