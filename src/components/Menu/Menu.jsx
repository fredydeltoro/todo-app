import React from 'react';
import styles from './menu.module.css';

const Menu = ({ handleDelete, handleEdit, element, ...props }) => {
  return (
    <div className={styles.menu} {...props}>
      <span
        className={`${styles.menuBtn} btn btn-outline-danger`}
        onClick={() => handleDelete(element)}
      >
        <i className="fa fa-trash"></i>
      </span>

      <span
        className={`${styles.menuBtn} btn btn-outline-info`}
        onClick={() => handleEdit(element)}
      >
        <i className="fa fa-pencil"></i>
      </span>
    </div>
  );
};

export default Menu;
