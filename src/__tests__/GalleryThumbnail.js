/* eslint-env browser, jest */
import React from 'react';
import renderer from 'react-test-renderer';
import GalleryThumbnail from '../components/GalleryThumbnail';

test('Header snapshot is the same', () => {
  const component = renderer.create(
    <GalleryThumbnail />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
