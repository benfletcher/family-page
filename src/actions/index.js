import 'isomorphic-fetch';


export const SHOW_ZOOMED = 'SHOW_ZOOMED';
export const showZoomed = () => ({
  type: SHOW_ZOOMED,
});

export const HIDE_ZOOMED = 'HIDE_ZOOMED';
export const hideZoomed = () => ({
  type: HIDE_ZOOMED,
})


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
