import * as actions from '../actions';

const initialState = {
  message: '',
  loading: true,
  userId: 'Jamie',
  zoomed: false,
  zoomedUrl: 'http://www.valentinesdaysurprises.com/wp-content/uploads/2017/01/Valentine-Day-Greeting-Cards-Download.jpg',
  zoomedCurrentId: null,
  zoomedIndex: 0,
};

const status = (state = initialState, action) => {
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
  } else if (action.type === actions.SHOW_ZOOMED) {
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
