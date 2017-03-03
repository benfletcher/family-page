import * as actions from '../actions/current-user';

const initialState = {
  id: '',
  avatar: '',
  name: '',
  fullname: '',
  families: {
    1234: {
      _id: '1234',
      avatar: 'https://gravatar.com/avatar/56c6463a0e39da49cd1ce358f196a2df?s=512&d=https://codepen.io/assets/avatars/team-avatar-512x512-a1865fd24525fb17847bd2dc53d0cb033a60f69d519d018b4e1d396c397815b1.png',
      name: 'Thinkful',
      members: ['Jamie', 'Ben', 'Alex']
    },
    demoId: {
      _id: 'demoId',
      avatar: 'http://veselchac.ru/ckfinder/userfiles/files/%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D1%80%D0%B0%D0%B7%D0%B4%D0%BD%D0%B8%D0%BA%D0%B0.jpg',
      name: 'Demo',
      members: ['Jamie', 'Ben', 'Alex']
    }
  },
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
