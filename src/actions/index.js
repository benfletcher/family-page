import 'isomorphic-fetch';

export const GET_STATUS = 'GET_STATUS';
export const getStatus = () => ({
  type: GET_STATUS,
});

export const GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS';
export const getStatusSuccess = (message) => ({
  type: GET_STATUS_SUCCESS,
  message
});

export const fetchStatus = () => (dispatch) => {
  dispatch(getStatus());

  fetch('http://localhost:8080/')
  .then(res => {
    console.log('get status');
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

export const GET_PHOTOS = 'GET_PHOTOS';
export const getPhotos = () => ({
  type: GET_PHOTOS,
});

export const GET_PHOTO_SUCCESS = 'GET_STATUS_SUCCESS';
export const getPhotosSuccess = (photos) => ({
  type: GET_PHOTO_SUCCESS,
  photos
});

export const fetchPhotos = () => (dispatch) => {
  dispatch(getPhotos());

  fetch('http://localhost:8080/')
  .then(res => {
    console.log('get photos');
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(data => dispatch(getPhotosSuccess(data.photos)))
  // TODO fetch error action
  .catch(console.error);
};


