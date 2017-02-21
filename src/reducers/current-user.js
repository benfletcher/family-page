import * as actions from '../actions/current-user';

const initialState = {
  id: '',
  avatar: '',
  nickname: '',
  fullname: '',
  families: [],
  loading: false,
};

const messages = (state = initialState, action) => {
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
      nickname: action.nickname,
      fullname: action.fullname,
      families: action.families,
      loading: false,
    };
  }

  return state;
};

export default messages;
