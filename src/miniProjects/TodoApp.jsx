import { useState, useEffect } from "react";
import "./TodoApp.css";

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([{ id: Date.now(), text: input.trim(), done: false }, ...todos]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h2>📝 Modern Todo App</h2>

        <div className="input-row">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.length === 0 && (
            <p className="empty">No tasks yet — start adding!</p>
          )}

          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              <span onClick={() => toggleTodo(todo.id)}>
                {todo.text}
              </span>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
