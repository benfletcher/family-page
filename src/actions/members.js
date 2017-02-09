import 'isomorphic-fetch';

const mockMembers = {
  Jamie: {
    avatar: '...url...',
    fullname: 'Jamie Davella',
  },
  Ben: {
    avatar: '...url...',
    fullname: 'Ben Fletcher',
  },
};

export const GET_MEMBERS = 'GET_MEMBERS';
export const getMembers = () => ({
  type: GET_MEMBERS,
});

export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const getMembersSuccess = people => ({
  type: GET_MEMBERS_SUCCESS,
  people,
});

export const fetchMembers = () => (dispatch) => {
  dispatch(getMembers());

  dispatch(getMembersSuccess(mockMembers));
};
