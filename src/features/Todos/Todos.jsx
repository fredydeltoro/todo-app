import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Protected from '/src/components/Protected';
import {
  selectTodoList,
  loadTodos,
  loadListComplete,
  patchTodo,
  setError,
} from '/src/redux/actions/listActions';
import TodoModal from './TodoModal';
import styles from './todo.module.css';

const Todos = () => {
  let { listId } = useParams();
  listId = parseInt(listId);
  const dispatch = useDispatch();
  const list = useSelector(selectTodoList(listId));
  const [showModal, setShow] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleCheck = (todo, checked) => {
    dispatch(patchTodo(listId, todo.id, { status: checked }));
  };

  const handleClose = () => {
    setShow(false);
    setCurrent(null);
    dispatch(setError(null));
  };

  const openModal = () => {
    setShow(true);
  };

  const openEdit = (todo) => {
    setCurrent(todo);
    openModal();
  };

  useEffect(() => {
    if (list && list.id) {
      dispatch(loadTodos(listId));
    } else {
      dispatch(loadListComplete(listId));
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-8 offset-2">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>{list?.name}</h2>
          <div className="btn btn-success" onClick={openModal}>
            <i className="fa fa-plus"></i> New Todo
          </div>
        </div>

        <hr />

        <ul className="list-group list-group-flush">
          {list?.todos?.map((todo) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={todo?.id}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  <h4>{todo?.name}</h4>
                </div>
                {todo?.description}
              </div>

              <div className={styles.menu}>
                <span className={`${styles.menuBtn} btn btn-outline-danger`}>
                  <i className="fa fa-trash"></i>
                </span>

                <span
                  className={`${styles.menuBtn} btn btn-outline-info`}
                  onClick={() => openEdit(todo)}
                >
                  <i className="fa fa-pencil"></i>
                </span>
              </div>

              <input
                type="checkbox"
                className={`${styles.menuCheck} form-check-input`}
                onChange={(e) => handleCheck(todo, e.target.checked)}
                checked={todo?.status}
                id={todo?.id}
              />
            </li>
          ))}
        </ul>
      </div>
      <TodoModal show={showModal} handleClose={handleClose} todo={current} />
    </div>
  );
};

const ProtectedComponent = (props) => (
  <Protected>
    <Todos {...props} />
  </Protected>
);

export default ProtectedComponent;
