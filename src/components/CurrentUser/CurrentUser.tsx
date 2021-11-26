import React from 'react';
import './CurrentUser.scss';
import { User } from '../../react-app-env';

type Props = {
  onClear: () => void,
  selectedUser: User | null,
};

const CurrentUser: React.FC<Props> = ({ onClear, selectedUser }) => {
  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected User ID: ${selectedUser?.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">
        {selectedUser?.name && `Name: ${selectedUser?.name}`}
      </h3>

      <p className="CurrentUser__email">
        {selectedUser?.email && `E-mail: ${selectedUser?.email}`}
        <br />
        {selectedUser?.phone && `Number: ${selectedUser?.phone}`}
        <br />
        {selectedUser?.username && `Username: ${selectedUser?.username}`}
      </p>

      <p className="CurrentUser__phone">
        {selectedUser?.website && `Website: ${selectedUser?.website}`}
      </p>

      <button
        type="button"
        className="button"
        onClick={() => {
          onClear()
        }}
      >
        Clear user
      </button>
    </div>
  );
};

export default CurrentUser;
