import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from '/src/components/Modal';
import { createTodo, patchTodo } from '/src/redux/actions/listActions';

const defaultState = {
  name: '',
  description: '',
};

const TodoModal = ({ show, handleClose, todo }) => {
  const { error, loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  let { listId } = useParams();
  listId = parseInt(listId);
  const [body, setBody] = useState({ ...defaultState });

  const onChange = (e) => {
    const { value, id } = e.target;

    setBody({
      ...body,
      [id]: value,
    });
  };

  const handleAccept = () => {
    if (!todo) {
      dispatch(createTodo(listId, body)).then((result) => {
        if (!result.error) {
          handleClose();
          setBody({ ...defaultState });
        }
      });
    } else {
      dispatch(patchTodo(listId, todo.id, body)).then((result) => {
        if (!result.error) {
          handleClose();
        }
      });
    }
  };

  useEffect(() => {
    if (todo) {
      setBody({
        name: todo.name,
        description: todo.description,
      });
    } else {
      setBody({ ...defaultState });
    }
  }, [todo]);

  return (
    <Modal
      show={show}
      title="Create Todo"
      handleClose={handleClose}
      handleAccept={handleAccept}
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
