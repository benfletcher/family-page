/* eslint-env browser, jest */
import { expect } from 'chai';
import * as actions from '../actions/current-user';

describe('simple current-user actions', () => {
  it('should create an action to getCurrentUser', () => {
    const expectedAction = {
      type: 'GET_CURRENT_USER',
    };
    expect(actions.getCurrentUser()).to.deep.equal(expectedAction);
  });
  it('should create an action to getCurrentUserSuccess', () => {
    const currentUser = {
      id: '2314i359302',
      avatar: 'https://lh6.googleusercontent.com/-r246ksd96/396',
      name: 'John',
      fullname: 'John Smith',
      families: ['58a79ead29e48da02c0bb22', '58aca1ce29e49jgk30222209bb33']
    };
    const expectedAction = {
      type: 'GET_CURRENT_USER_SUCCESS',
      id: currentUser.id,
      avatar: currentUser.avatar,
      name: currentUser.name,
      fullname: currentUser.fullname,
      families: currentUser.families
    };
    expect(actions.getCurrentUserSuccess(currentUser).type).to.equal(expectedAction.type);
    expect(actions.getCurrentUserSuccess(currentUser)).to.deep.equal(expectedAction);
  });
});
