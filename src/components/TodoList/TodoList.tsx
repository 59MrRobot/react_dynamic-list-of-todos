import React, { useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';

interface Props {
  todos: Todo[];
  onSelect: (userId: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onSelect }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  let filteredTodos = todos.filter(todo => (
    todo.title.toLowerCase()
      .includes(query.toLowerCase())
  ));

  switch (filter) {
    case 'active':
      filteredTodos = filteredTodos.filter(todo => todo.completed === false);
      break;
    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed === true);
      break;
    default:
      break;
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="Filter by title"
        data-cy="filterByTitle"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <select
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Not Completed</option>
        <option value="completed">Completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={cn(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            >
              {todo.completed
                ? (
                  <label>
                    <input type="checkbox" checked />
                    <p>{todo.title}</p>
                  </label>
                )
                : (
                  <label>
                    <input type="checkbox" />
                    <p>{todo.title}</p>
                  </label>
                )}

              <button
                type="button"
                className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
                data-cy="userButton"
                onClick={() => onSelect(todo.userId)}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
