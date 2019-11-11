const SESSION_KEY = 'username';

export const getUsername = () => window.sessionStorage.getItem(SESSION_KEY);
export const saveUsername = username => window.sessionStorage.setItem(SESSION_KEY, username);
