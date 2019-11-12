import React from 'react';
import PropTypes from 'prop-types';

export const UserContext = React.createContext({});

export class UserProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  _getUsername = () => window.sessionStorage.getItem('username');

  _setUsername = username => window.sessionStorage.setItem('username', username);

  render() {
    return (
      <UserContext.Provider
        value={{
          getUsername: this._getUsername,
          setUsername: this._setUsername,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
