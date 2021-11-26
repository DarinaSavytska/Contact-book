import React from "react";
import './App.scss';
import './styles/general.scss';
import CurrentUser from "./components/CurrentUser/CurrentUser";
import { getAllUsers } from "./api/api";
import { User } from "./react-app-env";
import { UsersList } from "./components/UsersList/UsersList";
import Modal from "./components/Modal/ModalDelete";
import { ModalForm } from "./components/Modal/ModalForm";

interface State {
  selectedUser: User | null,
  deleteUserId: string,
  users: User[],
  modaleVisibleDelete: boolean,
  modaleVisibleForm: boolean,
  removeUser: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUser: null,
    deleteUserId: '',
    users: [],
    modaleVisibleDelete: false,
    modaleVisibleForm: false,
    removeUser: false,
  }

  async componentDidMount() {
    getAllUsers().then(response => {
      this.setState({ users: response })
    });
  }

  unselectUser = () => {
    this.setState({
      selectedUser: null,
    })
  };

  selectUser = (user: User) => {
    this.setState({ selectedUser: user })
  };

  deleteUser = () => {
    this.setState((prevState) => {
      return {
        modaleVisibleDelete: false,
        users: prevState.users.filter(user => user.id !== prevState.deleteUserId),
      };
    })
  };

  setModalVisibleDelete = (userId: string) => {
    this.setState({
      modaleVisibleDelete: true,
      deleteUserId: userId,
      selectedUser: this.state.deleteUserId ? null : this.state.selectedUser,
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
      this.setState((prevState => {
        const { users } = prevState;

        return {
          users: [...users, person],
        };
      }));
    }
  };

  render() {
    const { selectedUser: selectedUserId, users, modaleVisibleForm, modaleVisibleDelete } = this.state;

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
                onClear={this.unselectUser}
                selectedUser={this.state.selectedUser}
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
              addUser={this.addUser}
              users={this.state.users}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
