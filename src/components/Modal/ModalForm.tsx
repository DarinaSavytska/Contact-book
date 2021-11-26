import React from "react";
import './Modal.scss';

type Props = {
  setModalUnvisible: () => void,
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

  render() {
    const { setModalUnvisible } = this.props;
    const { userName, userId } = this.state;

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
            onSubmit={(event) => {
              event.preventDefault();
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
          </form>
        </div>
      </div>
    );
  }
}
