import React from 'react';

// COMPONENTS
import TodoListItem from '../todo-list-item/TodoListItem';
import './TodoList.css';

const TodoList = ({ items, onDeleted, onToggleImportant, onToggleDone }) => {
  const elements = items.map(item => {
    const { id, ...itemProps } = item; // add to TodoListItem everything exclude ID.
    return (
      <li key={id} className='list-group-item'>
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className='list-group todo-list'>{elements}</ul>;
};

export default TodoList;
