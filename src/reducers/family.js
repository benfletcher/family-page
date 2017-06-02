import * as actions from '../actions/family';

const initialState = {
  currentFamily: null,
  currentMembers: {}
};

const family = (state = initialState, action) => {
  if (action.type === actions.SWITCH_FAMILY) {
    return {
      ...state,
      currentFamily: action.currentFamily,
      currentMembers: action.currentMembers
    };
  }

  return state;
};

export default family;
