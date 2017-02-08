import * as actions from '../actions';

const initialState = {
  photos: [],
  loading: false,
};

const photos = (state = initialState, action) => {
  if (action.type === actions.GET_PHOTOS) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === actions.GET_PHOTO_SUCCESS) {
    return {
      ...state,
      photos: action.photo,
      loading: false,
    };
  }

  return state;
};

export default photos;
