// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TodoForm from "./todoform";
import UpdateTodoForm from "./updatetodoform";

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    // Fetch todos from the backend when the component mounts
    axios.get("http://localhost:8000/api/todos")
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  const addTodo = (todoData) => {
    // Create a new todo and send it to the backend
    axios.post("http://localhost:8000/api/todos", todoData)
    .then(response => {
      setTodos([...todos, response.data]);
    })
    .catch(error => {
      console.error("Error adding todo:", error);
    });
  };

  const toggleDescription = (todo) => {
    if (selectedTodo && selectedTodo.task_id === todo.task_id) {
      setSelectedTodo(null);
    } else {
      setSelectedTodo(todo);
    }
  };

  const handleUpdate = (updatedTodoData) => {
    // Update a todo
    axios.put(`http://localhost:8000/api/todos/${selectedTodo.task_id}`, updatedTodoData)
      .then(response => {
        const updatedTodos = todos.map(todo => {
          if (todo.task_id === selectedTodo.task_id) {
            return response.data;
          } else {
            return todo;
          }
        });
        setTodos(updatedTodos);
        setSelectedTodo(null); // Close the update form
        setShowUpdateForm(false);
      })
      .catch(error => {
        console.error("Error updating todo:", error);
      });
  };

  const handleDelete = (id) => {
    // Delete a todo
    axios.delete(`http://localhost:8000/api/todos/${id}`)
      .then(response => {
        setTodos(todos.filter(todo => todo.task_id !== id));
        setSelectedTodo(null); // Close the update form
        setShowUpdateForm(false);
      })
      .catch(error => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-cards">
        {todos.map(todo => (
          <div
            key={todo.task_id}
            className={`todo-card ${selectedTodo && selectedTodo.task_id === todo.task_id ? "selected" : ""}`}
            onClick={() => toggleDescription(todo)}
          >
            <h3>{todo.title}</h3>
            <p>Created At: {new Date(todo.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(todo.updatedAt).toLocaleString()}</p>
            <p>Due Date: {new Date(todo.due_date).toLocaleString()}</p>
            {selectedTodo && selectedTodo.task_id === todo.task_id && (
              <div className="description">
                <p>Description: {todo.description}</p>
                <p>Status: {todo.completed ? "Completed" : "Not Completed"}</p>
              </div>
            )}
            {selectedTodo && selectedTodo.task_id === todo.task_id && (
              <div className="button-container">
                <button onClick={() => handleDelete(todo.task_id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedTodo && (
        <div className="update-form-container">
          <UpdateTodoForm todo={selectedTodo} onUpdate={handleUpdate} />
        </div>
      )}
    </div>
  );
}
 
export default App;
