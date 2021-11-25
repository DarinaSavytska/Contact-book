import React from "react";
import './App.scss';
import './styles/general.scss';
import { CurrentUser } from "./components/CurrentUser/CurrentUser";
import { getAllUsers } from "./api/api";
import { User } from "./react-app-env";
import { UsersList } from "./components/UsersList/UsersList";
import { userInfo } from "os";

interface State {
  selectedUserId: number,
  users: User[],
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    users: [],
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

  deleteUser = (userId: number) => {
    this.setState({ users: this.state.users.filter(user => user.id !== userId) })
  };

  render() {
    const { selectedUserId, users } = this.state;

    return (
      <div className="App">
        <div className="App__allUser">
          <UsersList
            users={users}
            selectedUserId={this.selectUser}
            onDelete={this.deleteUser}
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
        </div>
      </div>
    );
  }
}

export default App;
