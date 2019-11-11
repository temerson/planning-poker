import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';

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
    children: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { children, router } = this.props;
    if (!children) {
      router.replace({ pathname: '/boards' });
    }
  }

  render() {

    return (
      <div>
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

export default connect()(withRouter(App));
