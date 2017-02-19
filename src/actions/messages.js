import 'isomorphic-fetch';
import cookie from 'react-cookie';

export const GET_MESSAGES = 'GET_MESSAGES';
export const getMessages = () => ({
  type: GET_MESSAGES,
});

export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const getMessagesSuccess = payload => ({
  type: GET_MESSAGES_SUCCESS,
  currentUser: payload.currentUser,
  currentAvatar: payload.currentAvatar,
  currentNickname: payload.currentNickname,
  messages: payload.messages,
});

export const fetchMessages = () => (dispatch) => {
  dispatch(getMessages());

  fetch('http://localhost:8080/messages',
    {
      headers: {
        Authorization: `bearer ${cookie.load('accessToken')}`
      }
    }
  )
  .then((res) => {
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then((data) => {
    // convert Mongo date to JS date, sort messages on date
    dispatch(getMessagesSuccess({
      currentUser: data.currentUser,
      currentAvatar: data.currentAvatar,
      currentNickname: data.currentNickname,
      messages: data.messages.map(message => ({
        ...message,
        date: new Date(message.date)
      }))
      .sort((x, y) => y.date - x.date)
    }
  ));
  }
  )
  .catch(console.error);
};

export const postMessage = content => (dispatch) => {
  fetch('http://localhost:8080/messages', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${cookie.load('accessToken')}`
    },
    method: 'POST',
    body: JSON.stringify({ contentType: 'photo', ...content, })
  })
  .then((res) => {
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then(() => dispatch(fetchMessages()))
  .catch(console.error);
};

export const postComment = commentObject => (dispatch) => {
  console.log('this is the comment object', commentObject);
  fetch('http://localhost:8080/comments', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${cookie.load('accessToken')}`
    },
    method: 'POST',
    body: JSON.stringify(commentObject)
  })
  .then((res) => {
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  // .then(res => res.json())
  .then(() => dispatch(fetchMessages()))
  .catch(console.error);
};
