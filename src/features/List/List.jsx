import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Protected from '/src/components/Protected';
import Menu from '/src/components/Menu';
import DeleteModal from '/src/components/DeleteModal';
import {
  setError,
  loadLists,
  selectLists,
  deleteList,
} from '/src/redux/actions/listActions';
import ListModal from './ListModal';

const List = () => {
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentList, setCurrentList] = useState(null);
  const showModal = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setCurrentList(null);
    dispatch(setError(null));
  };

  const handleEdit = (list) => {
    setCurrentList(list);
    setShow(true);
  };

  const closeDelete = () => {
    setShowDelete(false);
    setCurrentList(null);
  };

  const handleDelete = (list) => {
    setCurrentList(list);
    setShowDelete(true);
  };

  const confirm = () => {
    dispatch(deleteList(currentList.id)).then((result) => {
      if (!result.error) {
        closeDelete();
      }
    });
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
                  <Link to={`/${list.id}`}>
                    <h4>{list.name}</h4>
                  </Link>
                </div>
                {list.description}
              </div>

              <Menu
                handleEdit={() => handleEdit(list)}
                handleDelete={() => handleDelete(list)}
              />

              <span className="badge bg-primary" style={{ fontSize: 14 }}>
                {list.itemscount}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ListModal
        list={currentList}
        show={show}
        title="Create List"
        handleClose={handleClose}
      />
      <DeleteModal
        show={showDelete}
        message={`Are you sure you want to delete list: ${currentList?.name}?`}
        handleClose={closeDelete}
        handleConf={() => confirm()}
      />
    </div>
  );
};

const ProtectedComponent = (props) => (
  <Protected>
    <List {...props} />
  </Protected>
);

export default ProtectedComponent;
