jest.dontMock('./todoStore')


describe('TodoStore', () => {
  var actionTodoCreate = {
    source: 'VIEW_ACTION',
    action: {
      type: "CREATE_TODO",
      text: 'foo'
    }
  }
  var AppDispatcher;
  var TodoStore;
  var callback;

  beforeEach(function() {
    AppDispatcher = require('./dispatcher');
    TodoStore = require('./todoStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with no to-do items', function() {
    var all = todoStore.getAll();
    expect(all).toEqual({});
  });

  it('creates a to-do item', function() {
    callback(actionTodoCreate);
    var all = TodoStore.getAll();
    var keys = Object.keys(all);
    expect(keys.length).toBe(1);
    expect(all[keys[0]].text).toEqual('foo');
  });
})
