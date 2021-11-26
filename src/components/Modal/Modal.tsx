import React, { useState } from "react";
import { User } from "../../react-app-env";
import './Modal.scss';

type Props = {
  visible: boolean,
  setModalUnvisible: () => void,
  addUser: (person: User) => void,
  deleteUser: () => void,
}

const Modal: React.FC<Props> = ({ visible, setModalUnvisible, addUser, deleteUser }) => {
  // const [userName, setUserName] = useState('');
  // const [userId, setUserId] = useState('');
  // const [person, setPerson] = useState({} as User);

  // const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserName(event.target.value);
  // };

  // const handleInputId = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserId(event.target.value);
  // };

  const buttonYes = () => {
    deleteUser();
  };

  const buttonNo = () => {
    setModalUnvisible();
  };

  return (
    <div
      className='modal'
      onClick={setModalUnvisible}
    >
      <div
        className="modal__content"
        onClick={el => el.stopPropagation()}
      >
        {/* <form
          className="modal__form"
          onSubmit={(event) => {
            event.preventDefault();
            addUser(person);
            setUserName('');
            setModalUnvisible();
          }}
        >
          Name*:
          {' '}
          <input
            type="text"
            placeholder="name"
            required
            value={userName}
            onChange={handleInputName}
          />

          User ID*:
          {' '}
          <input
            type="text"
            placeholder="ID"
            required
            value={userId}
            onChange={handleInputId}
          />

          <button
            className="button"
            type="submit"
          >
            Add User
          </button>

          <button
            className="button"
            type="button"
            onClick={setModalUnvisible}
          >
            Cancel
          </button>
        </form> */}

        <p>
          Are yoy shure?
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
