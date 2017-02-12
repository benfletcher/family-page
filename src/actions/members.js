import 'isomorphic-fetch';

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

  fetch('https://calm-beach-24196.herokuapp.com/members')
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
      // membersObj[member._id] = member;
      membersObj[member.nickname] = member;
    });

    dispatch(getMembersSuccess(membersObj));
  })
  .catch(console.error);
};
