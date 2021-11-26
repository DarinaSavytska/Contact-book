import React from 'react';
import './CurrentUser.scss';
import { getUserById } from '../../api/api';
import { User } from '../../react-app-env';

type Props = {
  userId: number,
  onClear: () => void,
};

type State = {
  user: User | null,
  userError: boolean,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: {} as User,
    userError: false,
  }

  loadUser = async () => {
    try {
      const user = await getUserById(this.props.userId);

      this.setState({
        user,
        userError: false,
      });
    } catch {
      this.setState({
        userError: true,
      })
    }
  };

  async componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      this.loadUser();
    }
  }

  render() {
    const { user, userError } = this.state;

    return (
      !userError ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected User ID: ${user?.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            {user?.name && `Name: ${user?.name}`}
          </h3>

          <p className="CurrentUser__email">
            {user?.email && `E-mail: ${user?.email}`}
            <br />
            {user?.phone && `Number: ${user?.phone}`}
            <br />
            {user?.username && `Username: ${user?.username}`}
          </p>

          <p className="CurrentUser__phone">
            {user?.website && `Website: ${user?.website}`}
          </p>

          <button
            type="button"
            className="button"
            onClick={() => {
              this.props.onClear()
            }}
          >
            Clear user
          </button>
        </div>
      )
        : (
          `User id #${this.props.userId} not found`
        )
    );
  }
}