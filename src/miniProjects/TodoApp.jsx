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

  // new fields
  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addSubtask = (id, text) => {
    if (!text.trim()) return;
    setTodos(todos.map(t =>
      t.id === id
        ? { ...t, subtasks: [...t.subtasks, { id: Date.now(), text, done: false }] }
        : t
    ));
  };

  const toggleSubtask = (todoId, subId) => {
    setTodos(todos.map(t =>
      t.id === todoId
        ? {
            ...t,
            subtasks: t.subtasks.map(s =>
              s.id === subId ? { ...s, done: !s.done } : s
            )
          }
        : t
    ));
  };

  const addTodo = () => {
    if (!input.trim()) return;

    if (editId) {
      setTodos(todos.map(t =>
        t.id === editId
          ? { ...t, text: input.trim(), priority, note, dueDate }
          : t
      ));
      setEditId(null);
    } else {
      setTodos([
        {
          id: Date.now(),
          text: input.trim(),
          done: false,
          priority,
          note,
          dueDate,
          subtasks: []
        },
        ...todos,
      ]);
    }

    setInput("");
    setNote("");
    setDueDate("");
    setPriority("medium");
  };

  const toggleTodo = (id) =>
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const deleteTodo = (id) =>
    setTodos(todos.filter(t => t.id !== id));

  const startEdit = (todo) => {
    setInput(todo.text);
    setPriority(todo.priority);
    setNote(todo.note || "");
    setDueDate(todo.dueDate || "");
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

    const newOrder = todos.map(t =>
      items.find(i => i.id === t.id) || t
    );
    setTodos(newOrder);
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h2>📝 Pro Todo Manager</h2>

        <div className="input-row">
          <input
            type="text"
            placeholder="Task title..."
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

        <textarea
          className="note-box"
          placeholder="Notes / Description (optional)..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="date-row">
          <label>📅 Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
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
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                    {(provided) => (
                      <li
                        className={`todo-item ${todo.done ? "done" : ""} ${todo.priority}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="task-main">
                          <span onClick={() => toggleTodo(todo.id)}>
                            {todo.text}
                          </span>

                          {todo.dueDate && (
                            <div className="due">
                              ⏰ {todo.dueDate}
                            </div>
                          )}

                          {todo.note && (
                            <div className="note-preview">
                              📝 {todo.note}
                            </div>
                          )}

                          <div className="subtask-section">
                            {todo.subtasks?.map(sub => (
                              <div
                                key={sub.id}
                                className={`subtask ${sub.done ? "done" : ""}`}
                                onClick={() => toggleSubtask(todo.id, sub.id)}
                              >
                                ▸ {sub.text}
                              </div>
                            ))}

                            <SubTaskInput onAdd={(text) => addSubtask(todo.id, text)} />
                          </div>
                        </div>

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

function SubTaskInput({ onAdd }) {
  const [text, setText] = useState("");
  return (
    <div className="subtask-input">
      <input
        type="text"
        placeholder="Add sub-task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd(text);
            setText("");
          }
        }}
      />
    </div>
  );
}
