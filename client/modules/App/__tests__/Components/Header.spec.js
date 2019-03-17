import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header/Header';


test('renders the header properly', t => {
  const wrapper = shallow(<Header />);

  t.truthy(wrapper.find('Link').first().containsMatchingElement(<span id="siteTitle" />));
  t.is(wrapper.find('a').length, 1);
});
