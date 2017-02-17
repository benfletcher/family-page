import 'isomorphic-fetch';
import cookie from 'react-cookie';

export const GET_MESSAGES = 'GET_MESSAGES';
export const getMessages = () => ({
  type: GET_MESSAGES,
});

export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const getMessagesSuccess = messages => ({
  type: GET_MESSAGES_SUCCESS,
  messages,
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
  .then(messages =>
    // convert Mongo date to JS date, sort messages on date
    dispatch(getMessagesSuccess(
      messages.map(message => ({
        ...message,
        date: new Date(message.date)
      }))
      .sort((x, y) => y.date - x.date)
    ))
  )
  .catch(console.error);
};

export const postMessage = content => (dispatch) => {
  fetch('http://localhost:8080/messages', {
  // fetch('https://calm-beach-24196.herokuapp.com/photos', {
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
  console.log(commentObject);
  const url = 'http://localhost:8080/comments';
  const userId = 'Alex';
  const messageId = commentObject.messageId;
  fetch(`${url}/${userId}/${messageId}`, {
  // fetch('https://calm-beach-24196.herokuapp.com/photos', {
    headers: {
      'Content-Type': 'application/json'
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
  .then(() => dispatch(fetchMessages()))
  .catch(console.error);
};
