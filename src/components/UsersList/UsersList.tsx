import React from "react";
import { User } from "../../react-app-env";
// import './UsersList.scss';

type Props = {
  users: User[],
  selectedUserId: (userId: number) => void,
};

type State = {
  titleSearch: string,
  sortBy: string,
};

export class UsersList extends React.Component<Props, State> {
  state: State = {
    titleSearch: '',
    sortBy: 'reset',
  }

  getSearchUser = (users: User[]) => {
    const { titleSearch } = this.state;

    if (titleSearch) {
      return users.filter(user => user.name.toLowerCase().includes(titleSearch.toLowerCase()));
    }

    return users;
  };

  getSortUser = (users: User[]) => {
    const { sortBy } = this.state;
    switch (sortBy) {
      case 'Sort A-Z':
        return users.sort((user1, user2) => user1.name.localeCompare(user2.name));

      case 'Sort Z-A':
        return users.sort((user1, user2) => user2.name.localeCompare(user1.name));

      default:
        return this.props.users;
    }
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      titleSearch: event.target.value,
    });
  };

  handleSelectedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      sortBy: event.target.value,
    })
  };

  render() {
    const { users, selectedUserId } = this.props;
    const { titleSearch, sortBy } = this.state;
    const usersSorted = this.getSortUser(users);
    const usersBySearch = this.getSearchUser(usersSorted);

    return (
      <div className="UsersList">
        <h2>Users:</h2>

        <input
          type="text"
          name="sortByText"
          id="sortByText"
          placeholder="Search user"
          value={titleSearch}
          onChange={this.handleInputChange}
        />

        <select
          name="sortBySelected"
          id="sortBySelected"
          value={sortBy}
          onChange={this.handleSelectedChange}
        >
          <option value="reset" disabled>
            Reset sort
          </option>

          <option value="Sort A-Z">
            Sort by A-Z
          </option>

          <option value="Sort Z-A">
            Sort by Z-A
          </option>
        </select>

        <div className="UsersList__list-container">
          <ul className="UsersList__list">
            {usersBySearch.map(user => (
              user.username &&
                <li
                  key={user.id}
                  className="UsersList__item"
                >
                  {user.name}

                  <button
                    type="button"
                    onClick={() => selectedUserId(user.id)}
                  >
                    More
                  </button>
                </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}