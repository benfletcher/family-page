import * as actions from '../actions/family';

const initialState = {
  currentFamily: 'defaultId'
};

const family = (state = initialState, action) => {
  if (action.type === actions.SWITCH_FAMILY) {
    return {
      ...state,
      currentFamily: action.currentFamily
    };
  }

  return state;
};

export default family;
