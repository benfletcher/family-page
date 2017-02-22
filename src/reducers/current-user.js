import * as actions from '../actions/current-user';

const initialState = {
  id: '',
  avatar: '',
  name: '',
  fullname: '',
  families: [],
  loading: false,
};

const currentUser = (state = initialState, action) => {
  if (action.type === actions.GET_CURRENT_USER) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === actions.GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      id: action.id,
      avatar: action.avatar,
      name: action.name,
      fullname: action.fullname,
      families: action.families,
      loading: false,
    };
  }

  return state;
};

export default currentUser;
