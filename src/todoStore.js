import { EventEmitter } from 'events';
import dispatcher from './dispatcher'
import axios from 'axios'

// var instance = axios.create({
//   baseURL: 'http://localhost:3001/',
//   timeout: 1000,
// });
// var api = []

// var instance = axios.create({
//   baseURL: 'http://localhost:3001/',
//   timeout: 1000,
// });
// var api = null
// instance.get('/todos')
//   .then(function (response) {
//       console.log(response.data);
//       api = response.data
//       console.log(api)
//     })


class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.state = []
    var instance = axios.create({
      baseURL: 'http://localhost:3001/',
      timeout: 1000,
    });
    instance.get('/todos').then(function (response) {
          console.log(response.data);
          this.state.setState(response.data)
        })

    // [
    //   {
    //     id: 113464613,
    //     text: "Go Shopping",
    //     complete: false
    //   },
    //   {
    //     id: 235684679,
    //     text: "Pay Water Bill",
    //     complete: false
    //   },]
  }

  getAll() {
    return this.state;
  }

  createTodo(text) {
    const id = Date.now();

    this.state.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

  deleteTodo(id) {
    console.log({id})
    this.state = this.state.filter(function(el){ return el.id != id })

    this.emit("change")
  }

  handleAction(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
        break;
      }
      case "DELETE_TODO": {
        this.deleteTodo(action.id);
        break;
      }
    }
  }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleAction.bind(todoStore));
export default todoStore;
