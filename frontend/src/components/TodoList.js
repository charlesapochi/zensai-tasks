import React, { useState, useEffect } from "react";
import api from "../api";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await api.get("todos/");
      setTodos(response.data);
    } catch (error) {
      toast.error("Error fetching todos!");
    }
  };

  // Add a new todo
  const createTodo = async (event) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      toast.error("Task name cannot be empty!");
      return;
    }
    try {
      const response = await api.post("todos/", { title: newTodo, completed: false });
      setTodos([response.data, ...todos]);
      setNewTodo("");
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Error adding task!");
    }
  };

  // Toggle todo completion
  const toggleCompletion = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const response = await api.patch(`todos/${id}/`, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === id ? response.data : t)));
    } catch (error) {
      toast.error("Error toggling completion!");
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`todos/${id}/`);
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task!");
    }
  };

  // Start editing a todo
  const startEditing = (id, title) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  // Save the edited todo
  const saveEditing = async (id) => {
    if (!editingTitle.trim()) {
      toast.error("Task name cannot be empty!");
      return;
    }
    try {
      const response = await api.patch(`todos/${id}/`, { title: editingTitle });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      setEditingId(null);
      setEditingTitle("");
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Error saving task!");
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  // Toggle visibility of completed todos
  const toggleCompletedVisibility = () => {
    setShowCompleted(!showCompleted);
  };

  // Filter todos
  const filteredTodos = showCompleted ? todos : todos.filter((todo) => !todo.completed);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h1>TODO LIST</h1>
      <ToastContainer />
      <div className="add-task">
        <form onSubmit={createTodo}>
          <input
            type="text"
            placeholder="Add a task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
        <select onChange={toggleCompletedVisibility} value={showCompleted ? "All" : "Active"}>
          <option value="All">All</option>
          <option value="Active">Active</option>
        </select>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
            {editingId === todo.id ? (
              <div className="editing">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={() => saveEditing(todo.id)} className="save-btn">
                  Save
                </button>
                <button onClick={cancelEditing} className="cancel-btn">
                  Cancel
                </button>
              </div>
            ) : (
              <div className="todo-check">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompletion(todo.id)}
                />
                <span>{todo.title}</span>
              </div>
            )}
            {editingId !== todo.id && (
              <div className="todo-actions">
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                  <FaTrashAlt />
                </button>
                <button onClick={() => startEditing(todo.id, todo.title)} className="edit-btn">
                  <FaEdit />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
