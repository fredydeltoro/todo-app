import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Protected from '/src/components/Protected';
import DeleteModal from '/src/components/DeleteModal';
import Menu from '/src/components/Menu';
import {
  selectTodoList,
  loadTodos,
  loadListComplete,
  patchTodo,
  deleteTodo,
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
  const [showDelete, setShowDelete] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleCheck = (todo, checked) => {
    dispatch(patchTodo(listId, todo.id, { status: checked }));
  };

  const handleDelete = (todo) => {
    setCurrent(todo);
    setShowDelete(true);
  };

  const closeDelete = () => {
    setCurrent(null);
    setShowDelete(false);
  };

  const handleClose = () => {
    setShow(false);
    setCurrent(null);
    dispatch(setError(null));
  };

  const confirmDelete = () => {
    dispatch(deleteTodo(listId, current.id)).then((result) => {
      if (!result.error) {
        closeDelete();
      }
    });
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

              <Menu
                style={{ marginTop: 5 }}
                handleEdit={openEdit}
                handleDelete={handleDelete}
                element={todo}
              />

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
      <DeleteModal
        show={showDelete}
        message={`Are you sure you want to delete todo: ${current?.name}?`}
        handleClose={closeDelete}
        handleConf={confirmDelete}
      />
    </div>
  );
};

const ProtectedComponent = (props) => (
  <Protected>
    <Todos {...props} />
  </Protected>
);

export default ProtectedComponent;
