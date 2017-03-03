import 'isomorphic-fetch';
import cookie from 'react-cookie';

import { fetchCurrentUser } from './current-user';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const SWITCH_FAMILY = 'SWITCH_FAMILY';
export const switchFamily = id => ({
  type: SWITCH_FAMILY,
  currentFamily: id,
});

// create family
export const createFamily = family => (dispatch) => {
  fetch(`${serverUrl}/user`, {
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
  .then(() => dispatch(fetchCurrentUser()))
  .catch(console.error);
};

// admin add user to a family

// admin delete user from a family

// user leave a family group
