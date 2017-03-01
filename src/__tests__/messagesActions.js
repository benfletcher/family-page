/* eslint-env browser, jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import nock from 'nock';
import * as actions from '../actions/messages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('simple messages actions', () => {
  it('should create an action to getMessages', () => {
    const expectedAction = {
      type: 'GET_MESSAGES',
    };
    expect(actions.getMessages()).to.deep.equal(expectedAction);
  });
  it('should create an action to getMessagesSuccess', () => {
    const messages = [{
      _id: '589b9c6705ae9f0d9cbd165d',
      url: 'http://lorempixel.com/900/400/nightlife',
      text: 'Grandma playing beach volleyball',
      userId: 'Alex',
      contentType: 'photo',
      tags: [],
      date: '2017-02-08T22:32:07.298Z',
      comments: [
        {
          from: 'Jamie',
          to: 'Ben',
          text: 'my nephew is getting tall',
          posted: Date.now()
        },
      ]
    }];
    const expectedAction = {
      type: 'GET_MESSAGES_SUCCESS',
      messages
    };
    expect(actions.getMessagesSuccess(messages).type).to.equal(expectedAction.type);
    expect(actions.getMessagesSuccess(messages).messages[0]).to.equal(expectedAction.messages[0]);
  });
});

// describe.only('async message actions', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   });
//
//   it('can fetchMessages when page loads', () => {
//     nock('http://example.com')
//       .get('/messages')
//       .reply(200, { body: { messages: [{
//         _id: '589b9c6705ae9f0d9cbd165d',
//         url: 'http://lorempixel.com/900/400/nightlife',
//         text: 'Grandma playing beach volleyball',
//         userId: 'Alex',
//         contentType: 'photo',
//         tags: [],
//         date: '2017-02-08T22:32:07.298Z',
//         comments: [
//           {
//             from: 'Jamie',
//             to: 'Ben',
//             text: 'my nephew is getting tall',
//             posted: Date.now()
//           },
//         ]
//       }
//       ] }
//       });
//
//     const expectedActions = [
//       { type: 'getMessages' },
//       { type: 'getMessagesSuccess',
//         body: { messages: [{
//           _id: '589b9c6705ae9f0d9cbd165d',
//           url: 'http://lorempixel.com/900/400/nightlife',
//           text: 'Grandma playing beach volleyball',
//           userId: 'Alex',
//           contentType: 'photo',
//           tags: [],
//           date: '2017-02-08T22:32:07.298Z',
//           comments: [
//             {
//               from: 'Jamie',
//               to: 'Ben',
//               text: 'my nephew is getting tall',
//               posted: Date.now()
//             },
//           ]
//         }
//         ] } },
//     ];
//     const store = mockStore(
//       { messages:
//       [{
//         _id: '589b9c6705ae9f0d9cbd165d',
//         url: 'http://lorempixel.com/900/400/nightlife',
//         text: 'Grandma playing beach volleyball',
//         userId: 'Alex',
//         contentType: 'photo',
//         tags: [],
//         date: '2017-02-08T22:32:07.298Z',
//         comments: [
//           {
//             from: 'Jamie',
//             to: 'Ben',
//             text: 'my nephew is getting tall',
//             posted: Date.now()
//           },
//         ]
//       }]
//       }
//     );
//     console.log(store.getState());
//     console.log(expectedActions);
//     console.log(store.getActions());
//
//     return store.dispatch(actions.fetchMessages())
//       .then(() => { // return of async actions
//         expect(store.getActions()).toEqual(expectedActions);
//       });
//   });
// });
