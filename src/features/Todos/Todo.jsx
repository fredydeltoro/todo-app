import React from 'react';
import { useDispatch } from 'react-redux';
import Menu from '/src/components/Menu';
import { updateTodo } from '/src/redux/actions/listActions';
import styles from './todo.module.css';

const Todo = ({ todo, listId, openEdit, handleDelete }) => {
  const dispatch = useDispatch();

  const handleCheck = (checked) => {
    dispatch(
      updateTodo({ listId, todoId: todo.id, props: { status: checked } }),
    );
  };

  return (
    <>
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          <h4>{todo.name}</h4>
        </div>
        {todo.description}
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
        onChange={(e) => handleCheck(e.target.checked)}
        checked={todo.status}
        id={todo.id}
      />
    </>
  );
};

export default React.memo(Todo);
