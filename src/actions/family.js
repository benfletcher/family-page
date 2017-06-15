import 'isomorphic-fetch';
import cookie from 'react-cookie';
import { hashHistory } from 'react-router';

import { fetchMembers } from './members';


const serverUrl = process.env.REACT_APP_SERVER_URL;

export const SWITCH_FAMILY = 'SWITCH_FAMILY';
export const switchFamily = familyId => ({
  type: SWITCH_FAMILY,
  currentFamily: familyId,
});

export const ADD_FAMILY = 'ADD_FAMILY';
export const addFamily = () => ({
  type: ADD_FAMILY,
});

export const ADD_FAMILY_SUCCESS = 'ADD_FAMILY_SUCCESS';
export const addFamilySuccess = familyId => ({
  type: ADD_FAMILY_SUCCESS,
  currentFamily: familyId
});

// post family
export const postFamily = family => (dispatch) => {
  dispatch(addFamily());
  fetch(`${serverUrl}/family`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${cookie.load('accessToken')}`
    },
    method: 'POST',
    body: JSON.stringify(family)
  })
  .then((res) => {
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then((data) => {
    dispatch(addFamilySuccess(data._id));
    dispatch(fetchMembers(data._id));
    hashHistory.push('/app');
  })
  .catch(console.error);
};

// admin add user to a family

// admin delete family group
export const deleteFamily = familyId => () => {
  fetch(`${serverUrl}/family/${familyId}`, {
    headers: {
      Authorization: `bearer ${cookie.load('accessToken')}`
    },
    method: 'DELETE'
  })
  .then(() => hashHistory.push('/families'));
};

// admin delete user from a family

// user leave a family group
// not using this until further deliberation on how leaving group affects previous messages
// export const leaveFamily = familyId => dispatch => fetch(`${serverUrl}/family/leave/${familyId}`, {
//   headers: {
//     Authorization: `bearer ${cookie.load('accessToken')}`
//   },
//   method: 'DELETE'
// })
//   .then(() => hashHistory.push('/families'));
