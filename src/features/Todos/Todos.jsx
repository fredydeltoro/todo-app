import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectTodoList,
  loadTodos,
  loadListComplete,
} from '/src/redux/actions/listActions';
import Protected from '/src/components/Protected';

const Todos = () => {
  let { listId } = useParams();
  listId = parseInt(listId);
  const dispatch = useDispatch();
  const list = useSelector(selectTodoList(listId));

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
          <h2>{list.name}</h2>
          <div className="btn btn-success">
            <i className="fa fa-plus"></i> New Todo
          </div>
        </div>

        <hr />

        <ul className="list-group list-group-flush">
          {list.todos?.map((todos) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={list.id}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  <Link to={`/${todos.id}`}>
                    <h4>{todos.name}</h4>
                  </Link>
                </div>
                {todos.description}
              </div>
              {/* <span className="badge bg-primary rounded-pill">
                {list.itemscount}
              </span> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ProtectedComponent = (props) => (
  <Protected>
    <Todos {...props} />
  </Protected>
);

export default ProtectedComponent;
