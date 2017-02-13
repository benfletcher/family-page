import 'isomorphic-fetch';

export const GET_PHOTOS = 'GET_PHOTOS';
export const getPhotos = () => ({
  type: GET_PHOTOS,
});

export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const getPhotosSuccess = photos => ({
  type: GET_PHOTOS_SUCCESS,
  photos,
});

export const fetchPhotos = () => (dispatch) => {
  dispatch(getPhotos());

  fetch('https://calm-beach-24196.herokuapp.com/photos')
  .then((res) => {
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then((photos) => {
    dispatch(getPhotosSuccess(photos));
  })
  .catch(console.error);
};

export const postPhoto = uploadImg => (dispatch) => {
  // fetch('https://calm-beach-24196.herokuapp.com/photos', {
  fetch('https://calm-beach-24196.herokuapp.com/photos', {
  // fetch('https://localhost:8080/photos', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(uploadImg)
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
  .then(() => dispatch(fetchPhotos()))
  .catch(console.error);
};
