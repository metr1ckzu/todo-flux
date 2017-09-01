import dispatcher from './dispatcher';
import axios from 'axios';

export function createTodo(text) {
  const id = Date.now();
  axios({
    method: 'POST',
    url: 'http://localhost:3001/todos/',
    data: {
      id: id,
      text: text,
      complete: false
    }
  }).then(function (response) {
    dispatcher.dispatch({
      type: "CREATE_TODO",
      text,
      id
    })
  })
}
export function deleteTodo(id) {
  axios.delete('http://localhost:3001/todos/'+id)
  .then(function (response) {
    dispatcher.dispatch({
      type: "DELETE_TODO",
        id,
    })
  })
}
export function getApi() {
  axios.get('http://localhost:3001/todos')
    .then(function (response) {
      var apiDataList = response.data;
      dispatcher.dispatch({
        type: "SET_INIT_STATE",
        apiDataList
      })
    })
}
