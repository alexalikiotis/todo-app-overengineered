import React from 'react';
import PropTypes from 'prop-types';

import Todo from './components/Todo';

const propTypes = {
  todos: PropTypes.array,
  activeTodos: PropTypes.number,
  filter: PropTypes.string,
  toggleTodo: PropTypes.func,
  toggleAllTodos: PropTypes.func,
  removeTodo: PropTypes.func,
};

const TodoList = ({
  todos,
  activeTodos,
  filter,
  toggleTodo,
  toggleAllTodos,
  removeTodo,
}) => {
  const renderTodos = () => {
    if (!todos) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        {todos
          .slice()
          .reverse()
          .filter(todo => {
            switch (filter) {
              case 'active':
                return !todo.completed;
              case 'completed':
                return todo.completed;
              default:
                return true;
            }
          })
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              handleOnChange={() => toggleTodo(todo)}
              handleRemove={() => removeTodo(todo)}
            />
          ))}
      </React.Fragment>
    );
  };

  return (
    <section className="main">
      {todos.length > 0 && (
        <React.Fragment>
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={activeTodos === 0}
            onChange={toggleAllTodos}
          />
          <label htmlFor="toggle-all"></label>
        </React.Fragment>
      )}
      <ul className="todo-list">{renderTodos()}</ul>
    </section>
  );
};

TodoList.propTypes = propTypes;

export default TodoList;
