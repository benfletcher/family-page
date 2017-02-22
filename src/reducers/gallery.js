import * as actions from '../actions/gallery';

const initialState = {
  message: '',
  loading: true,
  userId: 'Jamie',
  zoomed: false,
  zoomedUrl: 'http://www.valentinesdaysurprises.com/wp-content/uploads/2017/01/Valentine-Day-Greeting-Cards-Download.jpg',
  zoomedCurrentId: null,
  zoomedIndex: 0,
  zoomedPhoto: '',
};

const status = (state = initialState, action) => {
  if (action.type === actions.SHOW_ZOOMED) {
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
