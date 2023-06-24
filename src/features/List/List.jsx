import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLists } from '/src/redux/actions/listActions';
import Protected from '/src/components/Protected';
import ListModal from './ListModal';
import { setError } from '/src/redux/actions/listActions';

const List = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.todos?.lists);
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    dispatch(setError(null));
  };

  useEffect(() => {
    dispatch(loadLists());
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
          <h2>Lists</h2>
          <div className="btn btn-success" onClick={showModal}>
            <i className="fa fa-plus"></i> New List
          </div>
        </div>

        <hr />

        <ul className="list-group list-group-flush">
          {lists.map((list) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={list.id}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  <h4>{list.name}</h4>
                </div>
                {list.description}
              </div>
              <span className="badge bg-primary rounded-pill">14</span>
            </li>
          ))}
        </ul>
      </div>
      <ListModal show={show} title="Create List" handleClose={handleClose} />
    </div>
  );
};

const ProtectedComponent = (props) => (
  <Protected>
    <List {...props} />
  </Protected>
);

export default ProtectedComponent;
