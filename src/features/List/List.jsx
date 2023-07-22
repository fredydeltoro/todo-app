import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Protected from '/src/components/Protected';
import DeleteModal from '/src/components/DeleteModal';
import {
  setError,
  loadLists,
  selectLists,
  deleteList,
} from '/src/redux/reducers/listReducer';
import ListModal from './ListModal';
import Item from './Item';

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

  const handleEdit = useCallback((list) => {
    setCurrentList(list);
    setShow(true);
  }, []);

  const closeDelete = () => {
    setShowDelete(false);
    setCurrentList(null);
  };

  const handleDelete = useCallback((list) => {
    setCurrentList(list);
    setShowDelete(true);
  }, []);

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
              <Item
                list={list}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
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
