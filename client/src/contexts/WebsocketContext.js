import React from 'react';
import PropTypes from 'prop-types';

export const WebsocketContext = React.createContext({});

export class WebsocketProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    isReady: false,
  }

  websocket = new WebSocket(`ws://${window.location.hostname}:5000`);

  _send = (type, body) => {
    const payload = { type, ...body };
    this.websocket.send(JSON.stringify(payload));
  }

  // todo: make sure cleanup happens
  _subscribe = (type, cb) => {
    this.websocket.onmessage = message => {
      const data = JSON.parse(message.data);
      if (data.type === type) {
        cb(data);
      }
    }
  }

  render() {
    this.websocket.onopen = () => this.setState({ isReady: true });

    return (
      <WebsocketContext.Provider value={{
        isReady: this.state.isReady,
        socket: this.websocket,
        send: this._send,
        subscribe: this._subscribe,
      }}>
        {this.props.children}
      </WebsocketContext.Provider>
    );
  }
}
