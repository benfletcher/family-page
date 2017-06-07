import * as actions from '../actions/family';

const initialState = {
  loading: false,
  currentFamily: '',
};

const family = (state = initialState, action) => {
  if (action.type === actions.SWITCH_FAMILY) {
    return {
      ...state,
      currentFamily: action.currentFamily,
    };
  } else if (action.type === actions.ADD_FAMILY) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === actions.ADD_FAMILY_SUCCESS) {
    return {
      ...state,
      currentFamily: action.currentFamily,
      loading: false,
    };
  }

  return state;
};

export default family;
