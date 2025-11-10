import React, { useState } from "react";

interface ModalResenasProps {
  show: boolean;
  onClose: () => void;
  onGuardar: (calificacion: number, contenido: string) => void;
}

const ModalResenas: React.FC<ModalResenasProps> = ({ show, onClose, onGuardar }) => {
  const [calificacion, setCalificacion] = useState(5);
  const [contenido, setContenido] = useState("");

  const handleGuardar = () => {
    onGuardar(calificacion, contenido);
    setContenido(""); // limpiar el textarea
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} aria-modal="true" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Hacer Reseña</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form id="formResena">
              <div className="mb-3">
                <label htmlFor="calificacion" className="form-label">
                  Calificación
                </label>
                <select
                  className="form-select"
                  id="calificacion"
                  value={calificacion}
                  onChange={(e) => setCalificacion(Number(e.target.value))}
                >
                  <option value={1}>1 estrella</option>
                  <option value={2}>2 estrellas</option>
                  <option value={3}>3 estrellas</option>
                  <option value={4}>4 estrellas</option>
                  <option value={5}>5 estrellas</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="contenidoResena" className="form-label">
                  Contenido de la reseña
                </label>
                <textarea
                  className="form-control"
                  id="contenidoResena"
                  rows={4}
                  placeholder="Escribe tu reseña aquí"
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleGuardar();
                onClose();
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalResenas;
