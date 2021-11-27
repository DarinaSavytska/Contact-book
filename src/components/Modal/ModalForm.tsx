import React from "react";
import { User } from "../../react-app-env";
import './ModalForm.scss';

type Props = {
  setModalUnvisible: () => void,
  addUser: (user: User) => void,
  users: User[],
};

type State = {
  userName: string,
  userId: string,
  email: string,
  number: string,
  username: string,
  website: string,
};


export class ModalForm extends React.Component<Props, State> {
  state: State = {
    userName: '',
    userId: '',
    email: '',
    number: '',
    username: '',
    website: '',
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

  handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleInputNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      number: event.target.value,
    });
  };

  handleInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleInputWebsite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      website: event.target.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.setModalUnvisible();

    const {
      userName,
      userId,
      email,
      number,
      username,
      website,
    } = this.state;

    const newUser = {
      name: userName,
      id: userId,
      username,
      email,
      phone: number,
      website,
    };

    this.props.addUser(newUser);
  };

  render() {
    const { setModalUnvisible } = this.props;
    const {
      userName,
      userId,
      email,
      number,
      username,
      website,
    } = this.state;

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
            <div className="modal__form-input">
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

              E-mail:
              {' '}
              <input
                type="email"
                placeholder="email@mail.com"
                value={email}
                onChange={this.handleInputEmail}
              />

              Number:
              {' '}
              <input
                type="number"
                placeholder="+XX-XXX-XX-XX"
                value={number}
                onChange={this.handleInputNumber}
              />

              Username:
              {' '}
              <input
                type="text"
                placeholder="login"
                value={username}
                onChange={this.handleInputUsername}
              />

              Website:
              {' '}
              <input
                type="text"
                placeholder="site"
                value={website}
                onChange={this.handleInputWebsite}
              />
            </div>

            <div className="modal__content-button">
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}
