/* eslint-disable */

import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, removeTodo } from './util';

const App = () => {
  const [todo, setTodo] = useState({
    description: '',
  });
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState();

  // update view from model w/ controller
  const fetchTodos = async () => {
    const res = await getTodos();
    if (res.error) {
      setError(res?.error.name ?? 'error while fetchTodos()');
    }
    setTodoList(res.data);
  };

  // send user action to controller
  const handleDelete = async (id) => {
    try {
      await removeTodo(id);
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError('err while handleDelete()' + err.name);
    }
  };

  // send user action to controller
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = new FormData(e.currentTarget);
    try {
      data.set('description', todo.description);
      data.set('created_at', `${new Date().toISOString()}`);
      const newTodo = await createTodo(data);
      if (newTodo.error) {
        console.error(newTodo.error);
        setError(newTodo.error);
        return;
      }
      setTodo({ description: '' });
      setTodoList((prev) => [...prev, newTodo.data]);
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError('err while handleSubmit()' + err.name);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={todo.description}
          onChange={(event) =>
            setTodo({ ...todo, description: event.target.value })
          }
        ></input>
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ol>
        {todoList?.map((todoItem) => {
          console.log(todoItem.description);
          return (
            <li
              key={todoItem.todo_id}
              onClick={() => {
                handleDelete(todoItem.todo_id);
              }}
            >
              {todoItem.description}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default App;