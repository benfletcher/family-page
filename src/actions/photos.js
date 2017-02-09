import 'isomorphic-fetch';

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

export const GET_PHOTOS = 'GET_PHOTOS';
export const getPhotos = () => ({
  type: GET_PHOTOS,
});

export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const getPhotosSuccess = photos => ({
  type: GET_PHOTOS_SUCCESS,
  photos,
});

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
