import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

export default function Modal({
  children,
  title,
  saveLabel,
  show,
  handleAccept = () => {},
  handleClose = () => {},
  loading,
}) {
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const accept = (e) => {
    handleAccept();
  };

  const onClose = () => {
    handleClose();
  };

  useEffect(() => {
    if (show) {
      setShowBack(show);
      setTimeout(() => {
        setShowModal(show);
      }, 300);
    } else {
      setShowModal(show);
      setTimeout(() => {
        setShowBack(show);
      }, 300);
    }
  }, [show]);

  return (
    <>
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        ref={ref}
        style={{ display: showBack ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              {children}
              {loading && (
                <div
                  className={`spinner-border text-primary ${styles.loading}`}
                  role="status"
                ></div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={accept}
              >
                {saveLabel ? saveLabel : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showBack ? 'show' : ''}`}
        style={{ display: showBack ? 'block' : 'none' }}
      ></div>
    </>
  );
}
