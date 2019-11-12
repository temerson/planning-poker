import { useContext } from 'react';
import { WebsocketContext } from './WebsocketContext';

const useWebsocket = () => useContext(WebsocketContext);

export default useWebsocket;
