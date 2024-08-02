import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

const TodoList = () => {
  // localStorage'dan verileri oku ve başlangıç değeri olarak kullan
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // todos state'i her değiştiğinde localStorage'ı güncelle
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const unCompleteTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  };



  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className='App'>
      <h1 className='mb-4 pt-4'>Todo List</h1>
      <Button variant="primary m-2">
        <Link to="/wallet-page" style={{ color: 'white', textDecoration: 'none' }}>My Wallet</Link>
      </Button>
      <Button variant="secondary m-2">
        <Link to="/theme-store" style={{ color: 'white', textDecoration: 'none' }}>Theme Store</Link>
      </Button>
      <form onSubmit={e => {
        e.preventDefault();
        const text = e.target.elements.todo.value;
        if (text) {
          addTodo(text);
          e.target.reset();
        }
      }}>
        <input className='rounded p-2' name="todo" placeholder="Add a new task" />
        <Button className='ms-4' variant='success' type="submit">Add</Button>
      </form>
      <div>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            unCompleteTodo = {unCompleteTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;