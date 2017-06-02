import 'isomorphic-fetch';
import cookie from 'react-cookie';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const GET_MEMBERS = 'GET_MEMBERS';
export const getMembers = () => ({
  type: GET_MEMBERS,
});

export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const getMembersSuccess = members => ({
  type: GET_MEMBERS_SUCCESS,
  members,
});

export const fetchMembers = () => (dispatch) => {
  dispatch(getMembers());

  fetch(`${serverUrl}/members`,
    {
      headers: {
        Authorization: `bearer ${cookie.load('accessToken')}`
      }
    }
  )
  .then((res) => {
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then((membersArr) => {
    const membersObj = {};

    membersArr.forEach((member) => {
      membersObj[member._id] = member;
    });

    dispatch(getMembersSuccess(membersObj));
  })
  .catch(console.error);
};
