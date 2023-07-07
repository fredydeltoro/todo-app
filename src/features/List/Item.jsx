import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '/src/components/Menu';

const Item = ({ handleEdit, handleDelete, list }) => {
  return (
    <>
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
    </>
  );
};

export default React.memo(Item);
