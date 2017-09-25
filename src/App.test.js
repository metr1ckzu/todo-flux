// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { mount } from 'enzyme';
// import todoStore from './todoStore'
// import sinon from 'sinon'
// import * as todoActions from './todoActions'
//
//
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView
//
// it('renders without crashing', () => {
//   const root = document.createElement('root');
//   ReactDOM.render(<App />, root);
// });
//
//
// describe('todoStore', () => {
//   let state, todos, dispatch
//   state = todoStore.getAll()
//
//   todos = []
//
//   dispatch = (action) => {
//     state = todoStore.handleAction(action);
//   };
//
//   it('can add todo', () => {
//     dispatch({
//       type: "CREATE_TODO",
//       text: 'test0',
//       id: 5
//     });
//     expect(todos).toEqual([
//       {text: 'text0'}
//     ])
//   })
//   it('can delete todo', () => {
//     dispatch({
//       type: "DELETE_TODO",
//       id: 5
//     })
//     expect(todoStore.deleteTodo()).toBeCalled()
//   })
// });
//
// // describe('app.js', () => {
// //   it('should devoke on unmount', () => {
// //     const wrapper = mount(<App />)
// //     const spy = jest.fn(todoStore.removelistener)
// //
// //
// //     expect(spy).toBeCalled()
// //   })
// // })

import { mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react';
import App from './App'
import ReactDOM from 'react-dom'
import * as todoActions from './todoActions'

describe('app', () => {
  it('calls getApi on componentWillMmount', () => {
    const getApi = sinon.stub()
    const wrapper = mount(<App getApi={getApi} />)
    expect(getApi.callcount).to.equal(1);
  })
})
