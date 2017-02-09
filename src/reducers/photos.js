import * as actions from '../actions/photos';

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
  } else if (action.type === actions.GET_PHOTOS_SUCCESS) {
    return {
      ...state,
      photos: action.photos,
      loading: false,
    };
  }

  return state;
};

export default photos;
