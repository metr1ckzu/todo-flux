import React from 'react';
import TodoStore from './todoStore'
import * as todoActions from './todoActions'

class Todo extends React.Component {

  deleteTodoClick(e) {
    const { id } = this.props;
    todoActions.deleteTodo(id)
  }

  render() {
    const { text } = this.props;
    const icon = '\u2716';

    return (
      <li>
        <span>{text}<button onClick={this.deleteTodoClick=this.deleteTodoClick.bind(this)}>{icon}</button></span>
      </li>
    )
  }
}

class TodoInput extends React.Component {
  constructor(props) {
    super();
    this.inputTodo = this.inputTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { text: '' }
  }

  render() {
    return (
      <form onSubmit={this.inputTodo}>
        <input onChange={this.handleChange} value={this.state.text}></input>
        <button>Add</button>
      </form>
    )
  }


  handleChange(e) {
    this.setState({text: e.target.value});
  }

  inputTodo(e) {
    e.preventDefault()
    todoActions.createTodo(this.state.text)
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
    };
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos)
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos)
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    })
  }

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
      return <Todo key={todo.id} {...todo}/>;   //text={todo.text}
    });

    return (
      <div>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
        <TodoInput />
      </div>
    )
  }
}


export default App;
