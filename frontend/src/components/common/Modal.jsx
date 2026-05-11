export default function Modal({ open, title, children, onClose, onConfirm, confirmLabel = "Save" }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(event) => event.stopPropagation()}>
        <h3>{title}</h3>
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          {onConfirm && (
            <button className="btn" onClick={onConfirm}>
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
