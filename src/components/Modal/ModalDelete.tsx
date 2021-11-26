import React from "react";
import './Modal.scss';

type Props = {
  modaleVisibleDelete: () => void,
  deleteUser: () => void,
}

const Modal: React.FC<Props> = ({ modaleVisibleDelete, deleteUser }) => {
  const buttonYes = () => {
    deleteUser();
  };

  const buttonNo = () => {
    modaleVisibleDelete();
  };

  return (
    <div
      className='modal'
      onClick={modaleVisibleDelete}
    >
      <div
        className="modal__content"
        onClick={el => el.stopPropagation()}
      >

        <p>
          Are you sure?
        </p>

        <button
          className="button"
          type="button"
          onClick={buttonYes}
        >
          Yes
        </button>

        <button
          className="button"
          type="button"
          onClick={buttonNo}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Modal;
