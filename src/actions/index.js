import 'isomorphic-fetch';
import cookie from 'react-cookie';

export const GET_STATUS = 'GET_STATUS';
export const getStatus = () => ({
  type: GET_STATUS,
});

export const GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS';
export const getStatusSuccess = message => ({
  type: GET_STATUS_SUCCESS,
  message,
});

export const fetchStatus = () => (dispatch) => {
  dispatch(getStatus());

  fetch('http://localhost:8080/protected', {
    headers: {
      Authorization: `Bearer ${cookie.load('accessToken')}`,
    },
  })
  .then((res) => {
    console.info('get status');
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(data => dispatch(getStatusSuccess(data.message)))
  // TODO fetch error action
  .catch(console.error);
};

export const GET_PHOTO = 'GET_PHOTO';
export const getPhoto = () => ({
  type: GET_PHOTO,
});

export const GET_PHOTO_SUCCESS = 'GET_PHOTO_SUCCESS';
export const getPhotoSuccess = photo => ({
  type: GET_PHOTO_SUCCESS,
  photo,
});

export const fetchPhotos = () => (dispatch) => {
  dispatch(getPhoto());

  fetch('http://localhost:8080/protected', {
    headers: {
      Authorization: `Bearer ${cookie.load('accessToken')}`,
    },
  })
  .then((res) => {
    console.log('get photo');
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(data => dispatch(getPhotoSuccess(['photo1', 'photo2'])))
  // TODO fetch error action
  .catch(console.error);
};
