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
  families: payload.family,
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
      // const family = {};
      // data.families.forEach((fam) => {
      //   family[fam._id] = fam;
      // });
      dispatch(getCurrentUserSuccess({
        id: data.currentUser.id,
        avatar: data.currentUser.avatar,
        name: data.currentUser.nickname,
        fullname: data.currentUser.fullname,
        // currentFamily: data.currentUser.currentFamily
        // family,
      }));
    }
  })
  .catch(console.error);
};

// put in new action file FamilyManagement
export const SWITCH_FAMILY = 'SWITCH_FAMILY';
export const switchFamily = id => ({
  type: SWITCH_FAMILY,
  currentFamily: id,
});

// create family
// admin add user to a family
