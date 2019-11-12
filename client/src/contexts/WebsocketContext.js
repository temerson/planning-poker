import React from 'react';
import PropTypes from 'prop-types';

export const WebsocketContext = React.createContext({});

export class WebsocketProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  websocket = new WebSocket('ws://localhost:5000');

  _send = obj => this.websocket.send(JSON.stringify(obj));

  render() {
    return (
      <WebsocketContext.Provider value={this.websocket}>
        {this.props.children}
      </WebsocketContext.Provider>
    );
  }
}
