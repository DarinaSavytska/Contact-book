import React from "react";
import './App.scss';
import './styles/general.scss';
import { CurrentUser } from "./components/CurrentUser/CurrentUser";
import { getAllUsers } from "./api/api";
import { User } from "./react-app-env";
import { UsersList } from "./components/UsersList/UsersList";
import Modal from "./components/Modal/Modal";

interface State {
  selectedUserId: number,
  deleteUserId: number,
  users: User[],
  modaleVisible: boolean,
  removeUser: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    deleteUserId: 0,
    users: [],
    modaleVisible: false,
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
        modaleVisible: false,
        users: prevState.users.filter(user => user.id !== prevState.deleteUserId),
      };
    })
  };

  setModalVisible = (userId: number) => {
    this.setState({
      modaleVisible: true,
      deleteUserId: userId,
      selectedUserId: this.state.deleteUserId ? 0 : this.state.selectedUserId,
    });
  };

  setModalUnvisible = () => {
    this.setState({
      modaleVisible: false,
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
    const { selectedUserId, users, modaleVisible } = this.state;

    return (
      <div className="App">
        <div className="App__allUser">
          <UsersList
            users={users}
            selectedUserId={this.selectUser}
            setModalVisible={this.setModalVisible}
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

          {modaleVisible &&
            <Modal
              visible={modaleVisible}
              setModalUnvisible={this.setModalUnvisible}
              addUser={this.addUser}
              deleteUser={this.deleteUser}
            />}
        </div>
      </div>
    );
  }
}

export default App;
