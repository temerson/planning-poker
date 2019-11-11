import React from 'react';
import logo from './logo.svg';
import './App.css';

const WS_URL = 'ws://localhost:5000';

class App extends React.Component {
  state = {
    data: null,
    websocket: new WebSocket(WS_URL),
  }

  componentDidMount() {
    const { websocket } = this.state;
    websocket.onopen = () => {
      console.log('connected');
    }
    websocket.onmessage = event => {
      console.log(event.data);
    }
    websocket.onclose = () => {
      console.log('disconnected');
      this.setState({
        webSocket: new WebSocket(WS_URL),
      });
    }

    this._callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.state.websocket.send('hello');
  }

  _callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-intro">{this.state.data}</p>
        </header>
      </div>
    );
  }
}

export default App;
