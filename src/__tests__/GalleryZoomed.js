/* eslint-env browser, jest */
import React from 'react';
import renderer from 'react-test-renderer';
import GalleryZoomed from '../components/GalleryZoomed';

test('Header snapshot is the same', () => {
  const component = renderer.create(
    <GalleryZoomed />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
