import React, { useState } from 'react';
import { Todo, useTodos } from './TodoContext';
import './TodoItem.css'; // Import file CSS cho TodoItem

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todo.name);

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: todo });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    dispatch({ type: 'UPDATE_TODO', payload: { id: todo.id, name: newName } });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewName(todo.name);
  };

  return (
    <li className="todo-item">
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={handleToggle} 
        className="checkbox"
      />
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
            className="edit-input"
          />
          <button onClick={handleUpdate} className="save-button">Save</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginLeft: '10px' }}>
            {todo.name}
          </span>
          <button onClick={handleEdit} className="edit-button">✏️</button>
          <button onClick={handleDelete} className="delete-button">🗑️</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
