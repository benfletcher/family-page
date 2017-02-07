import * as actions from '../actions';

const initialState = {
  messages: [],
  status: '',
  statusLoading: false
};

const statusReducer = (state = initialState, action) => {

  if (action.type === actions.GET_STATUS) {
    return {
      ...state,
      statusLoading: true
    };
  }

  else if (action.type === actions.GET_STATUS_SUCCESS) {
    return {
      ...state,
      status: action.message,
      statusLoading: false
    };
  }

  return state;
};

export default statusReducer;
