import 'isomorphic-fetch';

// STATUS

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

  fetch('http://localhost:8080/')

  .then((res) => {
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })

  .then(res => res.json())

  .then(data => dispatch(getStatusSuccess(data.message)))

  .catch(console.error);
};

// Action to post image url
export const postImg = uploadImg => (dispatch) => {
  fetch('http://localhost:8080/photos', {
    headers: {
      // Authorization: `Bearer ${cookie.load('accessToken')}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(uploadImg)
  })
  .then((res) => {
    // console.info('image upload/post');
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(() => dispatch(fetchPhotos()))

  // TODO fetch error action
  .catch(console.error);
};
