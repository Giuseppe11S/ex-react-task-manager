import { useEffect } from "react"
import ReactDOM from "react-dom"

export default function Modal({title, content, show, onClose, onConfirm, confirmText = 'Conferma' }) {
  
    const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };

  const modalStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px"
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px"
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if(e.key === "Escape") {
        onClose()
      }
    };
    if(show) {
      window.addEventListener("keydown", handleEsc)
    }
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  },[show, onClose]);

  if(!show) return null;


  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>

        <div style={{ margin: "15px 0" }}>
          {content}
        </div>

        <div style={buttonContainerStyle}>
          <button onClick={onClose}>
            Annulla
          </button>

          <button onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}