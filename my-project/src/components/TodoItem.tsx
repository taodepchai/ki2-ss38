import React, { useState } from 'react';
import { Todo, useTodos } from './TodoContext';
import Swal from 'sweetalert2';
import "./TodoItem.css";

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

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
       dispatch({ type: 'DELETE_TODO', payload: todo });
      }
    });
    
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
    <li>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.name}
          </span>
          <button onClick={handleToggle}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
