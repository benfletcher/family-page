import 'isomorphic-fetch';
import cookie from 'react-cookie';

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
export const addFamilySuccess = () => ({
  type: ADD_FAMILY_SUCCESS,
});

// create family
export const createFamily = family => (dispatch) => {
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
  .then(() => {
    dispatch(addFamilySuccess());
  })
  .catch(console.error);
};

// admin add user to a family

// admin delete user from a family

// user leave a family group
