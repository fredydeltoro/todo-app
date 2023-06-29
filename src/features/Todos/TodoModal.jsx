import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '/src/components/Modal';

const TodoModal = ({ show, handleClose }) => {
  const { error, loading } = useSelector((state) => state.todos);
  const [body, setBody] = useState({});

  const onChange = (e) => {
    const { value, id } = e.target.id;

    setBody({
      ...body,
      [id]: value,
    });
  };

  return (
    <Modal
      show={show}
      title="Create Todo"
      handleClose={handleClose}
      loading={loading}
    >
      <form>
        {error &&
          error.errors.map((err, index) => (
            <div className="alert alert-danger" role="alert" key={index}>
              {err}
            </div>
          ))}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={body.name}
            disabled={loading}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={body.description}
            disabled={loading}
            onChange={onChange}
          />
        </div>
      </form>
    </Modal>
  );
};

export default TodoModal;
