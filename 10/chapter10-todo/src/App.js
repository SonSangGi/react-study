import React, { useState, useRef, useCallback } from './react';
import TodoTemplate from './components/todo-template';
import TodoInsert from './components/todo-insert';
import TodoList from './components/todo-list';
const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 기초 알아보기', checked: true },
    { id: 2, text: '리액트 기초 알아보기', checked: false },
    { id: 3, text: '리액트 기초 알아보기', checked: true },
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current++,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
    },
    [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
