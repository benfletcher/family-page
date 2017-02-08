import * as actions from '../actions';

const initialStateStatus = {
  message: '',
  loading: true,
};

const status = (state = initialStateStatus, action) => {
  console.log(state);
  if (action.type === actions.GET_STATUS) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === actions.GET_STATUS_SUCCESS) {
    return {
      ...state,
      message: action.message,
      loading: false,
    };
  }

  return state;
};

export default status;
