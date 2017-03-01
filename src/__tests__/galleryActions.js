/* eslint-env browser, jest */
import { expect } from 'chai';
import * as actions from '../actions/gallery';

describe('simple gallery actions', () => {
  it('should create an action to hideZoomed', () => {
    const expectedAction = {
      type: 'HIDE_ZOOMED',
    };
    expect(actions.hideZoomed()).to.deep.equal(expectedAction);
  });
  it('should create an action to showZoomed', () => {
    const photo = 'https://https://res.cloudinary.com/families/image/upload/v1487959799/ztdi04b79hl18hk9qxwi.jpg';
    const index = 1;
    const expectedAction = {
      type: 'SHOW_ZOOMED',
      photo,
      index
    };
    expect(actions.showZoomed(photo, index).type).to.equal(expectedAction.type);
    expect(actions.showZoomed(photo, index)).to.deep.equal(expectedAction);
  });
});
