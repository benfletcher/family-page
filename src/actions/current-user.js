import 'isomorphic-fetch';
import cookie from 'react-cookie';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const getCurrentUser = () => ({
  type: GET_CURRENT_USER,
});

export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const getCurrentUserSuccess = payload => ({
  type: GET_CURRENT_USER_SUCCESS,
  id: payload.id,
  avatar: payload.avatar,
  name: payload.name,
  fullname: payload.fullname,
  families: payload.families,
});

export const fetchCurrentUser = () => (dispatch) => {
  dispatch(getCurrentUser());

  fetch(`${serverUrl}/user`,
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
  .then((data) => {
    if (data) {
      dispatch(getCurrentUserSuccess({
        id: data.currentUser.id,
        avatar: data.currentUser.avatar,
        name: data.currentUser.nickname,
        fullname: data.currentUser.fullname,
        families: data.currentUser.families
      }));
    }
  })
  .catch(console.error);
};
