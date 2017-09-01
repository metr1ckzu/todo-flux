import { EventEmitter } from 'events';
import dispatcher from './dispatcher'

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.state = []
    this.getApiState = this.getApiState.bind(this)
  }

  handleAction(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text, action.id);
        break;
      }
      case "DELETE_TODO": {
        this.deleteTodo(action.id);
        break;
      }
      case "SET_INIT_STATE": {
        this.getApiState(action.apiDataList);
        break;
      }
    }
  }

  getApiState(apiDataList) {
    this.state = apiDataList;
    this.emit("change");
  }

  getAll() {
    return this.state;
  }

  createTodo(text, id) {
    this.state.push({
      id,
      text,
      complete: false,
    });
    this.emit("change");
  }

  deleteTodo(id) {
    this.state = this.state.filter(function(el){ return el.id !== id })
    this.emit("change")
  }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleAction.bind(todoStore));
export default todoStore;
