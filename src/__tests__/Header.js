/* eslint-env browser, jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/Header';

test('Header snapshot is the same', () => {
  const component = renderer.create(
    <Header />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
