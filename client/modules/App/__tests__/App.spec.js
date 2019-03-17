import React from 'react';
import PropTypes from 'prop-types';
import test from 'ava';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { App } from '../App';
import styles from '../App.css';

const children = <h1>Test</h1>;
const dispatch = sinon.spy();
const props = {
  children,
  dispatch,
};

test('renders properly', t => {
  const wrapper = shallow(
    <App {...props} />
  );

  // t.is(wrapper.find('Helmet').length, 1);
  t.is(wrapper.find('Header').length, 1);
  t.is(wrapper.find('Footer').length, 1);
  t.truthy(wrapper.find('Header + div').hasClass(styles.container));
  t.truthy(wrapper.find('Header + div').children(), children);
});

test('calls componentDidMount', t => {
  sinon.spy(App.prototype, 'componentDidMount');
  mount(
    <App {...props} />,
    {
      context: {
        router: {
          isActive: sinon.stub().returns(true),
          push: sinon.stub(),
          replace: sinon.stub(),
          go: sinon.stub(),
          goBack: sinon.stub(),
          goForward: sinon.stub(),
          setRouteLeaveHook: sinon.stub(),
          createHref: sinon.stub(),
        },
      },
      childContextTypes: {
        router: PropTypes.object,
      },
    },
  );

  t.truthy(App.prototype.componentDidMount.calledOnce);
  App.prototype.componentDidMount.restore();
});
