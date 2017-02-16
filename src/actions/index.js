import 'isomorphic-fetch';
import cookie from 'react-cookie';

export const SHOW_ZOOMED = 'SHOW_ZOOMED';
export const showZoomed = (photo, index) => ({
  type: SHOW_ZOOMED,
  photo,
  index,
});

export const HIDE_ZOOMED = 'HIDE_ZOOMED';
export const hideZoomed = () => ({
  type: HIDE_ZOOMED,
});

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

// AUTH
export const HELLO_WORLD_FAILURE = 'HELLO_WORLD_FAILURE';
export const helloWorldFailure = err => ({
  type: HELLO_WORLD_FAILURE,
  message: err,
});

export const HELLO_WORLD_SUCCESS = 'HELLO_WORLD_SUCCESS';
export const helloWorldSuccess = message => ({
  type: HELLO_WORLD_SUCCESS,
  message,
});

export const fetchHelloWorld = () => () => {
  console.log(cookie.load('accessToken'));
  fetch('http://localhost:8080/helloworld',
    {
      headers: {
        Authorization: `bearer ${cookie.load('accessToken')}`
      }
    })
  // fetch('https://calm-beach-24196.herokuapp.com/photos')
  .then((res) => {
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(console.log)
  // .then(message =>
  //   dispatch(helloWorldSuccess(message))
  .catch(console.error);
};
