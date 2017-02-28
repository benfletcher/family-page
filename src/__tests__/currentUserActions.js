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
    const members = {
      googleId: '123455667788996482910',
      nickname: 'John',
      accessToken: 'ya893857483920dk2ls93lsjdl2',
      userName: 'John Smith',
      email: 'johnsmith@gmail.com',
      avatar: 'https://lh6.googleusercontent.com/-r246ksd96/396',
      families: ['58a79ead29e48da02c0bb22', '58aca1ce29e49jgk30222209bb33']
    };
    const expectedAction = {
      type: 'GET_MEMBERS_SUCCESS',
      members
    };
    expect(actions.getMembersSuccess(members).type).to.equal(expectedAction.type);
    expect(actions.getMembersSuccess(members).members).to.deep.equal(expectedAction.members);
  });
});
