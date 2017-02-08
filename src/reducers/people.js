import * as actions from '../actions';

const initialState = {
  people: {},
  loading: false,
};

const people = (state = initialState, action) => {
  if (action.type === actions.GET_PEOPLE) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === actions.GET_PEOPLE_SUCCESS) {
    return {
      ...state,
      people: action.photos,
      loading: false,
    };
  }

  return state;
};

export default people;
