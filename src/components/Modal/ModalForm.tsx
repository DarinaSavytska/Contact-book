import React from "react";
import { User } from "../../react-app-env";
import './Modal.scss';

type Props = {
  setModalUnvisible: () => void,
  addUser: (user: User) => void,
  users: User[],
};

type State = {
  userName: string,
  userId: string,
};


export class ModalForm extends React.Component<Props, State> {
  state: State = {
    userName: '',
    userId: '',
  };

  handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      userName: event.target.value,
    });
  };

  handleInputId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      userId: event.target.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.setModalUnvisible();

    const { userName, userId } = this.state;

    const newUser = {
      name: userName,
      id: userId,
    };

    this.props.addUser(newUser);
  };

  render() {
    const { setModalUnvisible } = this.props;
    const { userName, userId } = this.state;

    console.log(this.props.users.length);

    return (
      <div
        className='modal'
        onClick={setModalUnvisible}
      >
        <div
          className="modal__content"
          onClick={el => el.stopPropagation()}
        >
          <form
            className="modal__form"
            onSubmit={this.handleSubmit}
          >
            Name*:
            {' '}
            <input
              type="text"
              placeholder="name"
              required
              value={userName}
              onChange={this.handleInputName}
            />

            User ID*:
            {' '}
            <input
              type="text"
              placeholder="ID"
              required
              value={userId}
              onChange={this.handleInputId}
            />

            <button
              className="button"
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
          </form>
        </div>
      </div>
    );
  }
}
