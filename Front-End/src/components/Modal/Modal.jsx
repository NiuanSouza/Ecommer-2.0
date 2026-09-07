import React from "react";
import "./Modal.css";

function Modal({ config, onClose }) {
  // Se o hook diz que não está aberto, não renderiza nada
  if (!config || !config.isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-container ${config.type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <span>{config.type === "success" ? "✅ Sucesso" : "❌ Erro"}</span>
          <button className="close-x" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{config.message}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
