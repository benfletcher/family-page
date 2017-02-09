import 'isomorphic-fetch';
// import cookie from 'react-cookie';

// STATUS
// Dev-only actions for backend testing

export const GET_STATUS = 'GET_STATUS';
export const getStatus = () => ({
  type: GET_STATUS,
});

export const GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS';
export const getStatusSuccess = message => ({
  type: GET_STATUS_SUCCESS,
  message,
});

export const fetchStatus = () => (dispatch) => {
  dispatch(getStatus());

  fetch('http://localhost:8080/', {
    // headers: {
    //   Authorization: `Bearer ${cookie.load('accessToken')}`,
    // },
  })
  .then((res) => {
    console.info('get status');
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(data => dispatch(getStatusSuccess(data.message)))

  // TODO fetch error action
  .catch(console.error);
};

// PHOTOS

export const GET_PHOTOS = 'GET_PHOTOS';
export const getPhotos = () => ({
  type: GET_PHOTOS,
});

export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const getPhotosSuccess = photos => ({
  type: GET_PHOTOS_SUCCESS,
  photos,
});

const mockPhotos = [
  {
    userId: 'Jamie',
    url: 'http://lorempixel.com/800/600/people/',
    date: new Date(),
    tags: ['Jamie', 'Grandma', 'Spot'],
  },
  {
    userId: 'Alex',
    url: 'http://lorempixel.com/600/800/people/',
    date: new Date(),
    tags: ['Alex', 'Grandma', 'Spot'],
  },
  {
    userId: 'Ben',
    url: 'http://lorempixel.com/1000/800/city/',
    date: new Date(),
    tags: ['Jamie', 'Ben', 'Spot'],
  },
  {
    userId: 'Grandma',
    url: 'http://lorempixel.com/600/800/sports/',
    date: new Date(),
    tags: ['Jimmy', 'Grandma', 'Spot'],
  },
];

export const fetchPhotos = () => (dispatch) => {
  dispatch(getPhotos());

  fetch('http://localhost:8080/', {
    // headers: {
    //   Authorization: `Bearer ${cookie.load('accessToken')}`,
    // },
  })
  .then((res) => {
    console.log('get photo');
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(() => dispatch(getPhotosSuccess(mockPhotos)))

  // TODO fetch error action
  .catch(console.error);
};

// PEOPLE

const mockPeople = {
  Jamie: {
    avatar: '...url...',
    fullname: 'Jamie Davella',
  },
  Ben: {
    avatar: '...url...',
    fullname: 'Ben Fletcher',
  },
};

export const GET_PEOPLE = 'GET_PEOPLE';
export const getPeople = () => ({
  type: GET_PEOPLE,
});

export const GET_PEOPLE_SUCCESS = 'GET_PEOPLE_SUCCESS';
export const getPeopleSuccess = people => ({
  type: GET_PEOPLE_SUCCESS,
  people,
});

export const fetchPeople = () => (dispatch) => {
  dispatch(getPeople());

  dispatch(getPeopleSuccess(mockPeople));
};

// Action to post image url
export const postImg = uploadImg => (dispatch) => {
  fetch('http://localhost:8080/photos', {
    headers: {
      // Authorization: `Bearer ${cookie.load('accessToken')}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(uploadImg)
  })
  .then((res) => {
    // console.info('image upload/post');
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(() => dispatch(fetchPhotos()))

  // TODO fetch error action
  .catch(console.error);
};
