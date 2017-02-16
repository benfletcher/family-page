import 'isomorphic-fetch';

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

  fetch('http://localhost:8080/messages')
  // fetch('https://calm-beach-24196.herokuapp.com/photos')
  .then((res) => {
    if (!res.ok) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    return res;
  })
  .then(res => res.json())
  .then((messages) => {
    dispatch(getMessagesSuccess(messages));
  })
  .catch(console.error);
};

export const postMessage = content => (dispatch) => {
  fetch('http://localhost:8080/messages', {
  // fetch('https://calm-beach-24196.herokuapp.com/photos', {
    headers: {
      'Content-Type': 'application/json'
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
