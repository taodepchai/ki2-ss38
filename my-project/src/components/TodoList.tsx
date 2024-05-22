import React, { useMemo, useRef, useCallback, useState } from 'react';
import { useTodos } from './TodoContext';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css'; // Import file CSS cho TodoList

const TodoList: React.FC = () => {
  const { state, dispatch } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<'ALL' | 'COMPLETED' | 'INCOMPLETE'>('ALL');

  const handleAddTodo = useCallback(() => {
    if (inputRef.current && inputRef.current.value) {
      const newTodo = {
        id: uuidv4(),
        name: inputRef.current.value,
        completed: false,
      };
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      inputRef.current.value = '';
    }
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    if (filter === 'COMPLETED') {
      return state.todos.filter(todo => todo.completed);
    } else if (filter === 'INCOMPLETE') {
      return state.todos.filter(todo => !todo.completed);
    }
    return state.todos;
  }, [state.todos, filter]);

  return (
    <div className="todo-container">
      <h1>Nhập tên công việc</h1>
      <input ref={inputRef} type="text" placeholder="Nhập tên công việc" />
      <button onClick={handleAddTodo} className="add-button">Thêm</button>
      <div className="filter-buttons">
        <button onClick={() => setFilter('ALL')} className={filter === 'ALL' ? 'active' : ''}>Tất cả</button>
        <button onClick={() => setFilter('COMPLETED')} className={filter === 'COMPLETED' ? 'active' : ''}>Đã hoàn thành</button>
        <button onClick={() => setFilter('INCOMPLETE')} className={filter === 'INCOMPLETE' ? 'active' : ''}>Chưa hoàn thành</button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
