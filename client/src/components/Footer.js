import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setFilter, removeCompleted } from '../models/todos/actions';

import {
  totalTodosSelector,
  activeTodosSelector,
  filterSelector,
} from '../models/todos/selectors';

const filters = [
  { text: 'All', value: null },
  { text: 'Active', value: 'active' },
  { text: 'Completed', value: 'completed' },
];

const Footer = ({
  totalTodos,
  activeTodos,
  filter,
  setFilter,
  removeCompleted,
}) => {
  //
  const renderFilters = () => (
    <React.Fragment>
      {filters.map(item => (
        <li>
          <a
            href="#/"
            className={classNames({ selected: filter === item.value })}
            onClick={() => setFilter(item.value)}
          >
            {item.text}
          </a>
        </li>
      ))}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {totalTodos > 0 && (
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeTodos} </strong>
            <span> </span>
            <span>{activeTodos === 1 ? 'item' : 'items'} </span>
            <span>left</span>
          </span>
          <ul className="filters">{renderFilters()}</ul>
          <button className="clear-completed" onClick={removeCompleted}>
            Clear completed
          </button>
        </footer>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  totalTodos: totalTodosSelector(state),
  activeTodos: activeTodosSelector(state),
  filter: filterSelector(state),
});

const mapDispatchToProps = dispatch => ({
  setFilter: bindActionCreators(setFilter, dispatch),
  removeCompleted: bindActionCreators(removeCompleted, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
