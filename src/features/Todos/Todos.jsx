import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Protected from '/src/components/Protected';
import DeleteModal from '/src/components/DeleteModal';
import {
  selectTodoList,
  loadTodos,
  loadListComplete,
  deleteTodo,
} from '/src/redux/actions/listActions';
import { setError } from '/src/redux/reducers/listReducer';
import TodoModal from './TodoModal';
import Todo from './Todo';

const Todos = () => {
  let { listId } = useParams();
  listId = parseInt(listId);
  const dispatch = useDispatch();
  const list = useSelector(selectTodoList(listId));
  const [showModal, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleDelete = useCallback((todo) => {
    setCurrent(todo);
    setShowDelete(true);
  }, []);

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
    dispatch(deleteTodo({ listId, todoId: current.id })).then((result) => {
      if (!result.error) {
        closeDelete();
      }
    });
  };

  const openModal = () => {
    setShow(true);
  };

  const openEdit = useCallback((todo) => {
    setCurrent(todo);
    openModal();
  }, []);

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
              {todo && (
                <Todo
                  todo={todo}
                  handleDelete={handleDelete}
                  openEdit={openEdit}
                  listId={listId}
                />
              )}
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
