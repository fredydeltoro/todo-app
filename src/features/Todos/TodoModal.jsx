import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from '/src/components/Modal';
import { createTodo } from '/src/redux/actions/listActions';

const TodoModal = ({ show, handleClose }) => {
  const { error, loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  let { listId } = useParams();
  listId = parseInt(listId);
  const [body, setBody] = useState({
    name: '',
    description: '',
  });

  const onChange = (e) => {
    const { value, id } = e.target;

    setBody({
      ...body,
      [id]: value,
    });
  };

  const create = () => {
    dispatch(createTodo(listId, body)).then((result) => {
      if (!result.error) {
        handleClose();
      }
    });
  };

  return (
    <Modal
      show={show}
      title="Create Todo"
      handleClose={handleClose}
      handleAccept={create}
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
