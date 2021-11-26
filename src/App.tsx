import React from "react";
import './App.scss';
import './styles/general.scss';
import { CurrentUser } from "./components/CurrentUser/CurrentUser";
import { getAllUsers } from "./api/api";
import { User } from "./react-app-env";
import { UsersList } from "./components/UsersList/UsersList";
import Modal from "./components/Modal/ModalDelete";
import { ModalForm } from "./components/Modal/ModalForm";

interface State {
  selectedUserId: number,
  deleteUserId: number,
  users: User[],
  modaleVisibleDelete: boolean,
  modaleVisibleForm: boolean,
  removeUser: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    deleteUserId: 0,
    users: [],
    modaleVisibleDelete: false,
    modaleVisibleForm: false,
    removeUser: false,
  }

  async componentDidMount() {
    const users = await getAllUsers();

    this.setState({ users });
  }

  unselectUser = () => {
    this.setState({
      selectedUserId: 0,
    })
  };

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId })
  };

  deleteUser = () => {
    this.setState((prevState) => {
      return {
        modaleVisibleDelete: false,
        users: prevState.users.filter(user => user.id !== prevState.deleteUserId),
      };
    })
  };

  setModalVisibleDelete = (userId: number) => {
    this.setState({
      modaleVisibleDelete: true,
      deleteUserId: userId,
      selectedUserId: this.state.deleteUserId ? 0 : this.state.selectedUserId,
    });
  };

  setModalUnvisibleDelete = () => {
    this.setState({
      modaleVisibleDelete: false,
    });
  };

  setModalVisibleForm = () => {
    this.setState({
      modaleVisibleForm: true,
    });
  };

  setModalUnvisibleForm = () => {
    this.setState({
      modaleVisibleForm: false,
    });
  };

  addUser = (person: User) => {
    if (!this.state.users.some(user => user.id === person.id)) {
      this.setState((prevUsers => {
        const { users } = prevUsers;

        return {
          users: [...users, person],
        };
      }));
    }
  };

  render() {
    const { selectedUserId, users, modaleVisibleForm, modaleVisibleDelete } = this.state;

    return (
      <div className="App">
        <div className="App__allUser">
          <UsersList
            users={users}
            selectedUserId={this.selectUser}
            modaleVisibleDelete={this.setModalVisibleDelete}
            setModalVisibleForm={this.setModalVisibleForm}
          />
        </div>

        <div className="App__selectedUser">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClear={this.unselectUser}
              />
            ) : <p className="App__content-container-none">
              No user selected
            </p>
            }
          </div>

          {modaleVisibleDelete &&
            <Modal
              modaleVisibleDelete={this.setModalUnvisibleDelete}
              deleteUser={this.deleteUser}
            />}

          {modaleVisibleForm &&
            <ModalForm
              setModalUnvisible={this.setModalUnvisibleForm}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
