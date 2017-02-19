import * as actions from '../actions/messages';

const initialState = {
  currentUser: '',
  messages: [],
  loading: false,
};

const messages = (state = initialState, action) => {
  if (action.type === actions.GET_MESSAGES) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === actions.GET_MESSAGES_SUCCESS) {
    return {
      ...state,
      currentUser: action.currentUser,
      currentAvatar: action.currentAvatar,
      currentNickname: action.currentNickname,
      messages: action.messages,
      loading: false,
    };
  }

  return state;
};

export default messages;
