import "./Modal.css";

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="Modal__window">
      <div className="Modal__content">
        <button className="Modal__close" onClick={onClose}>
          &times;
        </button>
        {title && <h3 className="Modal__name">{title}</h3>}
        {children}
      </div>
    </div>
  );
};
