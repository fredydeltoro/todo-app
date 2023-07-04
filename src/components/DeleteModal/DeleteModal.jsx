import React from 'react';
import Modal from '../Modal';

const title = (
  <div className="link-warning">
    <i className="fa fa-exclamation-circle"></i> Wait
  </div>
);

export default function DeleteModal({
  show,
  message,
  handleClose,
  handleConf,
}) {
  return (
    <Modal
      handleAccept={handleConf}
      handleClose={handleClose}
      show={show}
      title={title}
      acceptLabel="Confirm"
      closeLabel="Cancel"
    >
      {message}
    </Modal>
  );
}
