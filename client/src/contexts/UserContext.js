import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(window.sessionStorage.getItem('username'));
  useEffect(() => {
    window.sessionStorage.setItem('username', username);
    return () => window.sessionStorage.removeItem('username');
  }, [username]);

  return (
    <UserContext.Provider
      value={{
        getUsername: () => username,
        setUsername: setUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
