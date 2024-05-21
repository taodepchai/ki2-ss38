import React from 'react';
import { Todo, useTodos } from './TodoContext';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { dispatch } = useTodos();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: todo });
  };

  return (
    <li>
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.name}
      </span>
      <button onClick={handleToggle}>
        {todo.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
