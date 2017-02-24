import 'isomorphic-fetch';
import cookie from 'react-cookie';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const GET_MESSAGES = 'GET_MESSAGES';
export const getMessages = () => ({
  type: GET_MESSAGES,
});

export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const getMessagesSuccess = payload => ({
  type: GET_MESSAGES_SUCCESS,
  messages: payload,
});

export const fetchMessages = () => (dispatch) => {
  dispatch(getMessages());

  fetch(`${serverUrl}/messages`,
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
    // convert ISO date to JS date object, sort messages on date
    dispatch(getMessagesSuccess(
      data.messages.map(message => ({
        ...message,
        date: new Date(message.date)
      }))
      .sort((x, y) => y.date - x.date)
  ));
  }
  )
  .catch(console.error);
};

export const postMessage = content => (dispatch) => {
  fetch(`${serverUrl}/messages`, {
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
  fetch(`${serverUrl}/comments`, {
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
  .then(() => dispatch(fetchMessages()))
  .catch(console.error);
};

// delete a message
export const deleteMessage = messageId => dispatch => fetch(`${serverUrl}/messages/${messageId}`, {
  headers: {
    Authorization: `bearer ${cookie.load('accessToken')}`
  },
  method: 'DELETE'
})
  .then(() => dispatch(fetchMessages()));

// delete a comment
export const deleteComment = (messageId, commentId) => dispatch => fetch(`${serverUrl}/comments/${messageId}/${commentId}`, {
  headers: {
    Authorization: `bearer ${cookie.load('accessToken')}`
  },
  method: 'DELETE'
})
  .then(() => dispatch(fetchMessages()));
