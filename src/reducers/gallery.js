import * as actions from '../actions/gallery';

const initialState = {
  zoomed: false,
  zoomedIndex: 0,
  zoomedPhoto: null,
};

const status = (state = initialState, action) => {
  if (action.type === actions.SHOW_ZOOMED) {
    return {
      ...state,
      zoomed: true,
      zoomedPhoto: action.photo,
      zoomedIndex: action.index
    };
  } else if (action.type === actions.HIDE_ZOOMED) {
    return {
      ...state,
      zoomed: false,
    };
  }

  return state;
};

export default status;
