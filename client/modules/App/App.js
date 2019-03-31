import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('./components/DevTools').default;
}

const FlexContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const FullHeight = styled.div`
  overflow: auto;
  flex-grow: 1;
  width: 100%;
  margin: 0 auto;
`;

export class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <FlexContainer>
          <Helmet
            title="Planning Poker"
            titleTemplate="%s - Poker Board"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header />
          <FullHeight>
            {this.props.children}
          </FullHeight>
          <Footer />
        </FlexContainer>
      </div>
    );
  }
}

export default App;
