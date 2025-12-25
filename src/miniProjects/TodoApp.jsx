import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TodoApp.css";

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    if (editId) {
      setTodos(todos.map(t => 
        t.id === editId ? { ...t, text: input.trim(), priority } : t
      ));
      setEditId(null);
    } else {
      setTodos([
        { id: Date.now(), text: input.trim(), done: false, priority },
        ...todos,
      ]);
    }
    setInput("");
    setPriority("medium");
  };

  const toggleTodo = (id) =>
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const deleteTodo = (id) =>
    setTodos(todos.filter(t => t.id !== id));

  const startEdit = (todo) => {
    setInput(todo.text);
    setPriority(todo.priority);
    setEditId(todo.id);
  };

  const filteredTodos = todos.filter(t =>
    filter === "active" ? !t.done :
    filter === "completed" ? t.done :
    true
  );

  const handleDrag = (result) => {
    if (!result.destination) return;
    const items = Array.from(filteredTodos);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    // map reordered filtered list back to full list
    const newOrder = todos.map(t =>
      items.find(i => i.id === t.id) || t
    );
    setTodos(newOrder);
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h2>📝 Advanced Todo Manager</h2>

        <div className="input-row">
          <input
            type="text"
            placeholder="Add or edit a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="high">🔥 High</option>
            <option value="medium">⚖️ Medium</option>
            <option value="low">🌿 Low</option>
          </select>

          <button onClick={addTodo}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <div className="filters">
          <button className={filter==="all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
          <button className={filter==="active" ? "active" : ""} onClick={() => setFilter("active")}>Active</button>
          <button className={filter==="completed" ? "active" : ""} onClick={() => setFilter("completed")}>Completed</button>
        </div>

        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="todoList">
            {(provided) => (
              <ul className="todo-list" ref={provided.innerRef} {...provided.droppableProps}>
                {filteredTodos.length === 0 && (
                  <p className="empty">No tasks — add something!</p>
                )}

                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                    {(provided) => (
                      <li
                        className={`todo-item ${todo.done ? "done" : ""} ${todo.priority}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span onClick={() => toggleTodo(todo.id)}>
                          {todo.text}
                        </span>

                        <div className="actions">
                          <span className="tag">{todo.priority}</span>
                          <button onClick={() => startEdit(todo)}>✏️</button>
                          <button className="delete" onClick={() => deleteTodo(todo.id)}>✕</button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
