import React from "react";
import { CurrentUser } from "./components/CurrentUser/CurrentUser";
// import './App/scss';
import { getAllUsers, getUserById } from "./api/api";
import { User } from "./react-app-env";
import { UsersList } from "./components/UsersList/UsersList";

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

  render() {
    const { selectedUserId, users } = this.state;

    return (
      <div className="App">
        <div className="App__allUser">
          <UsersList
            users={users}
            selectedUserId={this.selectUser}
          />
        </div>

        <div className="App__selectedUser">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClear={this.unselectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
