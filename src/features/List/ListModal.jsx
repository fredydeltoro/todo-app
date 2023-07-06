import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '/src/components/Modal';
import { createList, putList } from '/src/redux/actions/listActions';

const defaultState = {
  name: '',
  description: '',
};

const ListModal = ({ show, handleClose, list }) => {
  const { error, loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [body, setBody] = useState({ ...defaultState });

  const onChange = (e) => {
    setBody({
      ...body,
      [e.target.id]: e.target.value,
    });
  };

  const handleAccept = () => {
    if (list) {
      dispatch(putList(list.id, body)).then((result) => {
        if (!result.error) {
          handleClose();
        }
      });
    } else {
      dispatch(createList(body)).then((result) => {
        if (!result.errors) {
          handleClose();
        }
      });
    }
  };

  useEffect(() => {
    if (list) {
      setBody({
        name: list.name,
        description: list.description,
      });
    } else {
      setBody({ ...defaultState });
    }
  }, [list]);

  return (
    <Modal
      show={show}
      title="Create List"
      handleClose={handleClose}
      loading={loading}
      handleAccept={handleAccept}
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

export default ListModal;
