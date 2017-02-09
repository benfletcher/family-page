import * as actions from '../actions/members';

const initialState = {
  members: {},
  loading: false,
};

const members = (state = initialState, action) => {
  if (action.type === actions.GET_MEMBERS) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === actions.GET_MEMBERS_SUCCESS) {
    return {
      ...state,
      members: action.members,
      loading: false,
    };
  }

  return state;
};

export default members;
