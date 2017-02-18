import 'isomorphic-fetch';

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
